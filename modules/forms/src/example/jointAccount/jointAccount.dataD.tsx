import { MoneyDD, OneLineStringDD } from "../../common/dataD";
import { TableCD } from "../../common/componentsD";
import { ExampleDataD, ExampleRepeatingD } from "../common";
import { accountT, addT, nameT } from "../database/tableNames";

export const JointAccountAddressDD: ExampleDataD = {
  name: "JointAccountAddress",
  description: "Addresses",
  table: addT, //just a default
  structure: {
    line1: { dataDD: OneLineStringDD, db: { table: addT, field: 'zzline1', fieldAlias: 'zzline1FieldAliasItIsVeryLongToLetUsTestIfWeGetACommentInTheGeneratedCode' } }, //db can be a string or a
    line2: { dataDD: OneLineStringDD, db: { table: addT, field: 'zzline2', format: { type: 'Date', pattern: 'dd-MM-yyyy' }}}
  }
}
export const JointAccountAddressesDD: ExampleRepeatingD = { //No db stuff here.
  display: TableCD,
  displayParams: { order: [ 'line1', 'line2' ] },
  paged: false,
  name: "JointAccountAddresses",
  description: "Addresses",
  dataDD: JointAccountAddressDD
}

export const JointAccountCustomerDD: ExampleDataD = { //could have had a default table, and in practice probably would
  name: "JointAccountCustomer",
  description: "The data about a customer",
  structure: {
    name: { dataDD: OneLineStringDD, sample: [ 'Fred Bloggs', 'Jill Blogs' ], db: { table: nameT, field: 'zzname' } }, //Note the use of the table and not the alias. The correct alias will be used in the generated sql/map code
    addresses: {
      dataDD: JointAccountAddressesDD
    }, //Note that the dataDD at the far end is a repeating structure
  }
}


export const JointAccountDd: ExampleDataD = {
  name: "JointAccount",
  description: "A sample project for an account with two customers",
  table: accountT,
  structure: {
    // accountId: { dataDD: AccountIdDD, db: 'acc_id' },
    balance: { dataDD: MoneyDD, db: 'blnc' },
    // dateField: { dataDD: DateDD, db: 'someDateField' },
    main: { dataDD: JointAccountCustomerDD },
    joint: { dataDD: JointAccountCustomerDD, sampleOffset: 1 }
  }
}

//... I think it all works