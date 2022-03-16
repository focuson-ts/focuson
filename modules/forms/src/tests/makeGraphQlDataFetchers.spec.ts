import { findParentChildCompDataLinks, makeGraphQlResultMaps } from "../codegen/makeGraphQlDataFetchers";
import { occupationAndIncomeFullDomainDD } from "../example/occupationAndIncome/occupationAndIncome.dataD";


describe ( "findParentChildLinks", () => {
  it ( "it find parent child links  of the comp datas", () => {
    expect ( findParentChildCompDataLinks ( occupationAndIncomeFullDomainDD )
      .map ( ( [ p, c ] ) => [ p.name, c.name ] ) ).toEqual ( [
      [ "OccupationAndIncomeFullDomain", "CustomerOccupationIncomeDetails" ],
      [ "CustomerOccupationIncomeDetails", "OneOccupationIncomeDetails" ]
    ] )
  } )

} )

describe ( "makeGraphQlResultMaps", () => {
    it ( "should generate the java code for the maps structure ", () => {
      expect ( makeGraphQlResultMaps ( 'someName', findParentChildCompDataLinks ( occupationAndIncomeFullDomainDD ) ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
        "public static class someName {",
        "  public final Map OccupationAndIncomeFullDomain = new HashMap();",
        "  public final Map CustomerOccupationIncomeDetails = new HashMap();",
        "  public final Map OneOccupationIncomeDetails = new HashMap();",
        "  OccupationAndIncomeFullDomain.put('CustomerOccupationIncomeDetails', CustomerOccupationIncomeDetails);",
        "  CustomerOccupationIncomeDetails.put('OneOccupationIncomeDetails', OneOccupationIncomeDetails);",
        "}"
      ] )
    } )
  }
)
