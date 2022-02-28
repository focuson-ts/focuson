import { AccountIdDD, DataD, DateDD, ManyLineStringDD, MoneyDD, OneLineStringDD } from "../../common/dataD";
import { EAccountDisplayTypeDD } from "../eAccounts/eAccountsSummary.dataD";


export const ETransferDataD: DataD = {
  name: "ETransferDataD",
  description: "Allows us to make an etransfer",
  structure: {
    amount: { dataDD: AccountIdDD, displayParams: { label: "Account Id" } },
    dateOfETransfer: { dataDD: DateDD },
    description: { dataDD: OneLineStringDD, sample: [ 'Why we are doing this transfer' ] },
    fromAccount: { dataDD: AccountIdDD },
    toAccount: { dataDD: AccountIdDD },
    monitoringAccount: { dataDD: AccountIdDD },
    type: { dataDD: EAccountDisplayTypeDD },
    balance: { dataDD: MoneyDD },
    notes: { dataDD: ManyLineStringDD},
  }
}