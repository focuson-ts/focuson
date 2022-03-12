import { ButtonCreator, MakeButton } from "../codegen/makeButtons";
import { focusOnFor } from "../codegen/codegen";

export interface CommonListButtonInPage {
  /** the path to the value from the root of this page's domain */
  value: string[];
  /** the path to the list that this is about */
  list: string[];
}

export interface ListNextButtonInPage extends CommonListButtonInPage {
  control: 'ListNextButton',
}
export interface ListPrevButtonInPage extends CommonListButtonInPage {
  control: 'ListPrevButton',
}

function ListNextButton<B extends ListNextButtonInPage, G> (): ButtonCreator<B, any> {
  return {
    import: "../copied/listNextPrevButtons",
    makeButton: ( { params, parent, name, button } ) =>
      [ `<ListNextButton id='${name}' title='Next' list={fullState${focusOnFor ( button.list )}} value={fullState${focusOnFor ( button.value )}} />` ]
  }
}

function ListPrevButton<B extends ListPrevButtonInPage, G> (): ButtonCreator<B, any> {
  return {
    import: "../copied/listNextPrevButtons",
    makeButton: ( { params, parent, name, button } ) =>
      [ `<ListPrevButton id='${name}' title='Prev' list={fullState${focusOnFor ( button.list )}} value={fullState${focusOnFor ( button.value )}} />` ]
  }
}

export function makeListMarkerButtons<G> (): MakeButton<G> {
  return { ListNextButton: ListNextButton (), ListPrevButton: ListPrevButton () }
}