import { makeSample } from "../codegen/makeSample";
import { CreatePlanDD, EAccountsSummaryDD, EAccountsSummaryTableDD } from "../example/eAccountsSummary.dataD";

describe ( 'makeSample', () => {
  it ( "should make a JSON sample", () => {
    expect ( makeSample ( CreatePlanDD, 0 ) ).toEqual ( {
      "createPlanDate": "2022-03-01",
      "createPlanEnd": "2022-10-01",
      "createPlanStart": "2022-01-01"
    } )
    expect ( makeSample ( EAccountsSummaryDD, 0 ) ).toEqual ( {
      "createPlan": {
        "createPlanDate": "2022-03-01",
        "createPlanEnd": "2022-10-01",
        "createPlanStart": "2022-01-01"
      },
      "currentAccountBalance": "12321",
      "eAccountsTable": [
        {
          "accountId": "1233450",
          "description": "This account has a description",
          "displayType": "checking",
          "frequency": "23",
          "total": "1000",
          "virtualBankSeq": "seq1"
        }
      ],
      "oneAccountBalance": "9921",
      "totalMonthlyCost": "1000"
    })
  } )

} );