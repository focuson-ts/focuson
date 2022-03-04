import { ButtonCreator, MakeButton } from "../codegen/makeButtons";
import { focusOnFor, focusQueryFor, makeSimpleButton } from "../codegen/codegen";

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

const ListNextButton: ButtonCreator<ListNextButtonInPage> = ( { params, parent, name, button } ) =>
  `<ListNextButton id='${name}' title='Next' list={fullState${focusOnFor ( button.list )}} value={fullState${focusOnFor ( button.value )}} />`

const ListPrevButton: ButtonCreator<ListPrevButtonInPage> = ( { params, parent, name, button } ) =>
  `<ListPrevButton id='${name}' title='Prev' list={fullState${focusOnFor ( button.list )}} value={fullState${focusOnFor ( button.value )}} />`


export const makeListMarkerButtons: MakeButton = { ListNextButton, ListPrevButton }