import { ButtonCreator, MakeButton } from "../codegen/makeButtons";
import { stateFocusQueryForRepl } from "../codegen/codegen";
import { stateFocusQueryWithTildaFromPage, stateForButton } from "../codegen/lens";

export interface CommonListButtonInPage {
  /** the path to the value from the root of this page's domain */
  value: string;
  /** the path to the list that this is about */
  list: string;
}

export interface ListNextButtonInPage extends CommonListButtonInPage {
  control: 'ListNextButton',
}
export interface ListPrevButtonInPage extends CommonListButtonInPage {
  control: 'ListPrevButton',
}

function ListNextButton<B extends ListNextButtonInPage, G> (): ButtonCreator<B, any> {
  return {
    import: "@focuson/form_components",
    makeButton: createButton => {
      const { params, parent, name, button } = createButton
      const forButton = stateForButton ( createButton, 'ListNextButton' )
      return [ `<ListNextButton id='${name}' title='Next' list={${forButton ( button.list )}} value={${forButton( button.value)}} />` ]
    }
  }
}

function ListPrevButton<B extends ListPrevButtonInPage, G> (): ButtonCreator<B, any> {
  return {
    import: "@focuson/form_components",
    makeButton: ( createButton ) => {
      const { params, parent, name, button } = createButton
      const forButton = stateForButton ( createButton, 'ListPrevButton' )
      return [ `<ListPrevButton id='${name}' title='Prev' list={${forButton ( button.list )}} value={${forButton( button.value)}} />` ]
    }
  }
}

export function makeListMarkerButtons<G> (): MakeButton<G> {
  return { ListNextButton: ListNextButton (), ListPrevButton: ListPrevButton () }
}