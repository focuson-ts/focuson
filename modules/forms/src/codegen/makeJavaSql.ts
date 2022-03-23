import { AllDataDD, AllDataFlatMap, CompDataD, DataD, emptyDataFlatMap, flatMapDD, isDataDd, isPrimDd, isRepeatingDd, OneDataDD, PrimitiveDD } from "../common/dataD";
import { NameAnd, safeArray, sortedEntries } from "@focuson/utils";
import { unique } from "../common/restD";
import { AliasAndWhere, DBTable, DBTableAndMaybeName, DBTableAndName, GetSqlFromDataDDetails, isDbTableAndName, SqlGetDetails, Where } from "../common/resolverD";
import { Lenses } from "@focuson/lens";
import { JointAccountDd } from "../example/jointAccount/jointAccount.dataD";
import { addStringToEndOfAllButLast, indentList } from "./codegen";
import { PageD, RestDefnInPageProperties } from "../common/pageD";
import { allMapsName } from "./names";

export interface TableAndField {
  table: DBTable;
  field: string;
}
export function isTableAndField ( d: DbValues ): d is TableAndField {
  // @ts-ignore
  return d?.table !== undefined

}
export type DbValues = string | TableAndField
export function tableAndFieldFrom<G> ( parent: DataD<G>, db: DbValues ): TableAndField | undefined {
  if ( isTableAndField ( db ) ) return db
  if ( parent.table ) return { table: parent.table, field: db }
}

export function mergeWhere ( acc: Where, w: Where ) {return ({ ids: [ ...acc.ids, ...w.ids ], other: [ ...safeArray ( acc.other ), ...safeArray ( w.other ) ] })}
export function fieldsInWhere ( aliasMap: NameAnd<DBTableAndName>, w: Where ): TableAndFieldAndAliasData<any> [] {
  return w.ids.flatMap ( idEquals => {
    let result = idEquals.split ( '=' );
    if ( result.length != 2 ) throw Error ( `Erroneous id ${idEquals} has parts separated by equals of  ${result.length}, which should just be 2` )
    return [ [ idEquals, result[ 0 ] ], [ idEquals, result[ 1 ] ] ];
  } ).filter ( ( [ id, r ] ) => !r.match ( /^<[^>]*>$/g ) )
    .map ( ( [ idEquals, x ] ) => {
      let result = x.trim ();
      return [ idEquals, result ];
    } ).flatMap ( ( [ idEquals, x ] ) => {
      const parts = x.split ( "." )
      if ( parts.length != 2 ) throw Error ( `Erroneous id [${idEquals}] part [${x}] is not in form a.b` )
      const [ alias, fieldName ] = parts
      let dbTableAndName = aliasMap[ alias ];
      const makeTableAndField = ( db: DBTableAndName ) => ({ table: db.table, fieldData: { fieldName, reactType: 'number', rsGetter: 'getInt' } });
      if ( dbTableAndName !== undefined ) {
        let match = x.match ( /^[A-Za-z0-9.[\]]*$/ )
        if ( !match ) throw Error ( `Erroneous id ${idEquals} has non alphabetic characters in it (${x})` )
        return { ...makeTableAndField ( dbTableAndName ), alias };
      }
      const bracketMatch = alias.match ( /^\[(.*)]/ )
      if ( bracketMatch ) {
        const tableName = bracketMatch[ 1 ]
        const found = Object.entries ( aliasMap )
          .filter ( ( [ name, db ] ) =>
            db.name === tableName )
          .map ( t => t[ 1 ] )
        if ( found.length > 0 ) {
          let map = found.map ( makeTableAndField );
          let result = map.flatMap ( t =>
            addAlias ( aliasMap, t, tableName ) );
          return result
        }
        return []
        throw Error ( `Alias name is ${alias} which is really a table name. Not found. LegalNames are ${Object.values ( aliasMap ).map ( t => t.name )} \n ${JSON.stringify ( aliasMap )}` )
      }
      return []
      throw Error ( `Alias name ${alias} in where ${JSON.stringify ( w )} cannot be identified. Legal values are ${Object.entries ( aliasMap )}` )
    } )
}

export function findGetSqlFromDataDDetails ( get: SqlGetDetails, d: CompDataD<any> ): AliasAndWhere {
  const found: GetSqlFromDataDDetails | undefined = get.sql.find ( s => s.dataD.dataDD === d )
  return found ? found : { aliases: get.aliases, where: get.where }
}


export interface FoundParentChildLink {
  parent: CompDataD<any>;
  /** If missing the parent will be a repeating block */
  nameAndOneDataDD?: [ string, OneDataDD<any> ];
  child: AllDataDD<any>;
}


export interface FoundParentChildProps {
  stopAtRepeat?: boolean;
  stopWithRepeatAsChild?: boolean;
  includePrimitives?: boolean;
}

export function findParentChildCompDataLinks<G> ( props: FoundParentChildProps, d: CompDataD<G> ): FoundParentChildLink[] {
  const folder: ParentChildFoldFn<FoundParentChildLink[]> = ( acc: FoundParentChildLink[], parent: CompDataD<any>, nameAndOneDataDD, child: AllDataDD<any> ) => {
    if ( isPrimDd ( child ) && !props.includePrimitives ) return acc
    return [ ...acc, { parent, nameAndOneDataDD, child } ]
  }
  return walkParentChildCompDataLinks<FoundParentChildLink[]> ( props, d, folder, [] )

  // return makeLinksForChild ( d )
}


export interface FoundChildAliasAndWhere extends FoundParentChildLink {
  aliasAndWhere?: AliasAndWhere
}


export type ParentChildFoldFn<Acc> = ( acc: Acc, parent: CompDataD<any>, nameAndOneDataD: [ string, OneDataDD<any> ] | undefined, child: AllDataDD<any> ) => Acc

export function walkParentChildCompDataLinks<Acc> ( { stopAtRepeat, includePrimitives, stopWithRepeatAsChild }: FoundParentChildProps, d: CompDataD<any>, folder: ParentChildFoldFn<Acc>, zero: Acc ) {
  function makeLinksForChild ( acc: Acc, d: AllDataDD<any> ): Acc {
    if ( isPrimDd ( d ) ) return acc;
    if ( isRepeatingDd ( d ) ) return makeLinksForParentChild ( acc, d, undefined, d.dataDD )
    if ( isDataDd ( d ) ) return Object.entries ( d.structure ).reduce ( ( acc, [ name, data ] ) => makeLinksForParentChild ( acc, d, [ name, data ], data.dataDD ), acc )
    throw Error ( `Cannot process dataD ${d}` )
  }
  function makeLinksForParentChild ( acc: Acc, parent: CompDataD<any>, nameAndOneDataD: [ string, OneDataDD<any> ] | undefined, child: AllDataDD<any> ): Acc {
    if ( stopAtRepeat && isRepeatingDd ( child ) ) return acc;
    if ( isPrimDd ( child ) && !includePrimitives ) return acc
    const newAcc = folder ( acc, parent, nameAndOneDataD, child );
    if ( stopWithRepeatAsChild && isRepeatingDd ( child ) ) return newAcc
    return makeLinksForChild ( newAcc, child )
  }
  return makeLinksForChild ( zero, d )
}

export type ParentChildAliasMapFoldFn<Acc> = ( acc: Acc, parent: CompDataD<any>, nameAndOneDataDD: [ string, OneDataDD<any> ] | undefined, child: AllDataDD<any>, aliasMap: NameAnd<DBTableAndMaybeName>, where: Where, getSqlFromDataDDetails: GetSqlFromDataDDetails ) => Acc

export function walkParentChildCompDataLinksWithAliasMapAndWhere<Acc> ( { stopAtRepeat, stopWithRepeatAsChild, includePrimitives }: FoundParentChildProps, d: CompDataD<any>, sqlG: SqlGetDetails, folder: ParentChildAliasMapFoldFn<Acc>, zero: Acc, initialAliasMap?: NameAnd<DBTableAndMaybeName> ) {
  function makeLinksForChild ( acc: Acc, d: AllDataDD<any>, aliasMap: NameAnd<DBTableAndMaybeName>, oldWhere: Where ): Acc {
    if ( isRepeatingDd ( d ) ) return makeLinksForParentChild ( acc, d, undefined, d.dataDD, aliasMap, oldWhere )
    if ( isDataDd ( d ) ) return Object.entries ( d.structure ).reduce ( ( acc, [ name, data ] ) =>
      makeLinksForParentChild ( acc, d, [ name, data ], data.dataDD, aliasMap, oldWhere ), acc, )
    if ( isPrimDd ( d ) ) return acc
    throw Error ( `Cannot process dataD ${d}` )
  }
  function makeLinksForParentChild ( acc: Acc, parent: CompDataD<any>, nameAndOneDataDD: [ string, OneDataDD<any> ] | undefined, child: AllDataDD<any>, oldAliasMap: NameAnd<DBTableAndMaybeName>, oldWhere: Where ): Acc {
    if ( isPrimDd ( child ) && !includePrimitives ) return acc
    if ( stopAtRepeat && isRepeatingDd ( child ) ) return acc;
    const found: GetSqlFromDataDDetails | undefined = sqlG.sql.find ( ( { dataD, aliases } ) => dataD === nameAndOneDataDD?.[ 1 ] );
    const aliasMap: NameAnd<DBTableAndMaybeName> = found ? { ...oldAliasMap, ...found.aliases } : oldAliasMap
    const newWhere = found ? mergeWhere ( oldWhere, found.where ) : oldWhere
    const newAcc = folder ( acc, parent, nameAndOneDataDD, child, aliasMap, newWhere, found );
    if ( stopAtRepeat && isRepeatingDd ( child ) ) return acc;
    return makeLinksForChild ( newAcc, child, aliasMap, newWhere )
  }
  return makeLinksForChild ( zero, d, initialAliasMap ? initialAliasMap : sqlG.aliases, sqlG.where )
}

export function findParentChildAndAliases<G> ( props: FoundParentChildProps, d: CompDataD<G>, sqlG: SqlGetDetails, initialAliasMap?: NameAnd<DBTableAndMaybeName> ): FoundChildAliasAndWhere[] {
  const folder: ParentChildAliasMapFoldFn<FoundChildAliasAndWhere[]> =
          ( acc: FoundChildAliasAndWhere[], parent: CompDataD<any>, nameAndOneDataDD: [ string, OneDataDD<any> ] | undefined, child: AllDataDD<any>, aliases: NameAnd<DBTableAndMaybeName>, where, getSqlFromDataDDetails ) => {
            if ( isPrimDd ( child ) && !props.includePrimitives ) return acc
            const found: FoundChildAliasAndWhere = {
              parent, nameAndOneDataDD, child, ...getSqlFromDataDDetails,
              aliasAndWhere: { aliases, where }
            };
            return [ ...acc, found ]
          }
  return walkParentChildCompDataLinksWithAliasMapAndWhere<FoundChildAliasAndWhere[]> ( props, d, sqlG, folder, [], initialAliasMap )
}

export interface SqlRoot {
  data: CompDataD<any>;
  /** The aliases we have accumulated to get to the sql root */
  aliases: NameAnd<DBTableAndMaybeName>;
  /** The wheres we have accumulated to get to the sql root */
  where: Where;
  children: SqlRoot[];
  /** These include repeat as child */
  foundChildAliasAndWheres: FoundChildAliasAndWhere[];
}
export function findRoots ( d: CompDataD<any>, sqlG: SqlGetDetails ): SqlRoot {
  function findChild ( data: CompDataD<any>, aliases: NameAnd<DBTableAndMaybeName>, where: Where ) {
    let foundChildAliasAndWheres: FoundChildAliasAndWhere[] = findParentChildAndAliases ( { stopWithRepeatAsChild: true }, data, sqlG );
    const children: SqlRoot[] = foundChildAliasAndWheres
      .flatMap ( ( { child, aliasAndWhere } ) =>
        isRepeatingDd ( child ) ?
          [ findChild ( child, aliasAndWhere.aliases, aliasAndWhere.where ) ] : [] );
    return { data, aliases, where, children, foundChildAliasAndWheres }
  }
  return findChild ( d, sqlG.aliases, sqlG.where )
}


export function walkRoots<X> ( sqlRoot: SqlRoot, fn: ( sqlRoot: SqlRoot ) => X ): X[] {
  return [ fn ( sqlRoot ), ...sqlRoot.children.flatMap ( child => walkRoots ( child, fn ) ) ]
}

function findTableAndField ( parent: CompDataD<any>, [ name, oneDataD ]: [ string, OneDataDD<any> ], prim: PrimitiveDD ): TableAndFieldData<any> {
  let db = oneDataD.db;
  if ( !isDataDd ( parent ) ) throw new Error ( `Trying to findField in ${parent.name} which isn't a DataD. db is ${JSON.stringify ( db )}` )
  const raw = { reactType: prim.reactType, rsGetter: prim.rsGetter }
  if ( isTableAndField ( db ) ) return { table: db.table, fieldData: { fieldName: db.field, ...raw } }
  if ( parent.table ) return { table: parent.table, fieldData: { fieldName: db ? db : name, ...raw } }
  throw Error ( `In ${parent.name} ${name}. Have  db field ${db} but not table in parent` )
}

export function findFieldsNeededFor ( sqlRoot: SqlRoot ): TableAndFieldData<any>[] {
  const folder: ParentChildFoldFn<TableAndFieldData<any>[]> = ( acc, parent, nameAndOneDataD, child ) =>
    isPrimDd ( child ) ? [ ...acc, findTableAndField ( parent, nameAndOneDataD, child ) ] : acc
  return walkParentChildCompDataLinks ( { stopAtRepeat: true, includePrimitives: true }, sqlRoot.data, folder, [] )
}

export function findAliasMapFor ( sqlRoot: SqlRoot, sqlG: SqlGetDetails ): NameAnd<DBTableAndName> {
  const initialValue: NameAnd<DBTableAndName> = {};
  const aliasMap: NameAnd<DBTableAndName> = findParentChildAndAliases ( { stopAtRepeat: true }, sqlRoot.data, sqlG, sqlRoot.aliases )
    .reduce ( ( acc, am ) => ({
      ...acc, ...Object.fromEntries ( Object.entries ( am.aliasAndWhere.aliases ).map (
        ( [ n, d ] ) => [ n, isDbTableAndName ( d ) ? d : { name: d.name, table: d } ] ) )
    }), initialValue )
  return aliasMap

}

export function findWheresFor ( sqlRoot: SqlRoot, sqlG: SqlGetDetails ): Where {
  const { data } = sqlRoot
  const wheres = findParentChildCompDataLinks ( { stopAtRepeat: true }, data ).flatMap ( ( { nameAndOneDataDD } ) => {
    const found: GetSqlFromDataDDetails | undefined = sqlG.sql.find ( ( { dataD, aliases } ) => dataD === nameAndOneDataDD?.[ 1 ] );
    return found ? [ found.where ] : []
  } )
  const allWheres = [ sqlRoot.where, ...wheres ];
  return allWheres.reduce ( mergeWhere )

}

export interface SqlData {
  /** Alias name, fieldname, as */
  fields: TableAndFieldData<any>[];
  aliasMap: NameAnd<DBTableAndName>;
  wheres: Where;
  foundChildAliasAndWheres: FoundChildAliasAndWhere[];
}

export function makeSqlDataFor ( sqlRoot: SqlRoot, sqlG: SqlGetDetails ): SqlData {
  const fields = findFieldsNeededFor ( sqlRoot )
  const aliasMap: NameAnd<DBTableAndName> = findAliasMapFor ( sqlRoot, sqlG )
  const wheres = findWheresFor ( sqlRoot, sqlG )
  return { fields, aliasMap, wheres, foundChildAliasAndWheres: sqlRoot.foundChildAliasAndWheres }
}

/** returns [alias,table,field] */
export const findAliasAndTableNameOrAliasInAliasMap = ( aliasMap: NameAnd<DBTableAndName>, errorIfNotFound: boolean ) =>
  ( [ table, field ]: [ string, string ] ): [ string, DBTable, string ] [] => {
    let entries = Object.entries ( aliasMap );
    const foundByName: [ string, DBTableAndName ] = entries.find ( ( [ n, db ] ) => db.table.name === table )
    if ( foundByName ) return [ [ foundByName[ 0 ], foundByName[ 1 ].table, field ] ]
    const foundByAlias = entries.find ( ( [ n, db ] ) => n === table )
    if ( foundByAlias ) return [ [ foundByAlias[ 0 ], foundByAlias[ 1 ].table, field ] ]
    const match = table.match ( /^\[.*]$/ )
    if ( match ) {
      const name = table.slice ( 1, -1 )
      const foundByBracketName = entries.find ( ( [ n, t ] ) => t.name == name )
      if ( foundByBracketName ) return [ [ foundByBracketName[ 0 ], foundByBracketName[ 1 ].table, field ] ]
    }
    if ( errorIfNotFound ) throw Error ( `Don't now how to find the alias for the tablename ${table}\nLegal names are ${Object.keys ( aliasMap )}` )
    return []
  };
// export const findAliasDotFieldName = ( aliasMap: NameAnd<DBTableAndName> ) => ( tf: TableAndFieldData<any> ): string => {
//   const [ [ alias, t, name ] ] = findAliasAndTableNameOrAliasInAliasMap ( aliasMap, true ) ( tf )
//   return `${alias}.${name}`
// };

function addAlias ( aliasMap: NameAnd<DBTableAndName>, f: TableAndFieldData<any>, name: string ): TableAndFieldAndAliasData<any>[] {
  return Object.entries ( aliasMap ).filter ( ( [ alias, t ] ) =>
    t.name === name ).map ( tf => ({ ...f, alias: tf[ 0 ] }) );
}
export function findFieldsFor ( { fields, aliasMap, wheres }: SqlData ): TableAndFieldAndAliasData<any>[] {
  try {
    const fromWhere: TableAndFieldAndAliasData<any>[] = fieldsInWhere ( aliasMap, wheres )
    const fromFields: TableAndFieldAndAliasData<any>[] = fields.flatMap ( f => {
      let alias = addAlias ( aliasMap, f, f.table.name );
      return alias
    } )
    return [ ...fromFields, ...fromWhere ]
  } catch ( e: any ) {
    console.error ( e )
    throw Error ( `Error findFields for\n${simplifyAliasAndWhere ( { aliases: aliasMap, where: wheres } )}` )
  }
}
export function findFieldsStringFor ( sqlData: SqlData ) {
  return unique ( findFieldsFor ( sqlData ).map ( tf => `${tf.alias}.${tf.fieldData.fieldName} as ${tf.alias}_${tf.fieldData.fieldName}` ), s => s )
  // let simpleTableName = Object.entries ( sqlData.aliasMap ).flatMap ( ( [ alias, t ] ) =>
  //   sqlData.fields.filter ( tf => tf.table.name === t.name ).map ( tf => `${alias}.${tf.fieldData.fieldName}` ) );
  // return simpleTableName.join ( ',' )
  // return unique ( findFieldsFor ( sqlData ).map ( findAliasDotFieldName ( sqlData.aliasMap ) ), x => x )
}
export function findTableAlias ( { aliasMap }: SqlData ) {
  let result = Object.entries ( aliasMap ).map ( ( [ n, t ] ) => `${t.table.name} ${n}` ).join ( "," );
  return result
}
export function makeGetSqlFor ( sqlData: SqlData ) {
  let rawWhere = `where ${sqlData.wheres.ids.join ( " and " )}`;
  return [ `select ${findFieldsStringFor ( sqlData )}`,
    `from ${findTableAlias ( sqlData )}`,
    rawWhere.replace ( /(\[(.*)])/g, f => {
      const name = f.slice ( 1, -1 )
      const found = Object.entries ( sqlData.aliasMap ).find ( ( [ n, t ] ) => t.name === name )
      if ( !found ) throw Error ( `Cannot replace ${f} in ${rawWhere}. Name not known` )
      return found[ 0 ];
    } ) ]
}


export function simplifyAliasMap ( a: NameAnd<DBTableAndMaybeName> ) {
  return JSON.stringify ( Object.fromEntries ( sortedEntries ( a ).map ( ( [ name, t ] ) =>
    [ name, isDbTableAndName ( t ) ? t.name + ".'" + t.table?.name : t?.name ] ) ) ).replace ( /"/g, "'" )
}

export function simplifyAliasAndWhere ( aliasAndWhere: AliasAndWhere ) {
  return simplifyAliasMap ( aliasAndWhere?.aliases ) + " Wheres: " + JSON.stringify ( aliasAndWhere?.where )?.replace ( /"/g, "'" )
}

interface FieldData<G> {
  fieldName: string;
  rsGetter: string;
  reactType: string;
}
interface TableAndFieldData<G> {
  table: DBTable;
  fieldData: FieldData<G>
}
interface TableAndFieldAndAliasData<G> extends TableAndFieldData<G> {
  table: DBTable;
  fieldData: FieldData<G>
  alias: string;
}
interface TableAndFieldsData<G> {
  table: DBTable;
  fieldData: FieldData<G>[]
}


export function addToTableAndFieldsDataArray<G> ( acc: TableAndFieldsData<G>[], one: TableAndFieldData<G> ) {
  const index = acc.findIndex ( tf => tf.table.name === one.table.name )
  if ( index >= 0 ) {
    const lens = Lenses.identity<TableAndFieldsData<G>[]> ().chainLens ( Lenses.nth ( index ) ).focusOn ( 'fieldData' )
    return lens.transform ( old => old.find ( o => o.fieldName == one.fieldData.fieldName ) ? old : [ ...old, one.fieldData ] ) ( acc )
  }
  return [ ...acc, { table: one.table, fieldData: [ one.fieldData ] } ]
}

export function simplifyTableAndFieldsData<G> ( t: TableAndFieldsData<G> ) {
  return `${t.table.name} => ${t.fieldData.map ( fd => `${fd.fieldName}:${fd.reactType}` ).join ( ',' )}`
}
export function simplifyTableAndFieldDataArray<G> ( ts: TableAndFieldData<G>[] ) {
  return unique ( ts.map ( t => `${t.table.name} =>${t.fieldData.fieldName}` ), t => t )
}
export function simplifyTableAndFieldAndAliasDataArray<G> ( ts: TableAndFieldAndAliasData<G>[] ) {
  return unique ( ts.map ( t => `${t.table.name} ${t.alias} =>${t.fieldData.fieldName}` ), t => t )
}


export function findTableAndFieldsIn<G> ( data: CompDataD<G> ): TableAndFieldData<G>[] {
  const folder: AllDataFlatMap<TableAndFieldData<G>, G> = {
    ...emptyDataFlatMap (),
    walkPrim: ( path, parents, oneDataDD, { reactType, rsGetter } ) => {
      let parent = parents[ parents.length - 1 ];
      const tableAndField = tableAndFieldFrom ( parent, oneDataDD.db )
      if ( tableAndField ) {
        const fieldData: FieldData<G> = { fieldName: tableAndField.field, reactType, rsGetter };
        return [ { table: tableAndField.table, fieldData: fieldData } ]
      }
      return []
    }
  }
  return flatMapDD ( data, folder );
}
function foldTableAndFieldData<G> ( tableAndFields: TableAndFieldData<G>[] ): TableAndFieldsData<G>[] {
  const tables = unique ( tableAndFields.map ( t => t.table ), t => t.name )
  return tables.map ( t => ({ table: t, fieldData: unique ( tableAndFields.filter ( tf => tf.table.name == t.name ).map ( tf => tf.fieldData ), fd => fd.fieldName ) }) )
}
export function findTableAndFieldsForSqlGetDetails<G> ( sqlG: SqlGetDetails ): TableAndFieldData<G>[] {
  function findTableAndFieldsIn ( { aliases, where }: AliasAndWhere ): TableAndFieldData<G>[] {
    const combinedWithRootAliasMap: NameAnd<DBTableAndMaybeName> = { ...sqlG.aliases, ...aliases }
    const aliasMap: NameAnd<DBTableAndName> = Object.fromEntries ( Object.entries ( combinedWithRootAliasMap )
      .map ( ( [ n, m ] ) => [ n, isDbTableAndName ( m ) ? m : { table: m, name: m.name } ] ) )
    const result: TableAndFieldData<any>[] = fieldsInWhere ( aliasMap, where )
    return result

  }
  const fromSqlGRoot: TableAndFieldData<G>[] = findTableAndFieldsIn ( sqlG )
  const fromSql = sqlG.sql.flatMap ( findTableAndFieldsIn )
  const result = [ ...fromSqlGRoot, ...fromSql ]
  return result
}

export function findTableAndFields<G> ( dataD: DataD<G>, sqlG: SqlGetDetails ) {
  return foldTableAndFieldData ( [ ...findTableAndFieldsForSqlGetDetails ( sqlG ), ...findTableAndFieldsIn ( dataD ) ] )
}

export function makeCreateTableSql<G> ( dataD: CompDataD<G>, sqlG: SqlGetDetails ): string[] {
  function reactTypeToSqlType ( r: string ) {
    if ( r == 'number' ) return 'integer';
    if ( r == 'string' ) return 'varchar(256)'
    throw new Error ( `when making table don't know how to make a sql data type for [${r}]` )
  }
  return findTableAndFields ( JointAccountDd, sqlG ).flatMap ( tf =>
    [ `create table ${tf.table.name}` + '(',
      ...indentList ( addStringToEndOfAllButLast ( ',' ) ( tf.fieldData.map ( fd => `${fd.fieldName} ${reactTypeToSqlType ( fd.reactType )}` ) ) ),
      `)`, '' ]
  )
}

//public class JointZero {
//     public static class AllJointAccountMaps {
//         public final Map<String, Object> account = new HashMap<>();  // ----------- this will be the root
//         public final Map<String, Object> main = new HashMap<>();
//         public final Map<String, Object> mainName = new HashMap<>();
//         public final Map<String, Object> joint = new HashMap<>();
//         public final Map<String, Object> jointName = new HashMap<>();
//
//         public void makeJointAccount(ResultSet rs, List<Joint0> joint0s, List<Joint1> joint1s) throws SQLException {
//             account.put("blnc//the json name", rs.getInt("account_blnc"));
//             mainName.put("zzname", rs.getInt("mainName_zzname"));
//             jointName.put("zzname", rs.getInt("jointName_zzname"));
//             account.put("id", rs.getInt("account_id"));
//             main.put("id", rs.getInt("main_id"));
//             account.put("joint", rs.getInt("account_joint"));
//             joint.put("id", rs.getInt("jointName_id"));
//
//             account.put("main", main);
//             account.put("mainName", mainName);
//             account.put("joint", joint);
//             account.put("jointName", jointName);
//             main.put("address", joint0s.stream().map(j -> j.address))
//             joint.put("address", joint1s.stream().map(j -> j.address))
//
//         }
//     }


export function makeAggregateMapsFor<B, G> ( p: PageD<B, G>, restName: string, defn: RestDefnInPageProperties<G> , aliasMap: NameAnd<DBTableAndName>) {
  const foundChildAliasAndWheres: FoundParentChildLink[] = findParentChildCompDataLinks ( { includePrimitives: true, stopWithRepeatAsChild: true }, defn.rest.dataDD )
  return [
    `public class ${allMapsName ( p, 'root' )} {`,
    ...indentList ( foundChildAliasAndWheres.flatMap ( ( { parent, child,  nameAndOneDataDD } ) => {
        let nameDD = nameAndOneDataDD?.[ 1 ];
        if ( parent && nameAndOneDataDD && isPrimDd ( nameDD.dataDD ) ) {
          const found: TableAndFieldData<G> = findTableAndField ( parent, nameAndOneDataDD, nameDD.dataDD )
           addAlias(aliasMap, found, found.table.name) .map(x => x);
          return [ `${addedAlias}.put("${nameAndOneDataDD[ 0 ]}", rs.getInt("mainName_zzname"));` ]
        } else
          return []
      }
    ) ),
    '}'
  ]
}
