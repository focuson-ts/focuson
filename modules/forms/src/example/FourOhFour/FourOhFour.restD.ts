import { ExampleRestD } from "../common";
import { FourOhFourDataD, FourOhFourDataTableD } from "./FourOhFour.dataD";
import { OneTableInsertSqlStrategyForIds, StringParam } from "../../common/restD";
import { fourOhFourTable, onlySchema } from "../database/tableNames";
import { fromCommonIds } from "../commonIds";


let params = { id: { ...StringParam, lens: '~/display/id', testValue: '123' }, ...fromCommonIds ( 'dbName' ) };
export const fourOhFourSingleRD: ExampleRestD = {
  params,
  namePrefix: 'single',
  dataDD: FourOhFourDataD,
  url: '/api/fourOhFourSingle?{query}',
  actions: [ 'get' ],
  tables: {
    entity: {
      type: 'Main',
      table: fourOhFourTable,
      idStrategy: { type: 'WithId', idField: 'id', idOffset: 0 }
    },
    where: [ { table: fourOhFourTable, paramName: 'id', alias: fourOhFourTable.name, field: 'id' } ]
  }
}


export const fourOhFourRepeatingRD: ExampleRestD = {
  params,
  namePrefix: 'list',
  dataDD: FourOhFourDataTableD,
  url: '/api/fourOhFourMultiple?{query}',
  actions: [ 'get' ],
  tables: {
    entity: {
      type: 'Main',
      table: fourOhFourTable,
    },
    where: [ { table: fourOhFourTable, paramName: 'id', alias: fourOhFourTable.name, field: 'id' } ]
  }
}

export const fourOhFourSingleByResolverRD: ExampleRestD = {
  params,
  namePrefix: 'singleByResolver',
  dataDD: FourOhFourDataD,
  url: '/api/fourOhFourSingleByResolver?{query}',
  actions: [ 'get' ],
  resolvers: {
    getsingleByResolverFourOhFour: [
      {
        type: 'sql', sql: `select somex, datax
                           from ${fourOhFourTable.name}
                           where id = ?`,
        noDataIs404: true,
        schema: onlySchema, params: [ 'id',
          { type: 'output', name: 'some', rsName: 'somex', javaType: 'String' },
          { type: 'output', name: 'data', rsName: 'datax', javaType: 'String' },
        ]
      }
    ]
  }

}
