import { ButtonCreator, MakeButton, makeIdForButton } from "../codegen/makeButtons";
import { stateForButtonWithPath } from "../codegen/lens";
import { EnabledBy, enabledByString, getButtonTypeText } from "./enabledBy";

export interface CommonListButtonInPage extends EnabledBy {
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
    import: "@focuson-nw/form_components",
    makeButton: createButton => {
      const { params, parent, name, button } = createButton
      const forButton = stateForButtonWithPath ( createButton, 'ListNextButton' )
      return [ `<ListNextButton id=${makeIdForButton ( name )} ${enabledByString ( button )}title='Next' list={${forButton ( button.list )}} value={${forButton ( button.value )}} ${getButtonTypeText ( button )}/>` ]
    }
  }
}

function ListPrevButton<B extends ListPrevButtonInPage, G> (): ButtonCreator<B, any> {
  return {
    import: "@focuson-nw/form_components",
    makeButton: ( createButton ) => {
      const { params, parent, name, button } = createButton
      const forButton = stateForButtonWithPath ( createButton, 'ListPrevButton' )
      return [ `<ListPrevButton id=${makeIdForButton ( name )} ${enabledByString ( button )}title='Prev' list={${forButton ( button.list )}} value={${forButton ( button.value )}}  ${getButtonTypeText ( button )}/>` ]
    }
  }
}

export function makeListMarkerButtons<G> (): MakeButton<G> {
  return { ListNextButton: ListNextButton (), ListPrevButton: ListPrevButton () }
}