import { ExampleMainPage, ExampleModalPage } from "../common";
import { enabledByDataD } from "./enabledBy.dataD";


export const EnabledByModalPageD: ExampleModalPage = {
  name: 'EnableByModalPage',
  pageType: 'ModalPopup',
  modes: [ 'view' ],
  display: { dataDD: enabledByDataD, target: '~/onChange' },
  guards: {
    yesButton: { condition: 'equals', path: '~/onChange/dropdown', value: '"Y"', message: 'select yes' },
    noButton: { condition: 'equals', path: '~/onChange/dropdown', value: '"N"', message: 'select no' }
  },
  buttons: {
    commit: { control: 'ModalCommitButton', enabledBy: 'yesButton', validate: false, change: { command: 'message', msg: 'Committed' } },
    commitWithvalidate: { control: 'ModalCommitButton', enabledBy: 'yesButton', validate: true },
    commitWithConfirm: {
      control: 'ModalCommitButton', enabledBy: 'yesButton', validate: true,
      confirm: { type: 'window', confirmText: 'Confirm', cancelText: 'Cancel', messageText: "some message" },
      change: { command: 'message', msg: 'from confirm button' }
    },
    cancel: { control: 'ModalCancelButton', confirm: { type: 'window' } }
  }
}
export const EnabledByPageD: ExampleMainPage = {
  name: "EnabledBy", pageType: 'MainPage',
  display: { dataDD: enabledByDataD, target: '~/onChange' },
  domain: { onChange: { dataDD: enabledByDataD } },
  initialValue: 'empty',

  modals: [ { modal: EnabledByModalPageD } ], modes: [ 'edit' ],
  rest: {},
  guards: { dropdownYes: { condition: 'equals', path: 'dropdown', value: '"Y"' } },
  buttons: {
    page: {
      control: 'ModalButton', modal: EnabledByModalPageD, focusOn: '~/onChange', mode: 'edit',
      changeOnClose: { command: 'message', msg: 'from modal button' }
    },
    pageGuardDirect: {
      guard: { control: 'ModalButton', modal: EnabledByModalPageD, focusOn: '~/onChange', mode: 'edit' },
      by: { condition: 'equals', path: 'dropdown', value: '"Y"' }
    },
    pageGuardName: {
      guard: { control: 'ModalButton', modal: EnabledByModalPageD, focusOn: '~/onChange', mode: 'edit' },
      by: 'dropdownYes'
    }
  }

}