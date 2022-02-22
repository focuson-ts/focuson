//Common Data Definitions


import { DisplayCompD, LabelAndInputCD } from "./componentsD";
import { ComponentDisplayParams } from "../codegen/makeComponents";
import { safeArray } from "@focuson/utils";
import { isPrimitive } from "util";

export interface HasSample {
  sample?: string[]
}
export interface HasEnum {
  enum?: EnumDD;
}

export function sampleFromDataD ( o: OneDataDD | undefined, d: AllDataDD ): string[] {
  const fromO: string[] = safeArray ( o?.sample )
  const fromD: string[] = isPrimDd ( d ) ? [ ...safeArray ( d.sample ), ...safeArray ( d.enum ? Object.keys ( d.enum ) : [] ) ] : []
  return [ ...fromO, ...fromD ]
}

export interface OneDataDD extends HasSample {
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
  graphQlType?: string;
  resolver?: string;
}
export interface DataD extends CommonDataDD {
  structure: ManyDataDD;
}
export interface PrimitiveDD extends CommonDataDD, HasSample, HasEnum {
  reactType: string,
  label?: string;
  validation: SingleFieldValidationDD;
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


export interface NamesAndDataDs {
  [ name: string ]: DataD
}

export interface AllDataFolder<Acc> {
  stopAtDisplay?: boolean,
  foldPrim: ( acc: Acc, path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: PrimitiveDD ) => Acc,
  foldData: ( acc: Acc, path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: DataD, start: boolean ) => Acc,
  foldRep: ( acc: Acc, path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: RepeatingDataD, start: boolean ) => Acc
}
export interface AllDataFlatMap<Acc> {
  stopAtDisplay?: boolean,
  walkPrim: ( path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: PrimitiveDD ) => Acc[],
  walkDataStart: ( path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: DataD ) => Acc[],
  walkDataEnd: ( path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: DataD ) => Acc[],
  walkRepStart: ( path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: RepeatingDataD ) => Acc[]
  walkRepEnd: ( path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: RepeatingDataD ) => Acc[]
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
  return foldDataDD<Acc[]> ( dataDD, [], [], [], {
    stopAtDisplay: map.stopAtDisplay,
    foldRep: ( acc, path, parents, oneDataDD, dataDD, start ) => {
      return [ ...acc, ...start ?
        map.walkRepStart ( path, parents, oneDataDD, dataDD ) :
        map.walkRepEnd ( path, parents, oneDataDD, dataDD ) ]
    },
    foldData: ( acc, path, parents, oneDataDD, dataDD, start ) => {
      return [ ...acc, ...start ?
        map.walkDataStart ( path, parents, oneDataDD, dataDD ) :
        map.walkDataEnd ( path, parents, oneDataDD, dataDD ) ]
    },
    foldPrim: ( acc, path, parents, oneDataDD, dataDD ) =>
      [ ...acc, ...map.walkPrim ( path, parents, oneDataDD, dataDD ) ]
  } )
}

export const collectDataWalker: AllDataFlatMap<DataD> = {
  ...emptyDataFlatMap (),
  walkDataStart: ( path, parents, oneDataDD, dataDD ) => [ dataDD ]
}
export function findDataDDIn ( a: AllDataDD, stopAtDisplay?: boolean ): DataD[] {return flatMapDD ( a, { ...collectDataWalker, stopAtDisplay } )}


export function foldDataDD<Acc> ( dataDD: AllDataDD, path: string[], parents: DataD[], zero: Acc, folder: AllDataFolder<Acc>, oneDataDD?: OneDataDD ): Acc {
  const { foldPrim, foldData, foldRep, stopAtDisplay } = folder
  if ( isDataDd ( dataDD ) ) {
    let start: Acc = foldData ( zero, path, parents, oneDataDD, dataDD, true );
    if ( dataDD.display && stopAtDisplay ) return foldData ( start, path, parents, oneDataDD, dataDD, false );
    let acc = Object.entries ( dataDD.structure ).reduce ( ( acc, [ name, child ] ) => foldDataDD ( child.dataDD, [ ...path, name ], [ ...parents, dataDD ], acc, folder, child ), start );
    return foldData ( acc, path, parents, oneDataDD, dataDD, false )
  }
  if ( isRepeatingDd ( dataDD ) ) {
    let start = foldRep ( zero, path, parents, oneDataDD, dataDD, true );
    if ( stopAtDisplay ) return foldRep ( start, path, parents, oneDataDD, dataDD, false )
    let acc = foldDataDD ( dataDD.dataDD, path, parents, start, folder, undefined );
    return foldRep ( acc, path, parents, oneDataDD, dataDD, false )
  }
  return foldPrim ( zero, path, parents, oneDataDD, dataDD )
}


/** Finds and dedups all the unique DataDs in the list. Identity is based on name: so we assume if the name is the same, it's the same object.*/
export function findAllDataDs ( a: AllDataDD[], stopAtDisplay?: boolean ): NamesAndDataDs {
  var result: NamesAndDataDs = {}
  a.flatMap ( d => findDataDDIn ( d, stopAtDisplay ) ).forEach ( d => result [ d.name ] = d )
  return result
}
export function isPrimDd ( d: any ): d is PrimitiveDD {
  return !isRepeatingDd ( d ) && !isDataDd ( d )
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
  reactType: 'string',
  description: "A customer id",
  display: LabelAndInputCD,
  validation: { regex: "\d+", maxLength: 7 },
  sample: [ "003450" ]
}
export const AccountIdDD: PrimitiveDD = {
  name: 'AccountIdDD',
  reactType: 'string',
  description: "An account id",
  display: LabelAndInputCD,
  validation: { regex: "\d+", maxLength: 7 },
  sample: [ "1233450", "3233450", "4333450" ]
}
export const StringDD: PrimitiveDD = {
  name: 'StringDD',
  reactType: 'string',
  description: "The primitive 'string'. A reasonably short list of characters",
  display: LabelAndInputCD,
  validation: { maxLength: 255 }, //Note no regex
  sample: [ "someString", "anotherString" ]
}
export const OneLineStringDD: PrimitiveDD = {
  name: 'OneLineStringDD',
  reactType: 'string',
  description: "A string that fits on a line of text. Probably reasonably long",
  display: LabelAndInputCD,
  validation: { maxLength: 255 }, //Note no regex
  sample: [ "This is a one line string", "another one line string" ]
}
export const ManyLineStringDD: PrimitiveDD = {
  name: 'ManyLineStringDD',
  reactType: 'string',
  description: "A string that needs many lines and uses a text Area",
  display: LabelAndInputCD,
  validation: {},
  sample: [ "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit" ]
}
export const IntegerDD: PrimitiveDD = {
  name: 'IntegerDD',
  reactType: 'string',
  description: "The primitive 'Integer'",
  display: LabelAndInputCD,
  validation: { regex: "\d+", maxLength: 255 },
  sample: [ "This is a one line string", "another one line string" ]
}
export const MoneyDD: PrimitiveDD = {
  ...IntegerDD,
  description: "The primitive representing an amount of the local currency",
  name: 'IntegerDD'
}

export const DateDD: PrimitiveDD = {
  name: 'DateDD',
  reactType: 'string',
  description: "The primitive representing a date (w/o time)",
  display: LabelAndInputCD, //or maybe a date picker
  validation: { regex: "\d+", maxLength: 8 },
  sample: [ "2020-10-01", '2022-14-01' ]
}

export const DateTimeDD: PrimitiveDD = {
  name: 'DateTimeDD',
  reactType: 'string',
  description: "The primitive representing a date (with time)",
  display: LabelAndInputCD, //or maybe a date picker
  validation: { regex: "\d+", maxLength: 8 },
  sample: [ "2020-10-01", '2022-14-01' ]
}

