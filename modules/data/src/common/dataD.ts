//Common Data Definitions


import { DisplayCompD, LabelAndInputCD } from "./componentsD";
import { ComponentDisplayParams } from "../codegen/makeComponents";
import { on } from "cluster";
import { start } from "repl";

export interface OneDataDD {
  dataDD: AllDataDD;
  displayParams?: ComponentDisplayParams,
  graphQl?: string, // might be possible to default this which would be cool
}
export interface ManyDataDD {
  [ name: string ]: OneDataDD
}
export interface OneDisplayParamDD {
  value: string | string[]
}
export interface DisplayParamDD {
  [ name: string ]: OneDisplayParamDD
}

export interface CommonDataDD {
  name: string;
  display?: DisplayCompD;
  displayParams?: DisplayParamDD
  description: string;
  comments?: string;
  meta?: any;
  graphQl?: string;
  graphQlType?: string;
  tableName?: string;

}
export interface DataD extends CommonDataDD {
  structure: ManyDataDD;
}
export interface PrimitiveDD extends CommonDataDD {
  label?: string;
  validation: SingleFieldValidationDD;
  samples?: string[];
  enum?: EnumDD;
  fieldName?: string
}
export interface RepeatingDataD extends CommonDataDD {
  paged: boolean;
  display: DisplayCompD; // mandatory for a repeating
  dataDD: DataD;
}
export function isRepeatingDd ( d: any ): d is RepeatingDataD {
  return d.paged !== undefined
}

export type AllDataDD = PrimitiveDD | DataD | RepeatingDataD
export interface AllDataFolder<Acc> {
  stopAtDisplay?: boolean,
  foldPrim: ( acc: Acc, path: string[], oneDataDD: OneDataDD | undefined, dataDD: PrimitiveDD ) => Acc,
  foldData: ( acc: Acc, path: string[], oneDataDD: OneDataDD | undefined, dataDD: DataD, start: boolean ) => Acc,
  foldRep: ( acc: Acc, path: string[], oneDataDD: OneDataDD | undefined, dataDD: RepeatingDataD, start: boolean ) => Acc
}
export interface AllDataFlatMap<Acc> {
  stopAtDisplay?: boolean,
  walkPrim: ( path: string[], oneDataDD: OneDataDD | undefined, dataDD: PrimitiveDD ) => Acc[],
  walkDataStart: ( path: string[], oneDataDD: OneDataDD | undefined, dataDD: DataD ) => Acc[],
  walkDataEnd: ( path: string[], oneDataDD: OneDataDD | undefined, dataDD: DataD ) => Acc[],
  walkRepStart: ( path: string[], oneDataDD: OneDataDD | undefined, dataDD: RepeatingDataD ) => Acc[]
  walkRepEnd: ( path: string[], oneDataDD: OneDataDD | undefined, dataDD: RepeatingDataD ) => Acc[]
}
export function emptyDataFlatMap<Acc> (): AllDataFlatMap<Acc> {
  return ({
    walkPrim: () => [],
    walkDataStart: () => [],
    walkDataEnd: () => [],
    walkRepStart: () => [],
    walkRepEnd: () => []
  })
}

export function flatMapDD<Acc> ( dataDD: AllDataDD, map: AllDataFlatMap<Acc> ) {
  return foldDataDD<Acc[]> ( dataDD, [], [], {
    stopAtDisplay: map.stopAtDisplay,
    foldRep: ( acc, path, oneDataDD, dataDD, start ) => {
      return [ ...acc, ...start ?
        map.walkRepStart ( path, oneDataDD, dataDD ) :
        map.walkRepEnd ( path, oneDataDD, dataDD ) ]
    },
    foldData: ( acc, path, oneDataDD, dataDD, start ) => {
      return [ ...acc, ...start ?
        map.walkDataStart ( path, oneDataDD, dataDD ) :
        map.walkDataEnd ( path, oneDataDD, dataDD ) ]
    },
    foldPrim: ( acc, path, oneDataDD, dataDD ) =>
      [ ...acc, ...map.walkPrim ( path, oneDataDD, dataDD ) ]
  } )
}

export const collectDataWalker: AllDataFlatMap<DataD> = {
  ...emptyDataFlatMap (),
  walkDataStart: ( path, oneDataDD, dataDD ) => [ dataDD ]
}
export function findDataDDIn ( a: AllDataDD ): DataD[] {return flatMapDD ( a, collectDataWalker )}


export function foldDataDD<Acc> ( dataDD: AllDataDD, path: string[], zero: Acc, folder: AllDataFolder<Acc>, oneDataDD?: OneDataDD ): Acc {
  const { foldPrim, foldData, foldRep, stopAtDisplay } = folder
  if ( isDataDd ( dataDD ) ) {
    let start: Acc = foldData ( zero, path, oneDataDD, dataDD, true );
    if ( dataDD.display && stopAtDisplay ) return foldData ( start, path, oneDataDD, dataDD, false );
    let acc = Object.entries ( dataDD.structure ).reduce ( ( acc, [ name, child ] ) => foldDataDD ( child.dataDD, [ ...path, name ], acc, folder, child ), start );
    return foldData ( acc, path, oneDataDD, dataDD, false )
  }
  if ( isRepeatingDd ( dataDD ) ) {
    let start = foldRep ( zero, path, oneDataDD, dataDD, true );
    if ( stopAtDisplay ) return foldRep ( start, path, oneDataDD, dataDD, false )
    let acc = foldDataDD ( dataDD.dataDD, path, start, folder, undefined );
    return foldRep ( acc, path, oneDataDD, dataDD, false )
  }
  return foldPrim ( zero, path, oneDataDD, dataDD )
}


export function isDataDd ( d: any ): d is DataD {
  return !!d.structure
}

export interface SingleFieldValidationDD {
  regex?: string,
  minLength?: number;
  maxLength?: number;
  enum?: boolean,
}
export interface EnumDD {
  [ name: string ]: string
}

export const CustomerIdDD: PrimitiveDD = {
  name: 'CustomerIdDD',
  description: "A customer id",
  display: LabelAndInputCD,
  validation: { regex: "\d+", maxLength: 7 },
  samples: [ "003450" ]
}
export const AccountIdDD: PrimitiveDD = {
  name: 'AccountIdDD',
  description: "An account id",
  display: LabelAndInputCD,
  validation: { regex: "\d+", maxLength: 7 },
  samples: [ "1233450", "3233450", "4333450" ]
}
export const StringDD: PrimitiveDD = {
  name: 'StringDD',
  description: "The primitive 'string'. A reasonably short list of characters",
  display: LabelAndInputCD,
  validation: { maxLength: 255 }, //Note no regex
  samples: [ "someString", "anotherString" ]
}
export const OneLineStringDD: PrimitiveDD = {
  name: 'OneLineStringDD',
  description: "A string that fits on a line of text. Probably reasonably long",
  display: LabelAndInputCD,
  validation: { maxLength: 255 }, //Note no regex
  samples: [ "This is a one line string", "another one line string" ]
}
export const IntegerDD: PrimitiveDD = {
  name: 'IntegerDD',
  description: "The primitive 'Integer'",
  display: LabelAndInputCD,
  validation: { regex: "\d+", maxLength: 255 },
  samples: [ "This is a one line string", "another one line string" ]
}
export const MoneyDD: any = {
  ...IntegerDD,
  description: "The primitive representing an amount of the local currency",
  name: 'IntegerDD'
}

export const DateDD: PrimitiveDD = {
  name: 'DateDD',
  description: "The primitive representing a date (w/o time)",
  display: LabelAndInputCD, //or maybe a date picker
  validation: { regex: "\d+", maxLength: 8 },
  samples: [ "2020-10-01", '2022-14-01' ]
}

export const DateTimeDD: PrimitiveDD = {
  name: 'DateTimeDD',
  description: "The primitive representing a date (with time)",
  display: LabelAndInputCD, //or maybe a date picker
  validation: { regex: "\d+", maxLength: 8 },
  samples: [ "2020-10-01", '2022-14-01' ]
}

