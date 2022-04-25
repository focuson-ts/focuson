import { MoneyDD, OneLineStringDD } from "../../common/dataD";
import { TableCD } from "../../common/componentsD";
import { ExampleDataD, ExampleRepeatingD } from "../common";
import {accountT, addT, cityT, nameT, postCodeT} from "../database/tableNames";

export const JointAccountAddressDD: ExampleDataD = {
  name: "JointAccountAddress",
  description: "Addresses",
  table: addT, //just a default
  structure: {
    line1: { dataDD: OneLineStringDD, db: 'zzline1' }, //db can be a string or a
    line2: { dataDD: OneLineStringDD, db: 'zzline2' }, //db can be a string or a
    postCode: { dataDD: OneLineStringDD, db: {table: postCodeT, field: 'postCode'} }, //db can be a string or a
    city: { dataDD: OneLineStringDD, db: {table: cityT, field: 'city'} },
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
    balance: { dataDD: MoneyDD, db: 'blnc' },
    main: { dataDD: JointAccountCustomerDD },
    joint: { dataDD: JointAccountCustomerDD, sampleOffset: 1 }
  }
}

//... I think it all works