import { helloWorldDD } from "./helloWorld.dataD";
import { ExampleRestD } from "../common";
import { onlySchema } from "../database/tableNames";
import { StringParam } from "../../common/restD";

export const helloWorldRD: ExampleRestD = {
  params: {},
  dataDD: helloWorldDD,
  url: '/helloWorld?{query}',
  actions: [ 'get', 'update' ],

  resolvers: {
    getHelloWorldDomainData: [
      {
        type: 'sql', name: 'mycoolstoredproc', sql: 'select * from ' + 'HelloWorld where ?,?,?,?', noDataIs404: true,params: [
         { type: "output", javaType: 'String', name: 'message1', rsName: 'MSG1' },
          { type: "output", javaType: 'String', name: 'message2', rsName: 'MSG2' },
        ], schema: onlySchema

      } ]
  },
  mutations: [
    // {
    //   restAction: 'get', mutateBy: [
    //     { type: 'storedProc', name: 'auditTheGetOfThis', schema: onlySchema, params: [ 'accountId' ] }
    //
    //   ]
    // }
  ]
}