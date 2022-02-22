import { PageD } from "../common/pageD";
import { componentName, modalName, pageComponentName } from "./names";
import { safeArray } from "@focuson/utils";
import { focusQueryFor } from "./codegen";
import { FState } from "ExampleApp/src/common";
import { CreatePlanDD } from "ExampleApp/src/render";
import { PageMode } from "@focuson/pages";


export interface ModalCreationData {
  name: string;
  path: string[];
  modal: PageD;
  mode: PageMode;
}

export function walkModals ( ps: PageD[] ): ModalCreationData[] {
  return ps.filter ( p => p.pageType === 'MainPage' ).flatMap ( p => safeArray ( p.modals ).map ( ( { modal, path } ) =>
    ({ name: modalName ( p, modal ), path: [ p.name, ...path ], modal, mode: 'edit' }) ) )
}

export function makeModal ( { name, path, modal, mode }: ModalCreationData ): string[] {
  const focus = focusQueryFor ( path )
  return [ `      ${name}: { displayModalFn: ${pageComponentName ( modal )}, mode: '${mode}', lens: identity${focus}}` ]
}


export function makeModals ( ps: PageD[] ): string[] {
  let modals = walkModals ( ps );
  return [
    `import { Lenses } from "@focuson/lens";`,
    `import { ModalPagesDetails } from "@focuson/pages";`,
    `import { ${modals.map ( m => pageComponentName ( m.modal ) ).join ( "," )} } from "./render";`,
    `import { FState } from "./common";`,
    ``,
    ``,
    `export type Modals = typeof modals`,
    `const identity = Lenses.identity<FState> ( 'allModalPages' );`,
    `export const modals: ModalPagesDetails<FState> = {`,
    ...modals.flatMap ( makeModal ),
    `}` ]
}