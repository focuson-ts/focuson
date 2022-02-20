import { AccountIdDD, DataD, DateDD, ManyLineStringDD, MoneyDD, OneLineStringDD, PrimitiveDD, RepeatingDataD } from "../../common/dataD";
import { LabelAndInputCD, TableCD } from "../../common/componentsD";
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
    type: { dataDD: EAccountDisplayTypeDD },
    balance: { dataDD: MoneyDD },
    notes: { dataDD: ManyLineStringDD},
  }
}