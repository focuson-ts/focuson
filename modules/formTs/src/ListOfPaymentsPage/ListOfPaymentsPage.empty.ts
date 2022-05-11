import * as domains from '../ListOfPaymentsPage/ListOfPaymentsPage.domains'

export const emptyListOfPayments:domains.ListOfPaymentsDomain =
  {
    "standingOrders": {
      "shouldPrint": false,
      "numberOfItems": 0
    },
    "openBankingStandingOrders": {
      "shouldPrint": false,
      "numberOfItems": 0
    },
    "directDebits": {
      "shouldPrint": false,
      "numberOfItems": 0
    },
    "billPayments": {
      "shouldPrint": false,
      "numberOfItems": 0
    },
    "openBanking": {
      "shouldPrint": false,
      "numberOfItems": 0
    }
  }
export const emptyPrintRecordHistory:domains.PrintRecordHistoryDomain =
  [
    {
      "requestedBy": "",
      "requesterDetails": {
        "title": "",
        "forename": "",
        "surname": "",
        "addressLine1": "",
        "addressLine2": "",
        "addressLine3": "",
        "addressLine4": "",
        "postcode": "",
        "phone": "",
        "fax": ""
      },
      "listOfPayments": {
        "standingOrders": {
          "shouldPrint": false,
          "numberOfItems": 0
        },
        "openBankingStandingOrders": {
          "shouldPrint": false,
          "numberOfItems": 0
        },
        "directDebits": {
          "shouldPrint": false,
          "numberOfItems": 0
        },
        "billPayments": {
          "shouldPrint": false,
          "numberOfItems": 0
        },
        "openBanking": {
          "shouldPrint": false,
          "numberOfItems": 0
        }
      },
      "includeSingleAndInitialDirectDebits": false,
      "authorisedByCustomer": "",
      "alreadyPrinted": false
    }
  ]
export const emptyPrintRecordItem:domains.PrintRecordItemDomain =
  {
    "requestedBy": "",
    "requesterDetails": {
      "title": "",
      "forename": "",
      "surname": "",
      "addressLine1": "",
      "addressLine2": "",
      "addressLine3": "",
      "addressLine4": "",
      "postcode": "",
      "phone": "",
      "fax": ""
    },
    "listOfPayments": {
      "standingOrders": {
        "shouldPrint": false,
        "numberOfItems": 0
      },
      "openBankingStandingOrders": {
        "shouldPrint": false,
        "numberOfItems": 0
      },
      "directDebits": {
        "shouldPrint": false,
        "numberOfItems": 0
      },
      "billPayments": {
        "shouldPrint": false,
        "numberOfItems": 0
      },
      "openBanking": {
        "shouldPrint": false,
        "numberOfItems": 0
      }
    },
    "includeSingleAndInitialDirectDebits": false,
    "authorisedByCustomer": "",
    "alreadyPrinted": false
  }
export const emptyRequesterDetails:domains.RequesterDetailsDomain =
  {
    "title": "",
    "forename": "",
    "surname": "",
    "addressLine1": "",
    "addressLine2": "",
    "addressLine3": "",
    "addressLine4": "",
    "postcode": "",
    "phone": "",
    "fax": ""
  }
export const emptySinglePrint:domains.SinglePrintDomain =
  {
    "shouldPrint": false,
    "numberOfItems": 0
  }