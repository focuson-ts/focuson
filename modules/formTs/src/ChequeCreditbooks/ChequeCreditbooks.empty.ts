import * as domains from '../ChequeCreditbooks/ChequeCreditbooks.domains'

export const emptyChequeCreditbooks:domains.ChequeCreditbooksDomain =
  {
    "history": [
      {
        "serialNumber": 0,
        "howOrdered": "",
        "dateOrder": "2022-1-1"
      }
    ]
  }
export const emptyChequeCreditbooksHistory:domains.ChequeCreditbooksHistoryDomain =
  [
    {
      "serialNumber": 0,
      "howOrdered": "",
      "dateOrder": "2022-1-1"
    }
  ]
export const emptyChequeCreditbooksHistoryLine:domains.ChequeCreditbooksHistoryLineDomain =
  {
    "serialNumber": 0,
    "howOrdered": "",
    "dateOrder": "2022-1-1"
  }