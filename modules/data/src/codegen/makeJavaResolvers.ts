import { findUniqueDataDsAndRestTypeDetails, RestD } from "../common/restD";
import { resolverName } from "./makeGraphQlTypes";


export function makeJavaResolversInterface ( packageName: string, intName: string, rs: RestD[] ): string[] {
  return [
    `package ${packageName};`,
    '',
    'import graphql.schema.DataFetcher;',
    '',
    `interface ${intName} {`,
    ...findUniqueDataDsAndRestTypeDetails ( rs ).flatMap ( ( [ datad, rad ] ) => `   public DataFetcher ${resolverName ( datad, rad )}();` ),
    '}' ]
}