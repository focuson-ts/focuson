import * as domains from '../ETransfer/ETransfer.domains'

export const emptyETransferDataD:domains.ETransferDataDDomain =
  {
    "account": 0,
    "dateOfETransfer": "2022-1-1",
    "description": "",
    "fromAccount": 0,
    "toAccount": 0,
    "monitoringAccount": 0,
    "type": "savings",
    "balance": 0,
    "notes": ""
  }
export const emptyHolidayData:domains.HolidayDataDomain =
  [
    {
      "holiday": "2022-1-1"
    }
  ]
export const emptySingleHoliday:domains.SingleHolidayDomain =
  {
    "holiday": "2022-1-1"
  }