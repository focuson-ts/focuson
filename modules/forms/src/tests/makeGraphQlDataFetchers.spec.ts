import { occupationAndIncomeFullDomainDD } from "../example/occupationAndIncome/occupationAndIncome.dataD";
import { findParentChildCompDataLinks } from "../common/resolverD";
import { JointAccountDd } from "../example/jointAccount/jointAccount.dataD";


describe ( "findParentChildLinks", () => {
  it ( "it find parent child links  of the comp data", () => {
    expect ( findParentChildCompDataLinks ( JointAccountDd )
      .map ( ( { parent, oneDataD, child } ) => [ parent.name, oneDataD?.dataDD?.name, child.name ] ) ).toEqual ( [
      [ "JointAccount", "JointAccountCustomer", "JointAccountCustomer" ],
      [ "JointAccountCustomer", "JointAccountAddress", "JointAccountAddress" ],
      [ "JointAccountAddress", null, "JointAccountAddress" ],
      [ "JointAccount", "JointAccountCustomer", "JointAccountCustomer" ],
      [ "JointAccountCustomer", "JointAccountAddress", "JointAccountAddress" ],
      [ "JointAccountAddress", null, "JointAccountAddress" ]
    ] )
  } )
} )


// describe ( "makeGraphQlResultMaps", () => {
//     it ( "should generate the java code for the maps structure ", () => {
//       expect ( makeGraphQlResultMaps ( 'someName', findParentChildCompDataLinks ( occupationAndIncomeFullDomainDD, { includePrimitives: false, stopAtResolvers: false } ) ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
//         "public static class someName {",
//         "  public final Map OccupationAndIncomeFullDomain = new HashMap();",
//         "  public final Map CustomerOccupationIncomeDetails = new HashMap();",
//         "  public final Map OneOccupationIncomeDetails = new HashMap();",
//         "  OccupationAndIncomeFullDomain.put('CustomerOccupationIncomeDetails', CustomerOccupationIncomeDetails);",
//         "  CustomerOccupationIncomeDetails.put('OneOccupationIncomeDetails', OneOccupationIncomeDetails);",
//         "}"
//       ] )
//     } )
//   }
// )
