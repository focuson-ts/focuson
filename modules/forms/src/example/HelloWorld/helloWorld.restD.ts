import { helloWorldDD } from "./helloWorld.dataD";
import { ExampleRestD } from "../common";
import { onlySchema } from "../database/tableNames";

export const helloWorldRD: ExampleRestD = {
  params: {},
  dataDD: helloWorldDD,
  url: '/helloWorld?{query}',
  actions: [ 'get', 'update' ],
  resolvers: {
    getHelloWorldDomainData: {
      type: 'sql', name: 'mycoolstoredproc', sql: 'select * from ' + 'HelloWorld', params: [
        { type: "output", javaType: 'String', name: 'message1', rsName: 'MSG1' },
        { type: "output", javaType: 'String', name: 'message2', rsName: 'MSG2' },
      ], schema: onlySchema
    },

    // type: 'sql',
    //   list?: boolean,
    //   schema: Schema;
    //   /**The name of the procedure that does this: should capture the intent of what this does */
    //   name: string;
    //   sql: string;
    //   params: MutationParamForSql | MutationParamForSql[]
    // }
  },
  mutations: [
    {restAction: 'get', mutateBy: [

      ]}
  ]
}