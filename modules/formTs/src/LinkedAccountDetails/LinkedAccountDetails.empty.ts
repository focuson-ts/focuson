import * as domains from '../LinkedAccountDetails/LinkedAccountDetails.domains'

export const emptyCollectionItem:domains.CollectionItemDomain =
  {
    "paymentId": 0,
    "collectionDate": "2022-1-1",
    "amount": 0,
    "status": ""
  }
export const emptyCollectionsList:domains.CollectionsListDomain =
  [
    {
      "paymentId": 0,
      "collectionDate": "2022-1-1",
      "amount": 0,
      "status": ""
    }
  ]
export const emptyCollectionSummary:domains.CollectionSummaryDomain =
  {
    "lastCollectionDate": "",
    "lastCollectionAmount": 0,
    "nextCollectionDate": "",
    "nextCollectionAmount": 0,
    "allowance": 0,
    "period": ""
  }
export const emptyCreatePayment:domains.CreatePaymentDomain =
  {
    "amount": 0,
    "collectionDate": "2022-1-1",
    "reason": "",
    "allowance": 0,
    "period": ""
  }
export const emptyLinkedAccountDetailsDisplay:domains.LinkedAccountDetailsDisplayDomain =
  {
    "mandate": {
      "sortCode": "",
      "accountId": 0,
      "mandateStatus": "",
      "bankName": "",
      "accountName": "",
      "mandateRef": ""
    },
    "collectionSummary": {
      "lastCollectionDate": "",
      "lastCollectionAmount": 0,
      "nextCollectionDate": "",
      "nextCollectionAmount": 0,
      "allowance": 0,
      "period": ""
    },
    "collectionHistory": [
      {
        "paymentId": 0,
        "collectionDate": "2022-1-1",
        "amount": 0,
        "status": ""
      }
    ]
  }
export const emptyMandate:domains.MandateDomain =
  {
    "sortCode": "",
    "accountId": 0,
    "mandateStatus": "",
    "bankName": "",
    "accountName": "",
    "mandateRef": ""
  }
export const emptyMandateList:domains.MandateListDomain =
  [
    {
      "sortCode": "",
      "accountId": 0,
      "mandateStatus": "",
      "bankName": "",
      "accountName": "",
      "mandateRef": ""
    }
  ]
export const emptyMandateSearch:domains.MandateSearchDomain =
  {
    "sortCode": "",
    "searchResults": [
      {
        "sortCode": "",
        "accountId": 0,
        "mandateStatus": "",
        "bankName": "",
        "accountName": "",
        "mandateRef": ""
      }
    ]
  }
export const emptyOverpaymentHistory:domains.OverpaymentHistoryDomain =
  [
    {
      "amountReceived": 0,
      "date": "2022-1-1",
      "status": ""
    }
  ]
export const emptyOverpaymentHistoryLine:domains.OverpaymentHistoryLineDomain =
  {
    "amountReceived": 0,
    "date": "2022-1-1",
    "status": ""
  }
export const emptyOverpaymentPage:domains.OverpaymentPageDomain =
  {
    "history": [
      {
        "amountReceived": 0,
        "date": "2022-1-1",
        "status": ""
      }
    ],
    "drawDownDate": "2022-1-1",
    "initialBorrowing": 0
  }