import { occupationAndIncomeFullDomainDD } from "../example/occupationAndIncome/occupationAndIncome.dataD";
import { DBTableAndMaybeName, DBTableAndName, findParentChildAndAliases, findParentChildCompDataLinks, isDbTableAndName } from "../common/resolverD";
import { JointAccountDd } from "../example/jointAccount/jointAccount.dataD";
import { isSqlResolverD, jointAccountRestD, SqlGetDetails } from "../example/jointAccount/jointAccount.restD";
import { DataD } from "../common/dataD";
import { NameAnd, sortedEntries } from "@focuson/utils";


describe ( "findParentChildLinks", () => {
  it ( "it find parent child links  of the comp data - all", () => {
    expect ( findParentChildCompDataLinks ( {}, JointAccountDd )
      .map ( ( { parent, oneDataD, child } ) => [ parent.name, oneDataD?.dataDD?.name, child.name ] ) ).toEqual ( [
      [ "JointAccount", "JointAccountCustomer", "JointAccountCustomer" ],
      [ "JointAccountCustomer", "JointAccountAddress", "JointAccountAddress" ],
      [ "JointAccountAddress", undefined, "JointAccountAddress" ],
      [ "JointAccount", "JointAccountCustomer", "JointAccountCustomer" ],
      [ "JointAccountCustomer", "JointAccountAddress", "JointAccountAddress" ],
      [ "JointAccountAddress", undefined, "JointAccountAddress" ]
    ] )
  } )
  it ( "it find parent child links  of the comp data - stop at links", () => {
    expect ( findParentChildCompDataLinks ( { stopAtRepeat: true }, JointAccountDd )
      .map ( ( { parent, oneDataD, child } ) => [ parent.name, oneDataD?.dataDD?.name, child.name ] ) ).toEqual ( [
      [ "JointAccount", "JointAccountCustomer", "JointAccountCustomer" ],
      [ "JointAccount", "JointAccountCustomer", "JointAccountCustomer" ]
    ] )
  } )

  function simplifyAliasMap ( a: NameAnd<DBTableAndMaybeName> ) {
    return Object.fromEntries ( sortedEntries ( a ).map ( ( [ name, t ] ) => [ name, isDbTableAndName ( t ) ? t.name + ".'" + t.table.name : t.name ] ) )
  }
  it ( "should find the alias maps", () => {
    // @ts-ignore
    let sqlG = jointAccountRestD.resolver.get;
    expect ( findParentChildAndAliases ( {}, JointAccountDd, sqlG ).links.map ( ( { parent, oneDataD, child, aliasMap } ) =>
      `${parent.name} ${oneDataD?.dataDD.name} ${child.name} ${JSON.stringify ( simplifyAliasMap ( aliasMap ) ).replace ( /"/g, "'" )}` ) ).toEqual ( [] )

  } )
} )

//
// describe ( "findSqlFragmentsAndAliasMap", () => {
//   it ( "should find the clumps of sql that can be grouped together and their alias map ", () => {
//     let resolver = jointAccountRestD.resolver;
//     if ( !isSqlResolverD ( resolver ) ) throw new Error ();
//     expect ( findSqlFragmentsAndAliasMap ( JointAccountDd, resolver.get ) ).toEqual ( [] )
//
//   } )
// } )


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
