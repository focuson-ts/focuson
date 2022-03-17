import { JointAccountCustomerDD, JointAccountDd } from "./jointAccount.dataD";

const inTheRestDWeHave: any = {
  type: 'sqlMain',
  // dataD: JointAccountDd, not needed because the restD 'knows' the dataD
  tables: { main: 'ACC_TBL', where: 'ACC_TBL.id=<accountId>' } //the <> reference params passed to the query
}

//we can make this external. Easier to mess up. More clear in many ways because it is here and not scattered about
//It is an error if there is a repeating structure not in here
//It is an error if the aliases repeat a name in this data structure
//Order in this list isn't important
const jointAccount: any = [
  { data: JointAccountDd.structure.main, aliases: { main: 'CUST_TBL', mainName: 'NAME_TBL' }, where: 'ACC_TBL.main=CUST_TBL.id and NAME_TBL.id = ACC_TBL.main' },
  { data: JointAccountDd.structure.joint, aliases: { joint: 'CUST_TBL', jointName: 'NAME_TBL', where: 'ACC_TBL.main=CUST_TBL.id and NAME_TBL.id = ACC_TBL.joint' } },
  { data: JointAccountCustomerDD.structure.addresses, aliases: { main: 'ADD_TBL' }, where: 'ADD_TBL.id={CUST_TBL}.id' }
]
//Workflow
//Make the sql test... so that we like the sql
//Check against Oracle Integration test... only when in the right environment... but we can execute it and check the data we get back: this is the contract test
//Check against the pact test....



//Leave the table/database mappings in the data: that's clear and simple. Especially if have default table which will work for many data structures

//So from this we can make
//* Sql is easy.
//* We can make the maps structure
