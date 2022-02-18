import { PageD } from "../common/pageD";
import { hasDomainForPage } from "./names";
import { imports } from "./codegen";
import { TSParams } from "./config";
import { applyToTemplate } from "@focuson/template";
import * as fs from "fs";
import { isCommonLens, RestD, unique } from "../common/restD";
import { sortedEntries } from "@focuson/utils";

export function makeFullState ( params: TSParams, pd: PageD[] ) {
  const hasDomains = pd.filter ( x => x.pageType === 'MainPage' ).map ( d => params.pageDomainsFile + "." + hasDomainForPage ( d ) ).join ( ',' )
  const constant = [ 'HasSimpleMessages', 'HasPageSelection', 'HasCommonUrlParams' ].join ( ',' )
  return [ `export interface FullState extends ${constant},${hasDomains}{}` ]
}
export function makeCommon ( params: TSParams, pds: PageD[], rds: RestD[] ): string[] {
  return [ "import {HasSimpleMessages, HasPageSelection} from '@focuson/pages'",
    "import { LensState } from '@focuson/state';",
    "import { Lens, Lenses } from '@focuson/lens';",
    "import { areAllDefined } from '@focuson/utils';",
    "import { or } from '@focuson/utils';", '', '',
    ...imports ( params.pageDomainsFile ),
    ...makeFullState ( params, pds ),
    ...makeGetUrlParams ( params, rds ) ]
}

export function findAllCommonParams ( rds: RestD[] ): string[] {
  return unique ( rds.flatMap ( rd => sortedEntries ( rd.params ).flatMap ( ( [ name, lens ] ) => isCommonLens ( lens ) ? lens.commonLens : [] ) ), x => x )
}

export function makeGetUrlParams ( params: TSParams, rds: RestD[] ) {
  const names = findAllCommonParams ( rds ).map ( s => "'" + s + "'" ).join ( "|" )
  return applyToTemplate ( fs.readFileSync ( 'templates/GetUrlParamsTemplate.ts' ).toString (), { ...params, names } )

}