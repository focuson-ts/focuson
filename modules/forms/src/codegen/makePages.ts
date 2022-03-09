import { isMainPage, MainPageD, PageD } from "../common/pageD";
import { TSParams } from "./config";
import { modalName, pageComponentName, pageInState, renderFileName } from "./names";
import { addStringToEndOfAllButLast } from "./codegen";
import { makeEmptyData } from "./makeSample";
import { safeArray } from "@focuson/utils";


export const makeMainPage =<G> ( params: TSParams ) => <B> ( p: MainPageD<B,G> ): string[] => {
  function makeEmpty () {
    let result: any = {}
    result[ p.display.target.join ( "." ) ] = makeEmptyData ( p.display.dataDD )
    return result
  }
  const initialValue = p.initialValue === 'empty' ? makeEmpty () : p.initialValue
  return p.pageType === 'MainPage' ?
    [ `    ${p.name}: { config: simpleMessagesConfig, lens: identity.focusQuery ( '${pageInState ( p )}' ), pageFunction: ${pageComponentName ( p )}(), initialValue: ${JSON.stringify ( initialValue )} }` ]
    : [];
}

export interface ModalCreationData<B,G> {
  name: string,
  modal: PageD<B,G>
}
export function walkModals<B,G> ( ps: PageD<B,G>[] ): ModalCreationData<B,G>[] {
  return ps.flatMap ( p => (isMainPage ( p ) ? safeArray ( p.modals ) : []).map ( ( { modal, path } ) =>
    ({ name: modalName ( p, modal ), path: [ p.name, ...path ], modal }) ) )
}

export const makeModal =<G> ( params: TSParams ) => <B> ( { name, modal }: ModalCreationData<B,G> ): string[] => {
  return [ `    ${name}: { config: simpleMessagesConfig,  pageFunction: ${pageComponentName ( modal )}(), modal: true}` ]
};

export function makePages<B,G> ( params: TSParams, ps: PageD<B,G>[] ): string[] {
  const modals = walkModals ( ps );
  const renderImports = ps.map ( p => `import { ${pageComponentName ( p )} } from '${renderFileName ( '.', params, p )}';` )
  return [
    `import { identityOptics } from "@focuson/lens";`,
    `import { MultiPageDetails, simpleMessagesPageConfig } from "@focuson/pages";`,
    `import {Context,  ${params.stateName} } from "./${params.commonFile}";`,
    ...renderImports,
    // `import { ${allMainPages ( ps ).map ( p => pageComponentName ( p ) ).join ( "," )} } from "./${params.renderFile}";`,
    '',
    `function MyLoading () {`,
    `      return <p>Loading</p>`,
    `}`,
    `const simpleMessagesConfig = simpleMessagesPageConfig<${params.stateName}, string, Context> (  MyLoading )`,
    `const identity = identityOptics<FState> ();`,
    `export const pages: MultiPageDetails<${params.stateName}, Context> = {`,
    ...addStringToEndOfAllButLast ( "," ) ( [ ...ps.flatMap ( makeMainPage ( params ) ), ...modals.flatMap ( makeModal ( params ) ) ] ),
    `  }` ]
}