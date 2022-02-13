import { AccountIdDD, isDataDd, isRepeatingDd } from "./dataD";
import { EAccountsSummaryDD, EAccountsSummaryTableDD, EAccountSummaryDD } from "./example.dataD";

describe("dataDD", () =>{
  it ("should have a isDataDd ", () =>{
    expect(isDataDd(EAccountsSummaryDD)).toEqual(true)
    expect(isDataDd(EAccountSummaryDD)).toEqual(true)
    expect(isDataDd(EAccountsSummaryTableDD)).toEqual(false)
    expect(isDataDd(AccountIdDD)).toEqual(false)
  })
  it ("should have a isRepeatingDd ", () =>{
    expect(isRepeatingDd(EAccountsSummaryDD)).toEqual(false)
    expect(isRepeatingDd(EAccountSummaryDD)).toEqual(false)
    expect(isRepeatingDd(EAccountsSummaryTableDD)).toEqual(true)
    expect(isRepeatingDd(AccountIdDD)).toEqual(false)
  })

})