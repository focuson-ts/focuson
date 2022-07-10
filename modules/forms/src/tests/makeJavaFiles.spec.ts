import { getStrategy, MainEntity, makeInsertSqlForIds, makeInsertSqlForNoIds } from "../codegen/makeSqlFromEntities";
import { JointAccountDd } from "../example/jointAccount/jointAccount.dataD";
import { addressRestD } from "../example/postCodeDemo/addressSearch.restD";
import { jointAccountRestD } from "../example/jointAccount/jointAccount.restD";
import { accountT, addT } from "../example/database/tableNames";
import { safeArray } from "@focuson/utils";
import { jointAccountSql } from "../example/jointAccount/jointAccount.sql";

const jointAccountRestDTables = jointAccountRestD.tables
if ( jointAccountRestDTables === undefined ) throw Error ( "jointAccountRestDTables must be defined" )
const addressRestDTables = addressRestD.tables
if ( addressRestDTables === undefined ) throw Error ( "addressRestDTables must be defined" )

describe ( "Make INSERT SQL", () => {
  it ( "should make SQL for manual queries", () => {
    const entity: MainEntity = {
      type: 'Main',
      table: accountT,
      staticWhere: `${accountT.name} <> 'canceled'`,
      idStrategy: {type: 'Manual', sql: jointAccountSql},
      children: { }
    };
    expect(
    getStrategy(entity).flatMap( s => {
      if (s.type === 'WithId') return safeArray(makeInsertSqlForIds(JointAccountDd, entity, s))
      else if (s.type === 'WithoutId') return safeArray(makeInsertSqlForNoIds(JointAccountDd, entity, s))
      else if (s.type === 'Manual') return s.sql
      else return []
    })).toEqual([
      "INSERT INTO CUST_TBL (nameId, id)\n     values (101, 1001),\n            (102, 1002),\n            (103, 1003),\n            (104, 2001),\n            (105, 2002),\n            (106, 2003);",
      "INSERT INTO NAME_TBL(id, zzname)\n   values (101, 'name One'),\n          (102, 'name Two'),\n          (103, 'name Three'),\n          (104, 'name Four'),\n          (105, 'name Five'),\n          (106, 'name Six');",
      "INSERT INTO ACC_TBL (mainCustomerId, jointCustomerId, acc_id, brand_id, blnc)\n   values (1001, 2001, 1, 111, 1000),\n          (1002, 2002, 2, 222, 2000),\n          (1003, 2003, 3, 333, 3000);",
      "INSERT INTO ADD_TBL(customerId, zzline1, zzline2, zzline3, zzline4)\n   values (1001, 'oneLineOne', 'oneLineTwo', 'oneLineThree', 'oneLineFour'),\n          (1002, 'twoLineOne', 'twoLineTwo', 'twoLineThree', 'twoLineFour'),\n          (1003, 'threeLineOne', 'threeLineTwo', 'threeLineThree', 'threeLineFour'),\n          (2001, 'fourLineOne', 'fourLineTwo', 'fourLineThree', 'fourLineFour'),\n          (2002, 'fiveLineOne', 'fiveLineTwo', 'fiveLineThree', 'fiveLineFour'),\n          (2002, 'sixLineOne', 'sixLineTwo', 'sixLineThree', 'sixLineFour');"
    ]);
  } );

  it ( "should make SQL for with IDs", () => {
    const entity: MainEntity = { type: 'Main', table: addT, children: {}, idStrategy: {type: "WithId", idField: "someId", idOffset: 100} };
    expect(
    getStrategy(entity).flatMap( s => {
      if (s.type === 'WithId') return safeArray(makeInsertSqlForIds(JointAccountDd, entity, s))
      else if (s.type === 'WithoutId') return safeArray(makeInsertSqlForNoIds(JointAccountDd, entity, s))
      else if (s.type === 'Manual') return s.sql
      else return []
    })).toEqual([
      "INSERT INTO ADD_TBL(someId,zzline1,zzline2,zzline1,zzline2)values (100,'This is a one line string','This is a one line string','This is a one line string','This is a one line string');",
      "INSERT INTO ADD_TBL(someId,zzline1,zzline2,zzline1,zzline2)values (101,'another one line string','another one line string','another one line string','another one line string');",
      "INSERT INTO ADD_TBL(someId,zzline1,zzline2,zzline1,zzline2)values (102,'This is a one line string','This is a one line string','This is a one line string','This is a one line string');"
    ]);
  } )

  it ( "should make SQL for without IDs", () => {
    const entity: MainEntity = { type: 'Main', table: addT, children: {}, idStrategy: {type: "WithoutId"} };
    expect(
        getStrategy(entity).flatMap( s => {
          if (s.type === 'WithId') return safeArray(makeInsertSqlForIds(JointAccountDd, entity, s))
          else if (s.type === 'WithoutId') return safeArray(makeInsertSqlForNoIds(JointAccountDd, entity, s))
          else if (s.type === 'Manual') return s.sql
          else return []
        })).toEqual([
      "INSERT INTO ADD_TBL(zzline1,zzline2,zzline1,zzline2)values ('This is a one line string','This is a one line string','This is a one line string','This is a one line string');",
      "INSERT INTO ADD_TBL(zzline1,zzline2,zzline1,zzline2)values ('another one line string','another one line string','another one line string','another one line string');",
      "INSERT INTO ADD_TBL(zzline1,zzline2,zzline1,zzline2)values ('This is a one line string','This is a one line string','This is a one line string','This is a one line string');"
    ]);
  } )
} )
