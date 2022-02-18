import { PageD } from "../common/pageD";
import { hasDomainForPage } from "./names";
import { imports, indentList } from "./codegen";
import { TSParams } from "./config";
import { applyToTemplate } from "@focuson/template";
import * as fs from "fs";
import { isCommonLens, RestD, unique } from "../common/restD";
import { sortedEntries } from "@focuson/utils";

export function makeFullState ( params: TSParams, pd: PageD[] ): string[] {
  const hasDomains = pd.filter ( x => x.pageType === 'MainPage' ).map ( d => params.pageDomainsFile + "." + hasDomainForPage ( d ) ).join ( ',\n' ).split ( "\n" )
  const constant = [ 'HasSimpleMessages', 'HasPageSelection', `Has${params.commonParams}`, 'HasTagHolder' ].join ( ',' )
  return [ `export interface ${params.stateName} extends ${constant},`, ...indentList ( hasDomains ), `{}` ]
}
export function makeCommon ( params: TSParams, pds: PageD[], rds: RestD[] ): string[] {
  return [ "import {HasSimpleMessages, SimpleMessage, HasPageSelection} from '@focuson/pages'",
    "import { LensState } from '@focuson/state';",
    "import { defaultDateFn } from '@focuson/utils';",
    "import { commonTagFetchProps, HasTagHolder, OnTagFetchErrorFn } from '@focuson/fetcher';",
    "import { Lens, Lenses } from '@focuson/lens';", '', '',
    "import { tagOps } from '@focuson/template';",
    ...imports ( params.pageDomainsFile ),
    ...makeFullState ( params, pds ),
    ...makeCommonParams ( params, rds ) ]
}

export function findAllCommonParams ( rds: RestD[] ): string[] {
  return unique ( rds.flatMap ( rd => sortedEntries ( rd.params ).flatMap ( ( [ name, lens ] ) => isCommonLens ( lens ) ? lens.commonLens : [] ) ), x => x )
}

export function makeCommonParams ( params: TSParams, rds: RestD[] ) {
  const commonParamDefns = findAllCommonParams ( rds ).map ( s => s + "?:string;\n" ).join ( "" )
  return applyToTemplate ( fs.readFileSync ( 'templates/commonTemplate.ts' ).toString (), { ...params, commonParamDefns } )

}