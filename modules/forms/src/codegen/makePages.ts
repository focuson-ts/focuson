import { allMainPages, flatMapToModal, InitialValue, isMainPage, MainPageD, PageD, PageDisplay } from "../common/pageD";
import { TSParams } from "./config";
import { modalName, optionalsFileName, optionalsName, pageComponentName, pageInState, renderFileName } from "./names";
import { addStringToEndOfAllButLast } from "./codegen";
import { makeEmptyData } from "./makeSample";
import { safeArray, toArray } from "@focuson/utils";
import { Lenses, parsePath } from "@focuson/lens";
import { pathBuilderForLensIncPage } from "./lens";


export function makeInitialValue<B, G> ( display: PageDisplay<G>, name: string, initialValue: undefined | InitialValue ) {
  function makeEmpty () {
    // const lens = parsePath ( display.target, pathBuilderForLensIncPage ( name ) );
    return Lenses.identity<any> ().set ( {}, makeEmptyData ( display.dataDD ) )
  }
  if ( initialValue === undefined ) return undefined
  return toArray ( initialValue ).map ( emptyOrCommand =>
    emptyOrCommand === 'empty' ? { command: 'set', path: display.target, value: makeEmpty () } : emptyOrCommand )
}
export const makeMainPage = <G> ( params: TSParams ) => <B> ( p: MainPageD<B, G> ): string[] => {
  const initialValue = makeInitialValue ( p.display, p.name, p.initialValue )
  return isMainPage ( p ) ?
    [ `    ${p.name}: {pageType: '${p.pageType}',  config: simpleMessagesConfig, lens: identity.focusQuery ( '${pageInState ( p )}' ), pageFunction: ${pageComponentName ( p )}(), initialValue: ${JSON.stringify ( initialValue )}, pageMode: '${p.modes[ 0 ]}',namedOptionals: ${optionalsName ( p )} }` ]
    : [];
}

export interface ModalCreationData<B, G> {
  name: string,
  main: PageD<B, G>
  modal: PageD<B, G>
}
export function walkModals<B, G> ( ps: PageD<B, G>[] ): ModalCreationData<B, G>[] {
  return allMainPages ( ps ).flatMap ( main => {
    return safeArray ( main.modals ).flatMap ( flatMapToModal ).map ( ( { modal } ) =>
      ({ name: modalName ( main, modal ), main, modal }) )
  } )
}

export const makeModal = <G> ( params: TSParams ) => <B> ( { name, modal }: ModalCreationData<B, G> ): string[] => {
  return [ `    ${name}: {pageType: '${modal.pageType}',  config: simpleMessagesConfig,  pageFunction: ${pageComponentName ( modal )}()}` ]
};

export function makePages<B, G> ( params: TSParams, ps: MainPageD<B, G>[] ): string[] {
  const modals = walkModals ( ps );
  const renderImports = ps.flatMap ( mainPage => [
    `import { ${pageComponentName ( mainPage )} } from '${renderFileName ( '.', params, mainPage, mainPage )}';`,
    ...safeArray ( mainPage.modals ).flatMap ( flatMapToModal ).map ( ( { modal } ) => `import { ${pageComponentName ( modal )} } from '${renderFileName ( '.', params, mainPage, modal )}';` )
  ] )
  const optionalImports = ps.map ( p => `import { ${optionalsName ( p )} } from "${optionalsFileName ( '.', params, p )}"; ` )
  return [
    `import { identityOptics } from "@focuson/lens";`,
    `import { Loading, MultiPageDetails, simpleMessagesPageConfig } from "@focuson/pages";`,
    `import {Context,  ${params.stateName} } from "./${params.commonFile}";`,
    ...renderImports,
    ...optionalImports,
    '',

    `const simpleMessagesConfig = simpleMessagesPageConfig<${params.stateName}, string, Context> (  Loading )`,
    `const identity = identityOptics<FState> ();`,
    `export const pages: MultiPageDetails<${params.stateName}, Context> = {`,
    ...addStringToEndOfAllButLast ( "," ) ( [ ...ps.flatMap ( makeMainPage ( params ) ), ...modals.flatMap ( makeModal ( params ) ) ] ),
    `  }` ]
}