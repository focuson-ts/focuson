import * as domains from '../ListOfPaymentsPage/ListOfPaymentsPage.domains'

export const sampleListOfPayments0: domains.ListOfPaymentsDomain = 
{
  "standingOrders": {
    "shouldPrint": true,
    "numberOfItems": 1
  },
  "openBankingStandingOrders": {
    "shouldPrint": false,
    "numberOfItems": 2
  },
  "directDebits": {
    "shouldPrint": true,
    "numberOfItems": 3
  },
  "billPayments": {
    "shouldPrint": false,
    "numberOfItems": 4
  },
  "openBanking": {
    "shouldPrint": true,
    "numberOfItems": 5
  }
}
export const samplePrintRecordHistory0: domains.PrintRecordHistoryDomain = 
[
  {
    "requestedBy": "m",
    "requesterDetails": {
      "title": "Mr",
      "forename": "Fred",
      "surname": "Bloggs",
      "addressLine1": "4 Privat Drive",
      "addressLine2": "Little Winging",
      "addressLine3": "Surrey",
      "addressLine4": "UK",
      "postcode": "HG1 1FL",
      "phone": "555 1234",
      "fax": "5556365"
    },
    "listOfPayments": {
      "standingOrders": {
        "shouldPrint": true,
        "numberOfItems": 1
      },
      "openBankingStandingOrders": {
        "shouldPrint": false,
        "numberOfItems": 2
      },
      "directDebits": {
        "shouldPrint": true,
        "numberOfItems": 3
      },
      "billPayments": {
        "shouldPrint": false,
        "numberOfItems": 4
      },
      "openBanking": {
        "shouldPrint": true,
        "numberOfItems": 5
      }
    },
    "includeSingleAndInitialDirectDebits": true,
    "authorisedByCustomer": "n",
    "alreadyPrinted": true
  },
  {
    "requestedBy": "j",
    "requesterDetails": {
      "title": "Mrs",
      "forename": "Fredrica",
      "surname": "Smith",
      "addressLine1": " 11 Green Acres",
      "addressLine2": "Nether Wallop",
      "addressLine3": "Aylesbury",
      "addressLine4": "UK",
      "postcode": "SO34 1DF",
      "phone": "555 2344",
      "fax": "555 1231"
    },
    "listOfPayments": {
      "standingOrders": {
        "shouldPrint": false,
        "numberOfItems": 2
      },
      "openBankingStandingOrders": {
        "shouldPrint": true,
        "numberOfItems": 3
      },
      "directDebits": {
        "shouldPrint": false,
        "numberOfItems": 4
      },
      "billPayments": {
        "shouldPrint": true,
        "numberOfItems": 5
      },
      "openBanking": {
        "shouldPrint": false,
        "numberOfItems": 6
      }
    },
    "includeSingleAndInitialDirectDebits": false,
    "authorisedByCustomer": "notyet",
    "alreadyPrinted": false
  },
  {
    "requestedBy": "new bank",
    "requesterDetails": {
      "title": "Mr",
      "forename": "Fred",
      "surname": "Bloggs",
      "addressLine1": "4 Privat Drive",
      "addressLine2": "Little Winging",
      "addressLine3": "Surrey",
      "addressLine4": "UK",
      "postcode": "HG1 1FL",
      "phone": "555 1234",
      "fax": "5556365"
    },
    "listOfPayments": {
      "standingOrders": {
        "shouldPrint": true,
        "numberOfItems": 3
      },
      "openBankingStandingOrders": {
        "shouldPrint": false,
        "numberOfItems": 4
      },
      "directDebits": {
        "shouldPrint": true,
        "numberOfItems": 5
      },
      "billPayments": {
        "shouldPrint": false,
        "numberOfItems": 6
      },
      "openBanking": {
        "shouldPrint": true,
        "numberOfItems": 1
      }
    },
    "includeSingleAndInitialDirectDebits": true,
    "authorisedByCustomer": "y",
    "alreadyPrinted": true
  }
]
export const samplePrintRecordItem0: domains.PrintRecordItemDomain = 
{
  "requestedBy": "m",
  "requesterDetails": {
    "title": "Mr",
    "forename": "Fred",
    "surname": "Bloggs",
    "addressLine1": "4 Privat Drive",
    "addressLine2": "Little Winging",
    "addressLine3": "Surrey",
    "addressLine4": "UK",
    "postcode": "HG1 1FL",
    "phone": "555 1234",
    "fax": "5556365"
  },
  "listOfPayments": {
    "standingOrders": {
      "shouldPrint": true,
      "numberOfItems": 1
    },
    "openBankingStandingOrders": {
      "shouldPrint": false,
      "numberOfItems": 2
    },
    "directDebits": {
      "shouldPrint": true,
      "numberOfItems": 3
    },
    "billPayments": {
      "shouldPrint": false,
      "numberOfItems": 4
    },
    "openBanking": {
      "shouldPrint": true,
      "numberOfItems": 5
    }
  },
  "includeSingleAndInitialDirectDebits": true,
  "authorisedByCustomer": "n",
  "alreadyPrinted": true
}
export const sampleRequesterDetails0: domains.RequesterDetailsDomain = 
{
  "title": "Mr",
  "forename": "Fred",
  "surname": "Bloggs",
  "addressLine1": "4 Privat Drive",
  "addressLine2": "Little Winging",
  "addressLine3": "Surrey",
  "addressLine4": "UK",
  "postcode": "HG1 1FL",
  "phone": "555 1234",
  "fax": "5556365"
}
export const sampleSinglePrint0: domains.SinglePrintDomain = 
{
  "shouldPrint": true,
  "numberOfItems": 1
}
export const sampleListOfPayments1: domains.ListOfPaymentsDomain = 
{
  "standingOrders": {
    "shouldPrint": false,
    "numberOfItems": 2
  },
  "openBankingStandingOrders": {
    "shouldPrint": true,
    "numberOfItems": 3
  },
  "directDebits": {
    "shouldPrint": false,
    "numberOfItems": 4
  },
  "billPayments": {
    "shouldPrint": true,
    "numberOfItems": 5
  },
  "openBanking": {
    "shouldPrint": false,
    "numberOfItems": 6
  }
}
export const samplePrintRecordHistory1: domains.PrintRecordHistoryDomain = 
[
  {
    "requestedBy": "j",
    "requesterDetails": {
      "title": "Mrs",
      "forename": "Fredrica",
      "surname": "Smith",
      "addressLine1": " 11 Green Acres",
      "addressLine2": "Nether Wallop",
      "addressLine3": "Aylesbury",
      "addressLine4": "UK",
      "postcode": "SO34 1DF",
      "phone": "555 2344",
      "fax": "555 1231"
    },
    "listOfPayments": {
      "standingOrders": {
        "shouldPrint": false,
        "numberOfItems": 2
      },
      "openBankingStandingOrders": {
        "shouldPrint": true,
        "numberOfItems": 3
      },
      "directDebits": {
        "shouldPrint": false,
        "numberOfItems": 4
      },
      "billPayments": {
        "shouldPrint": true,
        "numberOfItems": 5
      },
      "openBanking": {
        "shouldPrint": false,
        "numberOfItems": 6
      }
    },
    "includeSingleAndInitialDirectDebits": false,
    "authorisedByCustomer": "notyet",
    "alreadyPrinted": false
  },
  {
    "requestedBy": "j",
    "requesterDetails": {
      "title": "Mr",
      "forename": "Fred",
      "surname": "Bloggs",
      "addressLine1": "4 Privat Drive",
      "addressLine2": "Little Winging",
      "addressLine3": "Surrey",
      "addressLine4": "UK",
      "postcode": "HG1 1FL",
      "phone": "555 1234",
      "fax": "5556365"
    },
    "listOfPayments": {
      "standingOrders": {
        "shouldPrint": true,
        "numberOfItems": 5
      },
      "openBankingStandingOrders": {
        "shouldPrint": false,
        "numberOfItems": 6
      },
      "directDebits": {
        "shouldPrint": true,
        "numberOfItems": 1
      },
      "billPayments": {
        "shouldPrint": false,
        "numberOfItems": 2
      },
      "openBanking": {
        "shouldPrint": true,
        "numberOfItems": 3
      }
    },
    "includeSingleAndInitialDirectDebits": true,
    "authorisedByCustomer": "notyet",
    "alreadyPrinted": true
  },
  {
    "requestedBy": "new bank",
    "requesterDetails": {
      "title": "Mrs",
      "forename": "Fredrica",
      "surname": "Smith",
      "addressLine1": " 11 Green Acres",
      "addressLine2": "Nether Wallop",
      "addressLine3": "Aylesbury",
      "addressLine4": "UK",
      "postcode": "SO34 1DF",
      "phone": "555 2344",
      "fax": "555 1231"
    },
    "listOfPayments": {
      "standingOrders": {
        "shouldPrint": false,
        "numberOfItems": 6
      },
      "openBankingStandingOrders": {
        "shouldPrint": true,
        "numberOfItems": 1
      },
      "directDebits": {
        "shouldPrint": false,
        "numberOfItems": 2
      },
      "billPayments": {
        "shouldPrint": true,
        "numberOfItems": 3
      },
      "openBanking": {
        "shouldPrint": false,
        "numberOfItems": 4
      }
    },
    "includeSingleAndInitialDirectDebits": false,
    "authorisedByCustomer": "y",
    "alreadyPrinted": false
  }
]
export const samplePrintRecordItem1: domains.PrintRecordItemDomain = 
{
  "requestedBy": "j",
  "requesterDetails": {
    "title": "Mrs",
    "forename": "Fredrica",
    "surname": "Smith",
    "addressLine1": " 11 Green Acres",
    "addressLine2": "Nether Wallop",
    "addressLine3": "Aylesbury",
    "addressLine4": "UK",
    "postcode": "SO34 1DF",
    "phone": "555 2344",
    "fax": "555 1231"
  },
  "listOfPayments": {
    "standingOrders": {
      "shouldPrint": false,
      "numberOfItems": 2
    },
    "openBankingStandingOrders": {
      "shouldPrint": true,
      "numberOfItems": 3
    },
    "directDebits": {
      "shouldPrint": false,
      "numberOfItems": 4
    },
    "billPayments": {
      "shouldPrint": true,
      "numberOfItems": 5
    },
    "openBanking": {
      "shouldPrint": false,
      "numberOfItems": 6
    }
  },
  "includeSingleAndInitialDirectDebits": false,
  "authorisedByCustomer": "notyet",
  "alreadyPrinted": false
}
export const sampleRequesterDetails1: domains.RequesterDetailsDomain = 
{
  "title": "Mrs",
  "forename": "Fredrica",
  "surname": "Smith",
  "addressLine1": " 11 Green Acres",
  "addressLine2": "Nether Wallop",
  "addressLine3": "Aylesbury",
  "addressLine4": "UK",
  "postcode": "SO34 1DF",
  "phone": "555 2344",
  "fax": "555 1231"
}
export const sampleSinglePrint1: domains.SinglePrintDomain = 
{
  "shouldPrint": false,
  "numberOfItems": 2
}
export const sampleListOfPayments2: domains.ListOfPaymentsDomain = 
{
  "standingOrders": {
    "shouldPrint": true,
    "numberOfItems": 3
  },
  "openBankingStandingOrders": {
    "shouldPrint": false,
    "numberOfItems": 4
  },
  "directDebits": {
    "shouldPrint": true,
    "numberOfItems": 5
  },
  "billPayments": {
    "shouldPrint": false,
    "numberOfItems": 6
  },
  "openBanking": {
    "shouldPrint": true,
    "numberOfItems": 1
  }
}
export const samplePrintRecordHistory2: domains.PrintRecordHistoryDomain = 
[
  {
    "requestedBy": "new bank",
    "requesterDetails": {
      "title": "Mr",
      "forename": "Fred",
      "surname": "Bloggs",
      "addressLine1": "4 Privat Drive",
      "addressLine2": "Little Winging",
      "addressLine3": "Surrey",
      "addressLine4": "UK",
      "postcode": "HG1 1FL",
      "phone": "555 1234",
      "fax": "5556365"
    },
    "listOfPayments": {
      "standingOrders": {
        "shouldPrint": true,
        "numberOfItems": 3
      },
      "openBankingStandingOrders": {
        "shouldPrint": false,
        "numberOfItems": 4
      },
      "directDebits": {
        "shouldPrint": true,
        "numberOfItems": 5
      },
      "billPayments": {
        "shouldPrint": false,
        "numberOfItems": 6
      },
      "openBanking": {
        "shouldPrint": true,
        "numberOfItems": 1
      }
    },
    "includeSingleAndInitialDirectDebits": true,
    "authorisedByCustomer": "y",
    "alreadyPrinted": true
  },
  {
    "requestedBy": "j",
    "requesterDetails": {
      "title": "Mrs",
      "forename": "Fredrica",
      "surname": "Smith",
      "addressLine1": " 11 Green Acres",
      "addressLine2": "Nether Wallop",
      "addressLine3": "Aylesbury",
      "addressLine4": "UK",
      "postcode": "SO34 1DF",
      "phone": "555 2344",
      "fax": "555 1231"
    },
    "listOfPayments": {
      "standingOrders": {
        "shouldPrint": false,
        "numberOfItems": 2
      },
      "openBankingStandingOrders": {
        "shouldPrint": true,
        "numberOfItems": 3
      },
      "directDebits": {
        "shouldPrint": false,
        "numberOfItems": 4
      },
      "billPayments": {
        "shouldPrint": true,
        "numberOfItems": 5
      },
      "openBanking": {
        "shouldPrint": false,
        "numberOfItems": 6
      }
    },
    "includeSingleAndInitialDirectDebits": false,
    "authorisedByCustomer": "notyet",
    "alreadyPrinted": false
  },
  {
    "requestedBy": "new bank",
    "requesterDetails": {
      "title": "Mr",
      "forename": "Fred",
      "surname": "Bloggs",
      "addressLine1": "4 Privat Drive",
      "addressLine2": "Little Winging",
      "addressLine3": "Surrey",
      "addressLine4": "UK",
      "postcode": "HG1 1FL",
      "phone": "555 1234",
      "fax": "5556365"
    },
    "listOfPayments": {
      "standingOrders": {
        "shouldPrint": true,
        "numberOfItems": 3
      },
      "openBankingStandingOrders": {
        "shouldPrint": false,
        "numberOfItems": 4
      },
      "directDebits": {
        "shouldPrint": true,
        "numberOfItems": 5
      },
      "billPayments": {
        "shouldPrint": false,
        "numberOfItems": 6
      },
      "openBanking": {
        "shouldPrint": true,
        "numberOfItems": 1
      }
    },
    "includeSingleAndInitialDirectDebits": true,
    "authorisedByCustomer": "y",
    "alreadyPrinted": true
  }
]
export const samplePrintRecordItem2: domains.PrintRecordItemDomain = 
{
  "requestedBy": "new bank",
  "requesterDetails": {
    "title": "Mr",
    "forename": "Fred",
    "surname": "Bloggs",
    "addressLine1": "4 Privat Drive",
    "addressLine2": "Little Winging",
    "addressLine3": "Surrey",
    "addressLine4": "UK",
    "postcode": "HG1 1FL",
    "phone": "555 1234",
    "fax": "5556365"
  },
  "listOfPayments": {
    "standingOrders": {
      "shouldPrint": true,
      "numberOfItems": 3
    },
    "openBankingStandingOrders": {
      "shouldPrint": false,
      "numberOfItems": 4
    },
    "directDebits": {
      "shouldPrint": true,
      "numberOfItems": 5
    },
    "billPayments": {
      "shouldPrint": false,
      "numberOfItems": 6
    },
    "openBanking": {
      "shouldPrint": true,
      "numberOfItems": 1
    }
  },
  "includeSingleAndInitialDirectDebits": true,
  "authorisedByCustomer": "y",
  "alreadyPrinted": true
}
export const sampleRequesterDetails2: domains.RequesterDetailsDomain = 
{
  "title": "Mr",
  "forename": "Fred",
  "surname": "Bloggs",
  "addressLine1": "4 Privat Drive",
  "addressLine2": "Little Winging",
  "addressLine3": "Surrey",
  "addressLine4": "UK",
  "postcode": "HG1 1FL",
  "phone": "555 1234",
  "fax": "5556365"
}
export const sampleSinglePrint2: domains.SinglePrintDomain = 
{
  "shouldPrint": true,
  "numberOfItems": 3
}