import { ExampleMainPage, ExampleModalPage } from "../common";
import { enabledByDataD } from "./enabledBy.dataD";


export const EnabledByModalPageD: ExampleModalPage = {
  name: 'EnableByModalPage',
  pageType: 'ModalPopup',
  modes: [ 'view' ],
  display: { dataDD: enabledByDataD, target: '~/onChange' },
  guards: {
    yesButton: { condition: 'equals', path: '~/onChange/dropdown', value: '"Y"' },
    noButton: { condition: 'equals', path: '~/onChange/dropdown', value: '"N"' }
  },
  buttons: {
    commit: { control: 'ModalCommitButton', enabledBy: 'yesButton', validate: false },
    commitWithvalidate: { control: 'ModalCommitButton', enabledBy: 'yesButton', validate: true },
    cancel: { control: 'ModalCancelButton', enabledBy: 'noButton' }
  }
}
export const EnabledByPageD: ExampleMainPage = {
  name: "EnabledBy", pageType: 'MainPage',
  display: { dataDD: enabledByDataD, target: '~/onChange' },
  domain: { onChange: { dataDD: enabledByDataD } },
  initialValue: 'empty',

  modals: [{modal: EnabledByModalPageD}], modes: [ 'edit' ],
  rest: {},
  buttons: {
    page: { control: 'ModalButton', modal: EnabledByModalPageD, focusOn: '~/onChange', mode: 'edit' }
  }

}