import * as domains from '../LinkedAccountDetails/LinkedAccountDetails.domains'

export const sampleCollectionItem0: domains.CollectionItemDomain = 
{
  "paymentId": 123,
  "collectionDate": "2020-10-01",
  "amount": 56657,
  "status": "C"
}
export const sampleCollectionsList0: domains.CollectionsListDomain = 
[
  {
    "paymentId": 123,
    "collectionDate": "2020-10-01",
    "amount": 56657,
    "status": "C"
  },
  {
    "paymentId": 456,
    "collectionDate": "2022-14-01",
    "amount": 32834,
    "status": "P"
  },
  {
    "paymentId": 123,
    "collectionDate": "2020-10-01",
    "amount": 56657,
    "status": "C"
  },
  {
    "paymentId": 456,
    "collectionDate": "2022-14-01",
    "amount": 32834,
    "status": "P"
  }
]
export const sampleCollectionSummary0: domains.CollectionSummaryDomain = 
{
  "lastCollectionDate": "2021/10/6",
  "lastCollectionAmount": 1234,
  "nextCollectionDate": "2022/10/6",
  "nextCollectionAmount": 13434,
  "allowance": 1000,
  "period": "Monthly"
}
export const sampleCreatePayment0: domains.CreatePaymentDomain = 
{
  "amount": 56657,
  "collectionDate": "2020-10-01",
  "reason": "",
  "allowance": 123,
  "period": "Monthly"
}
export const sampleLinkedAccountDetailsDisplay0: domains.LinkedAccountDetailsDisplayDomain = 
{
  "mandate": {
    "sortCode": "10-11-12",
    "accountId": 12341234,
    "mandateStatus": "ACTIVE",
    "bankName": "Bank Of Happiness",
    "accountName": "F & J Bloggs",
    "mandateRef": "12099845-34"
  },
  "collectionSummary": {
    "lastCollectionDate": "2021/10/6",
    "lastCollectionAmount": 1234,
    "nextCollectionDate": "2022/10/6",
    "nextCollectionAmount": 13434,
    "allowance": 1000,
    "period": "Monthly"
  },
  "collectionHistory": [
    {
      "paymentId": 123,
      "collectionDate": "2020-10-01",
      "amount": 56657,
      "status": "C"
    },
    {
      "paymentId": 456,
      "collectionDate": "2022-14-01",
      "amount": 32834,
      "status": "P"
    },
    {
      "paymentId": 123,
      "collectionDate": "2020-10-01",
      "amount": 56657,
      "status": "C"
    },
    {
      "paymentId": 456,
      "collectionDate": "2022-14-01",
      "amount": 32834,
      "status": "P"
    }
  ]
}
export const sampleMandate0: domains.MandateDomain = 
{
  "sortCode": "10-11-12",
  "accountId": 12341234,
  "mandateStatus": "ACTIVE",
  "bankName": "Bank Of Happiness",
  "accountName": "F & J Bloggs",
  "mandateRef": "12099845-34"
}
export const sampleMandateList0: domains.MandateListDomain = 
[
  {
    "sortCode": "10-11-12",
    "accountId": 12341234,
    "mandateStatus": "ACTIVE",
    "bankName": "Bank Of Happiness",
    "accountName": "F & J Bloggs",
    "mandateRef": "12099845-34"
  },
  {
    "sortCode": "23-54-12",
    "accountId": 23456123,
    "mandateStatus": "ACTIVE",
    "bankName": "Royal Bank of Success",
    "accountName": "F & J Bloggs",
    "mandateRef": "12099845-78"
  },
  {
    "sortCode": "10-11-12",
    "accountId": 3245454,
    "mandateStatus": "ACTIVE",
    "bankName": "Bank Of Happiness",
    "accountName": "F & J Bloggs",
    "mandateRef": "12099845-34"
  },
  {
    "sortCode": "23-54-12",
    "accountId": 12341234,
    "mandateStatus": "ACTIVE",
    "bankName": "Royal Bank of Success",
    "accountName": "F & J Bloggs",
    "mandateRef": "12099845-78"
  },
  {
    "sortCode": "10-11-12",
    "accountId": 23456123,
    "mandateStatus": "ACTIVE",
    "bankName": "Bank Of Happiness",
    "accountName": "F & J Bloggs",
    "mandateRef": "12099845-34"
  }
]
export const sampleMandateSearch0: domains.MandateSearchDomain = 
{
  "sortCode": "10-11-12",
  "searchResults": [
    {
      "sortCode": "10-11-12",
      "accountId": 12341234,
      "mandateStatus": "ACTIVE",
      "bankName": "Bank Of Happiness",
      "accountName": "F & J Bloggs",
      "mandateRef": "12099845-34"
    },
    {
      "sortCode": "23-54-12",
      "accountId": 23456123,
      "mandateStatus": "ACTIVE",
      "bankName": "Royal Bank of Success",
      "accountName": "F & J Bloggs",
      "mandateRef": "12099845-78"
    },
    {
      "sortCode": "10-11-12",
      "accountId": 3245454,
      "mandateStatus": "ACTIVE",
      "bankName": "Bank Of Happiness",
      "accountName": "F & J Bloggs",
      "mandateRef": "12099845-34"
    },
    {
      "sortCode": "23-54-12",
      "accountId": 12341234,
      "mandateStatus": "ACTIVE",
      "bankName": "Royal Bank of Success",
      "accountName": "F & J Bloggs",
      "mandateRef": "12099845-78"
    },
    {
      "sortCode": "10-11-12",
      "accountId": 23456123,
      "mandateStatus": "ACTIVE",
      "bankName": "Bank Of Happiness",
      "accountName": "F & J Bloggs",
      "mandateRef": "12099845-34"
    }
  ]
}
export const sampleOverpaymentHistory0: domains.OverpaymentHistoryDomain = 
[
  {
    "amountReceived": 1234,
    "date": "2020/10/1",
    "status": "CANCELLED"
  },
  {
    "amountReceived": 3656734,
    "date": "2021/9/1",
    "status": "COLLECTED"
  },
  {
    "amountReceived": 1234,
    "date": "2020/10/1",
    "status": "CANCELLED"
  }
]
export const sampleOverpaymentHistoryLine0: domains.OverpaymentHistoryLineDomain = 
{
  "amountReceived": 1234,
  "date": "2020/10/1",
  "status": "CANCELLED"
}
export const sampleOverpaymentPage0: domains.OverpaymentPageDomain = 
{
  "history": [
    {
      "amountReceived": 1234,
      "date": "2020/10/1",
      "status": "CANCELLED"
    },
    {
      "amountReceived": 3656734,
      "date": "2021/9/1",
      "status": "COLLECTED"
    },
    {
      "amountReceived": 1234,
      "date": "2020/10/1",
      "status": "CANCELLED"
    }
  ],
  "drawDownDate": "2020/10/1",
  "initialBorrowing": 100010
}
export const sampleCollectionItem1: domains.CollectionItemDomain = 
{
  "paymentId": 456,
  "collectionDate": "2022-14-01",
  "amount": 32834,
  "status": "P"
}
export const sampleCollectionsList1: domains.CollectionsListDomain = 
[
  {
    "paymentId": 456,
    "collectionDate": "2022-14-01",
    "amount": 32834,
    "status": "P"
  },
  {
    "paymentId": 456,
    "collectionDate": "2022-14-01",
    "amount": 32834,
    "status": "P"
  },
  {
    "paymentId": 123,
    "collectionDate": "2020-10-01",
    "amount": 56657,
    "status": "C"
  },
  {
    "paymentId": 456,
    "collectionDate": "2022-14-01",
    "amount": 32834,
    "status": "P"
  }
]
export const sampleCollectionSummary1: domains.CollectionSummaryDomain = 
{
  "lastCollectionDate": "2021/12/5",
  "lastCollectionAmount": 456455,
  "nextCollectionDate": "2022/12/6",
  "nextCollectionAmount": 123455,
  "allowance": 2000,
  "period": "Yearly"
}
export const sampleCreatePayment1: domains.CreatePaymentDomain = 
{
  "amount": 32834,
  "collectionDate": "2022-14-01",
  "reason": "A",
  "allowance": 456,
  "period": "Yearly"
}
export const sampleLinkedAccountDetailsDisplay1: domains.LinkedAccountDetailsDisplayDomain = 
{
  "mandate": {
    "sortCode": "23-54-12",
    "accountId": 23456123,
    "mandateStatus": "ACTIVE",
    "bankName": "Royal Bank of Success",
    "accountName": "F & J Bloggs",
    "mandateRef": "12099845-78"
  },
  "collectionSummary": {
    "lastCollectionDate": "2021/12/5",
    "lastCollectionAmount": 456455,
    "nextCollectionDate": "2022/12/6",
    "nextCollectionAmount": 123455,
    "allowance": 2000,
    "period": "Yearly"
  },
  "collectionHistory": [
    {
      "paymentId": 456,
      "collectionDate": "2022-14-01",
      "amount": 32834,
      "status": "P"
    },
    {
      "paymentId": 456,
      "collectionDate": "2022-14-01",
      "amount": 32834,
      "status": "P"
    },
    {
      "paymentId": 123,
      "collectionDate": "2020-10-01",
      "amount": 56657,
      "status": "C"
    },
    {
      "paymentId": 456,
      "collectionDate": "2022-14-01",
      "amount": 32834,
      "status": "P"
    }
  ]
}
export const sampleMandate1: domains.MandateDomain = 
{
  "sortCode": "23-54-12",
  "accountId": 23456123,
  "mandateStatus": "ACTIVE",
  "bankName": "Royal Bank of Success",
  "accountName": "F & J Bloggs",
  "mandateRef": "12099845-78"
}
export const sampleMandateList1: domains.MandateListDomain = 
[
  {
    "sortCode": "23-54-12",
    "accountId": 23456123,
    "mandateStatus": "ACTIVE",
    "bankName": "Royal Bank of Success",
    "accountName": "F & J Bloggs",
    "mandateRef": "12099845-78"
  },
  {
    "sortCode": "10-11-12",
    "accountId": 12341234,
    "mandateStatus": "ACTIVE",
    "bankName": "Bank Of Happiness",
    "accountName": "F & J Bloggs",
    "mandateRef": "12099845-34"
  },
  {
    "sortCode": "23-54-12",
    "accountId": 23456123,
    "mandateStatus": "ACTIVE",
    "bankName": "Royal Bank of Success",
    "accountName": "F & J Bloggs",
    "mandateRef": "12099845-78"
  },
  {
    "sortCode": "10-11-12",
    "accountId": 3245454,
    "mandateStatus": "ACTIVE",
    "bankName": "Bank Of Happiness",
    "accountName": "F & J Bloggs",
    "mandateRef": "12099845-34"
  },
  {
    "sortCode": "23-54-12",
    "accountId": 12341234,
    "mandateStatus": "ACTIVE",
    "bankName": "Royal Bank of Success",
    "accountName": "F & J Bloggs",
    "mandateRef": "12099845-78"
  }
]
export const sampleMandateSearch1: domains.MandateSearchDomain = 
{
  "sortCode": "23-54-12",
  "searchResults": [
    {
      "sortCode": "23-54-12",
      "accountId": 23456123,
      "mandateStatus": "ACTIVE",
      "bankName": "Royal Bank of Success",
      "accountName": "F & J Bloggs",
      "mandateRef": "12099845-78"
    },
    {
      "sortCode": "10-11-12",
      "accountId": 12341234,
      "mandateStatus": "ACTIVE",
      "bankName": "Bank Of Happiness",
      "accountName": "F & J Bloggs",
      "mandateRef": "12099845-34"
    },
    {
      "sortCode": "23-54-12",
      "accountId": 23456123,
      "mandateStatus": "ACTIVE",
      "bankName": "Royal Bank of Success",
      "accountName": "F & J Bloggs",
      "mandateRef": "12099845-78"
    },
    {
      "sortCode": "10-11-12",
      "accountId": 3245454,
      "mandateStatus": "ACTIVE",
      "bankName": "Bank Of Happiness",
      "accountName": "F & J Bloggs",
      "mandateRef": "12099845-34"
    },
    {
      "sortCode": "23-54-12",
      "accountId": 12341234,
      "mandateStatus": "ACTIVE",
      "bankName": "Royal Bank of Success",
      "accountName": "F & J Bloggs",
      "mandateRef": "12099845-78"
    }
  ]
}
export const sampleOverpaymentHistory1: domains.OverpaymentHistoryDomain = 
[
  {
    "amountReceived": 3656734,
    "date": "2021/9/1",
    "status": "COLLECTED"
  },
  {
    "amountReceived": 1234,
    "date": "2020/10/1",
    "status": "CANCELLED"
  },
  {
    "amountReceived": 3656734,
    "date": "2021/9/1",
    "status": "COLLECTED"
  }
]
export const sampleOverpaymentHistoryLine1: domains.OverpaymentHistoryLineDomain = 
{
  "amountReceived": 3656734,
  "date": "2021/9/1",
  "status": "COLLECTED"
}
export const sampleOverpaymentPage1: domains.OverpaymentPageDomain = 
{
  "history": [
    {
      "amountReceived": 3656734,
      "date": "2021/9/1",
      "status": "COLLECTED"
    },
    {
      "amountReceived": 1234,
      "date": "2020/10/1",
      "status": "CANCELLED"
    },
    {
      "amountReceived": 3656734,
      "date": "2021/9/1",
      "status": "COLLECTED"
    }
  ],
  "drawDownDate": "2021/9/1",
  "initialBorrowing": 200020
}
export const sampleCollectionItem2: domains.CollectionItemDomain = 
{
  "paymentId": 123,
  "collectionDate": "2020-10-01",
  "amount": 56657,
  "status": "C"
}
export const sampleCollectionsList2: domains.CollectionsListDomain = 
[
  {
    "paymentId": 123,
    "collectionDate": "2020-10-01",
    "amount": 56657,
    "status": "C"
  },
  {
    "paymentId": 456,
    "collectionDate": "2022-14-01",
    "amount": 32834,
    "status": "P"
  },
  {
    "paymentId": 123,
    "collectionDate": "2020-10-01",
    "amount": 56657,
    "status": "C"
  },
  {
    "paymentId": 456,
    "collectionDate": "2022-14-01",
    "amount": 32834,
    "status": "P"
  }
]
export const sampleCollectionSummary2: domains.CollectionSummaryDomain = 
{
  "lastCollectionDate": "2021/10/6",
  "lastCollectionAmount": 1234,
  "nextCollectionDate": "2022/10/6",
  "nextCollectionAmount": 13434,
  "allowance": 1000,
  "period": "Monthly"
}
export const sampleCreatePayment2: domains.CreatePaymentDomain = 
{
  "amount": 56657,
  "collectionDate": "2020-10-01",
  "reason": "O",
  "allowance": 123,
  "period": "Monthly"
}
export const sampleLinkedAccountDetailsDisplay2: domains.LinkedAccountDetailsDisplayDomain = 
{
  "mandate": {
    "sortCode": "10-11-12",
    "accountId": 3245454,
    "mandateStatus": "ACTIVE",
    "bankName": "Bank Of Happiness",
    "accountName": "F & J Bloggs",
    "mandateRef": "12099845-34"
  },
  "collectionSummary": {
    "lastCollectionDate": "2021/10/6",
    "lastCollectionAmount": 1234,
    "nextCollectionDate": "2022/10/6",
    "nextCollectionAmount": 13434,
    "allowance": 1000,
    "period": "Monthly"
  },
  "collectionHistory": [
    {
      "paymentId": 123,
      "collectionDate": "2020-10-01",
      "amount": 56657,
      "status": "C"
    },
    {
      "paymentId": 456,
      "collectionDate": "2022-14-01",
      "amount": 32834,
      "status": "P"
    },
    {
      "paymentId": 123,
      "collectionDate": "2020-10-01",
      "amount": 56657,
      "status": "C"
    },
    {
      "paymentId": 456,
      "collectionDate": "2022-14-01",
      "amount": 32834,
      "status": "P"
    }
  ]
}
export const sampleMandate2: domains.MandateDomain = 
{
  "sortCode": "10-11-12",
  "accountId": 3245454,
  "mandateStatus": "ACTIVE",
  "bankName": "Bank Of Happiness",
  "accountName": "F & J Bloggs",
  "mandateRef": "12099845-34"
}
export const sampleMandateList2: domains.MandateListDomain = 
[
  {
    "sortCode": "10-11-12",
    "accountId": 3245454,
    "mandateStatus": "ACTIVE",
    "bankName": "Bank Of Happiness",
    "accountName": "F & J Bloggs",
    "mandateRef": "12099845-34"
  },
  {
    "sortCode": "23-54-12",
    "accountId": 3245454,
    "mandateStatus": "ACTIVE",
    "bankName": "Royal Bank of Success",
    "accountName": "F & J Bloggs",
    "mandateRef": "12099845-78"
  },
  {
    "sortCode": "10-11-12",
    "accountId": 12341234,
    "mandateStatus": "ACTIVE",
    "bankName": "Bank Of Happiness",
    "accountName": "F & J Bloggs",
    "mandateRef": "12099845-34"
  },
  {
    "sortCode": "23-54-12",
    "accountId": 23456123,
    "mandateStatus": "ACTIVE",
    "bankName": "Royal Bank of Success",
    "accountName": "F & J Bloggs",
    "mandateRef": "12099845-78"
  },
  {
    "sortCode": "10-11-12",
    "accountId": 3245454,
    "mandateStatus": "ACTIVE",
    "bankName": "Bank Of Happiness",
    "accountName": "F & J Bloggs",
    "mandateRef": "12099845-34"
  }
]
export const sampleMandateSearch2: domains.MandateSearchDomain = 
{
  "sortCode": "10-11-12",
  "searchResults": [
    {
      "sortCode": "10-11-12",
      "accountId": 3245454,
      "mandateStatus": "ACTIVE",
      "bankName": "Bank Of Happiness",
      "accountName": "F & J Bloggs",
      "mandateRef": "12099845-34"
    },
    {
      "sortCode": "23-54-12",
      "accountId": 3245454,
      "mandateStatus": "ACTIVE",
      "bankName": "Royal Bank of Success",
      "accountName": "F & J Bloggs",
      "mandateRef": "12099845-78"
    },
    {
      "sortCode": "10-11-12",
      "accountId": 12341234,
      "mandateStatus": "ACTIVE",
      "bankName": "Bank Of Happiness",
      "accountName": "F & J Bloggs",
      "mandateRef": "12099845-34"
    },
    {
      "sortCode": "23-54-12",
      "accountId": 23456123,
      "mandateStatus": "ACTIVE",
      "bankName": "Royal Bank of Success",
      "accountName": "F & J Bloggs",
      "mandateRef": "12099845-78"
    },
    {
      "sortCode": "10-11-12",
      "accountId": 3245454,
      "mandateStatus": "ACTIVE",
      "bankName": "Bank Of Happiness",
      "accountName": "F & J Bloggs",
      "mandateRef": "12099845-34"
    }
  ]
}
export const sampleOverpaymentHistory2: domains.OverpaymentHistoryDomain = 
[
  {
    "amountReceived": 1234,
    "date": "2020/10/1",
    "status": "CANCELLED"
  },
  {
    "amountReceived": 3656734,
    "date": "2021/9/1",
    "status": "COLLECTED"
  },
  {
    "amountReceived": 1234,
    "date": "2020/10/1",
    "status": "CANCELLED"
  }
]
export const sampleOverpaymentHistoryLine2: domains.OverpaymentHistoryLineDomain = 
{
  "amountReceived": 1234,
  "date": "2020/10/1",
  "status": "CANCELLED"
}
export const sampleOverpaymentPage2: domains.OverpaymentPageDomain = 
{
  "history": [
    {
      "amountReceived": 1234,
      "date": "2020/10/1",
      "status": "CANCELLED"
    },
    {
      "amountReceived": 3656734,
      "date": "2021/9/1",
      "status": "COLLECTED"
    },
    {
      "amountReceived": 1234,
      "date": "2020/10/1",
      "status": "CANCELLED"
    }
  ],
  "drawDownDate": "2020/10/1",
  "initialBorrowing": 100010
}