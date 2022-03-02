import { MakeButton } from "../codegen/makeButtons";
import { makeSimpleButton } from "../codegen/codegen";

export interface ListMarkerNextButtonInPage {
  control: 'ListMarkerNextButton',
}
export interface ListMarkerPrevButtonInPage {
  control: 'ListMarkerPrevButton',
}

export const makeListMarkerButtons: MakeButton = {
  ListMarkerNextButton: ( { params, parent, name, button } ) => `<button id='${name}' title='Next' />`,
  ListMarkerPrevButton: ( { params, parent, name, button } ) => `<button id='${name}' title='Prev' />`,
}