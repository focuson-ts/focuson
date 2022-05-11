import { AccountIdDD, DataD, DateDD, ManyLineStringDD, MoneyDD, OneLineStringDD, RepeatingDataD } from "../../common/dataD";
import { EAccountDisplayTypeDD } from "../eAccounts/eAccountsSummary.dataD";
import { AllGuards } from "../../buttons/guardButton";
import { LayoutCd, TableCD } from "../../common/componentsD";
import { ExampleRepeatingD } from "../common";


export const ETransferDataD: DataD<AllGuards> = {
  name: "ETransferDataD",
  description: "Allows us to make an etransfer",
  layout: { component: LayoutCd, displayParams: { details: '[[1],[3,3],[1,1]]' }  },
  structure: {
    account: { dataDD: AccountIdDD, displayParams: { label: "Account Id", min: 0 } },
    dateOfETransfer: { dataDD: DateDD, displayParams: { datesExcluded: '~/holidays/', workingDaysInFuture: 5 }},
    description: { dataDD: OneLineStringDD, sample: [ 'Why we are doing this transfer' ] },
    fromAccount: { dataDD: AccountIdDD },
    toAccount: { dataDD: AccountIdDD, },
    monitoringAccount: { dataDD: AccountIdDD },
    type: { dataDD: EAccountDisplayTypeDD },
    balance: { dataDD: MoneyDD },
    notes: { dataDD: ManyLineStringDD },
  }
}

export const SingleHolidayDataD: DataD<AllGuards> = {
  name: "SingleHoliday",
  description: "Single Holiday",
  structure: {
    holiday: { dataDD: DateDD, sample: ['2022-05-17','2022-05-20','2022-05-26','2022-05-27']},    
  }
}

export const HolidayDataD: ExampleRepeatingD = {
  paged: false,
  display: TableCD,  
  dataDD: SingleHolidayDataD,
  name: "HolidayData",
  description: ""
}