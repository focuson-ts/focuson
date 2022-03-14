import { AccountIdDD, DataD, DateDD, ManyLineStringDD, MoneyDD, OneLineStringDD } from "../../common/dataD";
import { EAccountDisplayTypeDD } from "../eAccounts/eAccountsSummary.dataD";
import { AllGuards } from "../../buttons/guardButton";
import { LayoutCd } from "../../common/componentsD";


export const ETransferDataD: DataD<AllGuards> = {
  name: "ETransferDataD",
  description: "Allows us to make an etransfer",
  layout: { component: LayoutCd, params: { details:'[[1],[3,3]]'} },
  structure: {
    account: { dataDD: AccountIdDD, displayParams: { label: "Account Id" , min: 0} },
    dateOfETransfer: { dataDD: DateDD },
    description: { dataDD: OneLineStringDD, sample: [ 'Why we are doing this transfer' ] },
    fromAccount: { dataDD: AccountIdDD },
    toAccount: { dataDD: AccountIdDD ,},
    monitoringAccount: { dataDD: AccountIdDD },
    type: { dataDD: EAccountDisplayTypeDD },
    balance: { dataDD: MoneyDD },
    notes: { dataDD: ManyLineStringDD },
  }
}