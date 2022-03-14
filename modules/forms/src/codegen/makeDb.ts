import { dataDsIn, MainPageD, PageD } from "../common/pageD";
import { AllDataFlatMap, CompDataD, compDataDIn, DataD, emptyDataFlatMap, findAllDataDs, flatMapDD, isDataDd, isPrimDd, isRepeatingDd, NamesAndDataDs, OneDataDD, PrimitiveDD, RepeatingDataD } from "../common/dataD";
import { allMapsName, dbMapMakerProcname, dbMapname, javaDbFileName } from "./names";
import { sortedEntries } from "@focuson/utils";
import { indentList } from "./codegen";
import { JavaWiringParams } from "./config";
import { unique } from "../common/restD";
import { on } from "cluster";

export function makeMaps<G> ( dataD: DataD<G> ): string[] {
  const folder: AllDataFlatMap<string, G> = {
    ...emptyDataFlatMap (),
    walkDataStart<G> ( path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: DataD<G> ): string[] {
      return [ `Map ${dbMapname ( dataDD )} = new HashMap<>();` ];
    },
    walkRepStart<G> ( path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: RepeatingDataD<G> ): string[] {
      return [ `Map ${dbMapname ( dataDD )} = new HashMap<>();` ];
    }
  }
  return flatMapDD ( dataD, folder )
}

function aliasAndFieldName<G> ( name: string, oneDataDD: OneDataDD<G> ): string {
  const alias = oneDataDD.alias ? (oneDataDD.alias + '.') : ''
  const field = oneDataDD.field ? oneDataDD.field : name
  return alias + field
}

interface PopulateMapAcc {
  dataDbName: string;
  line: string;
}

export function findMapsFor<G> ( d: CompDataD<G> ): string[] {
  if ( isRepeatingDd ( d ) ) return []
  return Object.entries ( d.structure ).flatMap ( ( [ n, oneDataD ] ) =>
    isPrimDd ( oneDataD.dataDD ) ? [ `maps.${dbMapname ( d )}.put("${n}", rs.${oneDataD.dataDD.rsGetter}("${aliasAndFieldName ( n, oneDataD )}"));` ] : []
  )
}

const accToMaps = ( acc: PopulateMapAcc[] ) => ( name: string ): string[] => acc.filter ( a => a.dataDbName === name ).map ( a => a.line );

export const populateMaps = <B, G> ( pageD: PageD<B, G>, dataDs: NamesAndDataDs<G> ): string[] => {
  return sortedEntries ( dataDs ).flatMap ( ( [ n, d ] ) =>
    [ `public void ${dbMapMakerProcname ( d )}(${allMapsName ( pageD )} maps, ResultSet rs) throws SQLException {`,
      ...indentList ( findMapsFor ( d ) ), "}" ] )
};
export const makeAllMaps = <B, G> ( pageD: PageD<B, G>, dataDs: NamesAndDataDs<G> ): string[] => {
  return [ `public static class ${allMapsName ( pageD )}{`, ...indentList ( sortedEntries ( dataDs ).flatMap ( ( [ n, d ] ) => `public final Map<String,Object> ${dbMapname ( d )} = new HashMap<>();` ) ), '}' ]
}

export function makeDbFile<B, G> ( params: JavaWiringParams, pageD: MainPageD<B, G> ): string [] {
  const dataDs: NamesAndDataDs<G> = dataDsIn ( [ pageD ] )
  return [ `package ${params.thePackage}.${params.dbPackage};`,
    '',
    'import java.sql.ResultSet;',
    'import java.sql.SQLException;',
    `import java.util.HashMap;`,
    `import java.util.Map;`,
    '',
    `public class ${javaDbFileName ( params, pageD )}{`,
    ...indentList ( [
      ...makeAllMaps ( pageD, dataDs ),
      ...populateMaps ( pageD, dataDs )
    ] ),
    '}' ]


}