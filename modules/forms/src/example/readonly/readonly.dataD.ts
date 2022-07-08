import { ExampleDataD, ExampleRepeatingD } from "../common";
import { BooleanDD, ManyLineStringDD, NatNumDd, PrimitiveDD, StringDD, stringPrimDD, StringPrimitiveDD } from "../../common/dataD";
import { yesNoDD } from "../SingleOccupation/singleOccupation.dataD";
import { LabelAndDropDownCD, LabelAndDropDownFromDataCD, LabelAndDropDownWithVaryingContentCD } from "../../common/componentsD";
import { currencyDD } from "../payments/payments.restD";

export const reasonsEnum = { Reason1: 'Because I wanted to', Reason2: 'I just di d it', Reason3: "Who cares" }
export const reasonDD: PrimitiveDD = {
  ...StringDD,
  display: LabelAndDropDownCD,
  displayParams: { pleaseSelect: 'Select...' },
  enum: reasonsEnum
}
export const actionEnum = { action1: 'Shoot the messenger', action2: 'Throw a paddy', action3: "Say thank you" }
export type ActionEnums = typeof actionEnum
export function actionEnums<K extends keyof ActionEnums> ( ...as: K[] ) {
  return Object.fromEntries ( as.map ( a => [ a, actionEnum[ a ] ] ) )
}
const nextActionDD: PrimitiveDD = {
  ...StringDD,
  display: LabelAndDropDownWithVaryingContentCD,
  displayParams: { pleaseSelect: 'Select...' },
  // enum: { action1: 'Shoot the messenger', action2: 'Throw a paddy', action3: "Say thank you" }
}

export const currencyListDD: ExampleRepeatingD = {
  name: 'CurrencyDropDownForReadOnly',
  dataDD: currencyDD,
  description: "",
  display: LabelAndDropDownFromDataCD,
  displayParams: { data: '~/currency', dataId: 'id', dataField: 'currency' },
  paged: false,

}
const CurrencyEnum: StringPrimitiveDD = {
  ...stringPrimDD,
  name: 'CurrencyEnum',
  description: "Euros or GBP",
  display: LabelAndDropDownFromDataCD,
  displayParams: { data: '~/currency', dataId: 'id', dataField: 'currency', pleaseSelect: 'Please select' },
}


export const readonlyDD: ExampleDataD = {
  description: "",
  name: "OnChange",
  structure: {
    labelAndString: { dataDD: StringDD, displayParams: { readonly: true } },
    labelAndNumber: { dataDD: NatNumDd, displayParams: { readonly: true } },
    labelAndCheckbox: { dataDD: BooleanDD, displayParams: { readonly: true } },
    textArea: { dataDD: ManyLineStringDD, displayParams: { readonly: true } },
    labelAndDropDown: { dataDD: yesNoDD, displayParams: { readonly: true } },
    dropdown: { dataDD: reasonDD, displayParams: { readonly: true } },
    dropdownFromData: { dataDD: CurrencyEnum, displayParams: { readonly: true } },
    dropdownWithVaryingContent: {
      dataDD: nextActionDD, displayParams: {
        readonly: true,
        selector: 'dropdown',
        pleaseSelect: "please select",
        enums: {
          Reason1: actionEnums ( 'action1', 'action2' ),
          Reason2: actionEnums ( 'action1' ),
          Reason3: actionEnums ( 'action3' )
        }
      }
    },

  }
}