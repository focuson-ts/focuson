import { makeSample } from "../codegen/makeSample";
import { CreatePlanDD, EAccountsSummaryDD, EAccountsSummaryTableDD } from "../example/eAccountsSummary.dataD";

describe ( 'makeSample', () => {
  it ( "should make a JSON sample", () => {
    expect ( makeSample ( CreatePlanDD ) ).toEqual ( {
      "createPlanDate": "2020-10-01",
      "createPlanEnd": "2020-10-01",
      "createPlanStart": "2020-10-01"
    } )
    expect ( makeSample ( EAccountsSummaryDD ) ).toEqual ( {
      "createPlan": {
        "createPlanDate": "2020-10-01",
        "createPlanEnd": "2020-10-01",
        "createPlanStart": "2020-10-01"
      },
      "currentAccountBalance": "This is a one line string",
      "eAccountsTable": {
        "accountId": "1233450",
        "description": "This is a one line string",
        "frequency": "This is a one line string",
        "total": "This is a one line string",
        "virtualBankSeq": "This is a one line string"
      },
      "oneAccountBalance": "This is a one line string",
      "totalMonthlyCost": "This is a one line string"
    } )
  } )

} );