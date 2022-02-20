import { allMainPages, PageD } from "../common/pageD";
import { TSParams } from "./config";
import { emptyName, pageComponentName, pageInState } from "./names";
import { safeArray } from "@focuson/utils";
import { addStringToEndOfAllButLast } from "./codegen";
import { makeEmptyData } from "./makeSample";

export const makeMainPage = ( params: TSParams ) => ( p: PageD ): string[] => {
  function makeEmpty () {
    let result: any = {}
    result[ p.display.target.join ( "." ) ] = makeEmptyData ( p.display.dataDD )
    return result
  }
  const initialValue = p.initialValue === 'empty' ? makeEmpty () : p.initialValue
  return p.pageType === 'MainPage' ?
    [ `    ${p.name}: { config: simpleMessagesConfig, lens: identityOptics<${params.stateName}> ().focusQuery ( '${pageInState ( p )}' ), pageFunction: ${pageComponentName ( p )}(), initialValue: ${JSON.stringify ( initialValue )} }` ]
    : [];
}

export function makePages ( params: TSParams, ps: PageD[] ): string[] {

  //import { identityOptics } from "@focuson/lens";
  // import { MultiPageDetails } from "@focuson/pages";
  // import { FState } from "./common";
  // import { EAccountsSummaryPage, ETransferPage, OccupationAndIncomeDetailsPage } from "./render";
  return [
    `import { identityOptics } from "@focuson/lens";`,
    `import { ModalPagesDetails, MultiPageDetails, simpleMessagesPageConfig } from "@focuson/pages";`,
    `import { ${params.stateName} } from "./${params.commonFile}";`,
    `import { ${allMainPages ( ps ).map ( p => pageComponentName ( p ) ).join ( "," )} } from "./${params.renderFile}";`,
    `function MyLoading () {`,
    `      return <p>Loading</p>`,
    `}`,
    `export const modals: ModalPagesDetails<FState> = {}`,
    `export type Modals = typeof modals`,
    `const simpleMessagesConfig = simpleMessagesPageConfig<${params.stateName}, string, Modals> ( modals, MyLoading )`,
    `export const pages: MultiPageDetails<${params.stateName}, any> = {`,
    ...addStringToEndOfAllButLast ( "," ) ( ps.flatMap ( makeMainPage ( params ) ) ),
    `  }` ]
}