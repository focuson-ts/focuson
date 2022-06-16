//Common Data Definitions
import { DisplayCompD, LabelAndCheckboxInputCD, LabelAndDateInputCD, LabelAndDropDownCD, LabelAndNumberInputCD, LabelAndStringInputCD, LabelAndTextAreaCD } from "./componentsD";
import { ComponentDisplayParams } from "../codegen/makeRender";
import { NameAnd, safeArray } from "@focuson/utils";
import { Guards } from "../buttons/guardButton";
import { DBTable, isDbTableAndName } from "./resolverD";
import { DbValues, isTableAndField } from "../codegen/makeSqlFromEntities";


export interface HasSample<T> {
  sample?: T[]
}
export interface HasEnum {
  enum?: EnumDD;
}

export function sampleFromDataD<G> ( o: OneDataDD<G> | undefined, d: AllDataDD<G> ): string[] {
  const fromO: string[] = safeArray ( isOneDataDDForPrim<any, any, G> ( o ) ? o?.sample : [] )
  if ( fromO.length > 0 ) return fromO
  return isPrimDd ( d ) ? [ ...safeArray<any> ( d.sample ).map ( ( t: any ) => t ), ...safeArray ( d.enum ? Object.keys ( d.enum ) : [] ) ] : []
}

export interface OneDataDDForPrim<D extends CommonPrimitiveDD<T>, T, G> extends HasSample<T> {
  dataDD: D;
  hidden?: boolean;
  guard?: NameAnd<string[]>
  displayParams?: ComponentDisplayParams,
  sampleOffset?: number;
  db?: DbValues
}
export function isOneDataDDForPrim<D extends CommonPrimitiveDD<T>, T, G> ( o: OneDataDD<G> ): o is OneDataDDForPrim<D, T, G> {
  // @ts-ignore
  return o.sample !== undefined
}
export interface OneDataDDNonePrim<G> {
  sample?: undefined;
  dataDD: AllDataDD<G>;
  hidden?: boolean;
  guard?: NameAnd<string[]>
  displayParams?: ComponentDisplayParams,
  sampleOffset?: number;
  db?: DbValues
}
export type OneDataDD<G> = OneDataDDForPrim<any, any, G> | OneDataDDNonePrim<G>


export interface ManyDataDD<G> {
  [ name: string ]: OneDataDD<G>
}

export interface DisplayParamDD {
  [ name: string ]: boolean | number | string | string[]
}

export interface HasLayout {
  layout?: { component: DisplayCompD, displayParams?: DisplayParamDD },
}

export interface CommonDataDD extends HasLayout {
  name: string;
  display?: DisplayCompD;
  displayParams?: DisplayParamDD
  description: string;
  comments?: string;
  meta?: any;
  graphQlType?: string;
  resolver?: string;
  guard?: NameAnd<string[]>
}

export interface HasGuards<G> {
  guards?: Guards<G>;
}
export interface DataD<G> extends CommonDataDD, HasGuards<G> {
  structure: ManyDataDD<G>;
  table?: DBTable;
  sealedBy?: string;
}
export type CompDataD<G> = DataD<G> | RepeatingDataD<G>

export interface CommonPrimitiveDD<T> extends CommonDataDD, HasSample<T>, HasEnum {
  emptyValue: T | undefined;
  allowUndefined?: boolean;
  label?: string;
  display: DisplayCompD;
  graphQlType: string;
  rsGetter: string;
  dbType: string;
  javaType: string;
}

export interface StringPrimitiveDD extends CommonPrimitiveDD<string> {
  reactType: 'string';
  graphQlType: 'String';
  javaType: 'String'

}

export interface DatePrimitiveDD extends CommonPrimitiveDD<string> {
  datePattern: string;
  reactType: 'string';
  graphQlType: 'String';
  javaType: 'String'
}
export interface BooleanPrimitiveDD extends CommonPrimitiveDD<boolean> {
  reactType: 'boolean';
  emptyValue: false
  graphQlType: 'Boolean'
  javaType: 'Boolean'
}
export interface NumberPrimitiveDD extends CommonPrimitiveDD<number> {
  reactType: 'number';
  emptyValue: number;
  graphQlType: 'Int' | 'Float'
  javaType: 'Integer' | 'Float' | 'Double'
}
export type PrimitiveDD = DatePrimitiveDD | StringPrimitiveDD | BooleanPrimitiveDD | NumberPrimitiveDD

export interface RepeatingDataD<G> extends CommonDataDD {
  paged: boolean;
  display: DisplayCompD; // mandatory for a repeating
  dataDD: DataD<G>;
  sampleCount?: number; //defaults to 3
}
export function isRepeatingDd<G> ( d: any ): d is RepeatingDataD<G> {
  return d.paged !== undefined
}
export function allRepeatindDs<G> ( d: AllDataDD<G>[] ): RepeatingDataD<G>[] {
  // @ts-ignore
  return d.filter ( isRepeatingDd )
}

export type CompDataDD<G> = DataD<G> | RepeatingDataD<G>
export function isComdDD<G> ( d: any ): d is CompDataD<G> {
  return isDataDd ( d ) || isRepeatingDd ( d )
}
export function compDataDIn<G> ( c: CompDataD<G> ): DataD<G> {
  if ( isDataDd ( c ) ) return c
  if ( isRepeatingDd ( c ) ) return c.dataDD
  throw new Error ( `Don't know how to find compDataDIn ${c}` )
}

export type AllDataDD<G> = PrimitiveDD | DataD<G> | RepeatingDataD<G>


export interface NamesAndDataDs<G> {
  [ name: string ]: CompDataD<G>
}

export interface AllDataFolder<Acc, G> {
  stopAtDisplay?: boolean,
  foldPrim: ( acc: Acc, path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: PrimitiveDD ) => Acc,
  foldData: ( acc: Acc, path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: DataD<G>, start: boolean ) => Acc,
  foldRep: ( acc: Acc, path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: RepeatingDataD<G>, start: boolean ) => Acc
}
export interface AllDataFlatMap<Acc, G> {
  stopAtDisplay?: boolean,
  walkPrim: ( path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: PrimitiveDD ) => Acc[],
  walkDataStart: ( path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: DataD<G> ) => Acc[],
  walkDataEnd: ( path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: DataD<G> ) => Acc[],
  walkRepStart: ( path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: RepeatingDataD<G> ) => Acc[]
  walkRepEnd: ( path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: RepeatingDataD<G> ) => Acc[]
}
export function emptyDataFlatMap<Acc, G> (): AllDataFlatMap<Acc, G> {
  return ({
    walkPrim: () => [],
    walkDataStart: () => [],
    walkDataEnd: () => [],
    walkRepStart: () => [],
    walkRepEnd: () => []
  })
}

export function flatMapDD<Acc, G> ( dataDD: AllDataDD<G>, map: AllDataFlatMap<Acc, G> ) {
  return foldDataDD<Acc[], G> ( dataDD, [], [], [], {
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

export function collectDataWalker<G> (): AllDataFlatMap<CompDataD<G>, G> {
  return ({
    ...emptyDataFlatMap (),
    walkRepStart: ( path, parents, oneDataDD, dataDD ) => [ dataDD ],
    walkDataStart: ( path, parents, oneDataDD, dataDD ) => [ dataDD ]
  })
}
export function findDataDDIn<G> ( a: AllDataDD<G>, stopAtDisplay?: boolean ): CompDataD<G>[] {return flatMapDD ( a, { ...collectDataWalker (), stopAtDisplay } )}


export function foldDataDD<Acc, G> ( dataDD: AllDataDD<G>, path: string[], parents: DataD<G>[], zero: Acc, folder: AllDataFolder<Acc, G>, oneDataDD?: OneDataDD<G> ): Acc {
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
export function findAllDataDs<G> ( a: AllDataDD<G>[], stopAtDisplay?: boolean ): NamesAndDataDs<G> {
  var result: NamesAndDataDs<G> = {}
  a.flatMap ( d => findDataDDIn ( d, stopAtDisplay ) ).forEach ( d => result [ d.name ] = d )
  return result
}


export function isPrimDd ( d: any ): d is PrimitiveDD {
  return !isRepeatingDd ( d ) && !isDataDd ( d )
}

export function isDataDd<G> ( d: any ): d is DataD<G> {
  return !!d.structure
}

export interface EnumDD {
  [ name: string ]: string
}

interface StringPrimDD {
  emptyValue: string;
  reactType: 'string';
  graphQlType: 'String';
  rsGetter: 'getString';
  dbType: string
  javaType: 'String'
}
export const stringPrimDD: StringPrimDD = {
  emptyValue: "",
  reactType: 'string',
  graphQlType: 'String',
  rsGetter: 'getString',
  dbType: 'varchar(255)',
  javaType: 'String'
}
interface DatePrimDD {
  emptyValue: string;
  reactType: 'string';
  graphQlType: 'String';
  rsGetter: 'getDate';
  dbType: string
  javaType: 'String'
}
export const datePrimDD: DatePrimDD = {
  emptyValue: "2022/01/01",
  reactType: 'string',
  graphQlType: 'String',
  rsGetter: 'getDate',
  dbType: 'varchar(255)',
  javaType: 'String'
}
interface NumberPrimDD {
  emptyValue: number,
  graphQlType: 'Int',
  reactType: 'number',
  rsGetter: 'getInt';
  dbType: string
  javaType: 'Integer'
}
export const numberPrimDD: NumberPrimDD = {
  emptyValue: 0,
  graphQlType: 'Int',
  reactType: 'number',
  rsGetter: 'getInt',
  dbType: 'integer',
  javaType: 'Integer'
}
interface FloatPrimDD {
  emptyValue: number,
  graphQlType: 'Float',
  reactType: 'number',
  rsGetter: 'getDouble';
  dbType: string;
  javaType: 'Float' | 'Double'
}
export const floatPrimDD: FloatPrimDD = {
  emptyValue: 0,
  graphQlType: 'Float',
  reactType: 'number',
  rsGetter: 'getDouble',
  dbType: 'number',
  javaType: 'Double'
}

export const CustomerIdDD: StringPrimitiveDD = {
  ...stringPrimDD,
  name: 'CustomerId',
  description: "A customer id",
  display: LabelAndStringInputCD,
  sample: [ "003450" ]
}
export const AccountIdDD: NumberPrimitiveDD = {
  ...numberPrimDD,
  name: 'AccountId',
  description: "An account id",
  display: LabelAndNumberInputCD,
  displayParams: { min: 10000000, max: 99999999 },
  sample: [ 1233450, 3233450, 4333450 ]
}
export const StringDD: StringPrimitiveDD = {
  ...stringPrimDD,
  name: 'String',
  description: "The primitive 'string'. A reasonably short list of characters",
  display: LabelAndStringInputCD,
  sample: [ "someString", "anotherString" ]
}
export const OneLineStringDD: StringPrimitiveDD = {
  ...stringPrimDD,
  name: 'OneLineString',
  graphQlType: 'String',
  description: "A string that fits on a line of text. Probably reasonably long",
  display: LabelAndStringInputCD,
  sample: [ "This is a one line string", "another one line string" ]
}
export const ManyLineStringDD: StringPrimitiveDD = {
  ...stringPrimDD,
  name: 'ManyLineString',
  description: "A string that needs many lines and uses a text Area",
  display: LabelAndTextAreaCD,
  sample: [ "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit" ]
}
export const IntegerDD: NumberPrimitiveDD = {
  ...numberPrimDD,
  name: 'Integer',
  description: "The primitive 'Integer'",
  display: LabelAndNumberInputCD,
  sample: [ 123, 456 ]
}

export const NatNumDd: NumberPrimitiveDD = {
  ...numberPrimDD,
  name: 'NaturalNumber',
  description: "A positive integer",
  display: LabelAndNumberInputCD,
  displayParams: { min: 0 },
  sample: [ 123, 456 ]
}
export const MoneyDD: NumberPrimitiveDD = {
  ...floatPrimDD,
  display: LabelAndNumberInputCD,
  sample: [ 100.23, 200.45, 300 ],
  description: "The primitive representing an amount of the local currency",
  name: 'Money'
}
export const BooleanDD: PrimitiveDD = {
  rsGetter: "getBoolean",
  dbType: 'boolean',
  name: 'Boolean',
  javaType: 'Boolean',
  emptyValue: false,
  graphQlType: 'Boolean',
  reactType: 'boolean',
  description: "The primitive 'Boolean'",
  display: LabelAndCheckboxInputCD,
  sample: [ true, false ]
}

export const YesNoDD: PrimitiveDD = {
  ...StringDD,
  display: LabelAndCheckboxInputCD,
  displayParams: { pleaseSelect: 'Select...' },
  enum: { N: 'No', Y: 'Yes' }
}


export const DateDD: DatePrimitiveDD = {
  datePattern: "yyyy/MM/dd",
  ...datePrimDD,
  name: 'Date',
  emptyValue: '2022-1-1',
  description: "The primitive representing a date (w/o time)",
  display: LabelAndDateInputCD,
  sample: [ "2020/10/01", '2021/09/01', '2022/11/01' ]
}

export const DateTimeDD: PrimitiveDD = {
  ...stringPrimDD,
  name: 'DateTime',
  emptyValue: '2022-1-1T00:00:00',
  description: "The primitive representing a date (with time)",
  display: LabelAndStringInputCD, //or maybe a date picker
  sample: [ "2020-10-01T06:30:00", '2022-14-01T14:30:00' ]
}

