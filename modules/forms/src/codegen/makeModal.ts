import { PageD } from "../common/pageD";
import { componentName, pageComponentName } from "./names";
import { safeArray } from "@focuson/utils";
import { focusQueryFor } from "./codegen";
import { FState } from "ExampleApp/src/common";
import { CreatePlanDD } from "ExampleApp/src/render";


export interface ModalCreationData {
  name: string,
  path: string[],
  modal: PageD
}

export function walkModals ( ps: PageD[] ): ModalCreationData[] {
  return ps.filter ( p => p.pageType === 'MainPage' ).flatMap ( p => safeArray ( p.modals ).map ( ( { modal, path } ) =>
    ({ name: [ p.name, modal.name ].join ( "_" ), path: [ p.name, ...path ], modal }) ) )
}

export function makeModal ( { name, path, modal }: ModalCreationData ): string[] {
  const focus = focusQueryFor ( path )
  return [ `      ${name}: { displayModalFn: ${componentName ( modal.display.dataDD )}, lens: identity${focus}}` ]
}


export function makeModals ( ps: PageD[] ): string[] {
  let modals = walkModals ( ps );
  return [
    `import { Lenses } from "@focuson/lens";`,
    `import { ModalPagesDetails } from "@focuson/pages";`,
    `import { ${modals.map ( m => componentName ( m.modal.display.dataDD ) ).join ( "," )} } from "./render";`,
    `import { FState } from "./common";`,
    ``,
    ``,
    `export type Modals = typeof modals`,
    `const identity = Lenses.identity<FState> ( 'allModalPages' );`,
    `export const modals: ModalPagesDetails<FState> = {`,
    ...modals.flatMap ( makeModal ),
    `}` ]
}