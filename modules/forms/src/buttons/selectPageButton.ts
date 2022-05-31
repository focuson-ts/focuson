import { ButtonCreator, MakeButton, makeIdForButton } from "../codegen/makeButtons";
import { decamelize } from "@focuson/utils";
import { indentList, opt, optT } from "../codegen/codegen";
import { restDetailsName } from "../codegen/names";
import { EnabledBy, enabledByString } from "./enabledBy";
import { ButtonWithControl } from "./allButtons";
import { PageMode } from "@focuson/pages";


function makeSelectPageButton<B extends SelectButtonInPage<G>, G> (): ButtonCreator<SelectButtonInPage<G>, G> {
  return {
    import: '@focuson/pages',
    makeButton: ( { params, mainPage, parent, name, button } ) => {
      const { id, pageMode, pageName, text } = button

      return [ `<SelectPage state={state} id=${makeIdForButton ( name )} ${enabledByString ( button )} `,
        ...indentList ( [
          ...opt ( 'text', text ),
          ...opt ( 'pageName', pageName ),
          ...opt ( 'pageMode', pageMode ) ] ),
        ' />' ]
    }
  }
}

export function makeSelectPageButtons<G> (): MakeButton<G> {
  return { SelectPage: makeSelectPageButton () }
}

export function isSelectButtonInPage ( p: ButtonWithControl ): p is SelectButtonInPage<any> {
  return p.control === 'SelectPage'
}
export interface SelectButtonInPage<G> extends EnabledBy {
  control: 'SelectPage'
  id?: string;
  text?: string;
  pageMode: PageMode,
  pageName: string,
}

