import { MoneyDD, OneLineStringDD } from "../../common/dataD";
import { TableCD } from "../../common/componentsD";
import { ExampleDataD, ExampleRepeatingD } from "../common";
import { accountT } from "../database/tableNames";

export const JointAccountAddressDD: ExampleDataD = {
  name: "JointAccountAddress",
  description: "Addresses",
  table: accountT, //just a default
  structure: {
    line1: { dataDD: OneLineStringDD, db: 'zzline1' }, //db can be a string or a
    line2: { dataDD: OneLineStringDD, db: 'zzline2' },
  }
}
export const JointAccountAddressesDD: ExampleRepeatingD = { //No db stuff here.
  display: TableCD,
  displayParams: { order: [ 'line1', 'line2' ] },
  paged: false,
  name: "JointAccountAddress",
  description: "Addresses",
  dataDD: JointAccountAddressDD
}

export const JointAccountCustomerDD: any = { //could have had a default table, and in practice probably would
  name: "JointAccountCustomer",
  description: "The data about a customer",
  structure: {
    name: { dataDD: OneLineStringDD, sample: [ 'Fred Bloggs' ], db: { table: "NAME_TBL", field: 'zzname' } }, //Note the use of the table and not the alias. The correct alias will be used in the generated sql/map code
    addresses: {
      dataDD: JointAccountAddressesDD
    }, //Note that the dataDD at the far end is a repeating structure
  }
}


export const JointAccountDd: any = {
  name: "JointAccount",
  description: "A sample project for an account with two customers",
  table: 'ACC_TBL',
  structure: {
    balance: { dataDD: MoneyDD, db: 'blnc' },
    main: { dataDD: JointAccountCustomerDD },
    joint: { dataDD: JointAccountCustomerDD }
  }
}

//... I think it all works