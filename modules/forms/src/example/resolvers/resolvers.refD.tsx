import { ExampleDataD, ExampleRefD, ExampleRestD } from "../common";
import { StringDD } from "../../common/dataD";
import { fromCommonIds } from "../commonIds";
import { GuardedMultipleMutation, OutputForManualParam } from "../../common/resolverD";

const resolverDD: ExampleDataD = {
  description: "",
  name: 'Resolver',
  structure: {
    name: { dataDD: StringDD }
  }
}

function nOutputParams<P> ( n: number, fn: ( i: number ) => P ): P[] {
  return Array ( n ).fill ( 0 ).map ( ( _, i ) => fn ( i ) )
}
const paramName = ( seed: string, i: number ) => `${seed}_${i}`;

const manualOutputParams = ( seed: string ) => ( i: number ): OutputForManualParam => {
  return ({ type: 'output', name: paramName ( seed, i ), javaType: 'String' });
};
function manualCode ( seed: string, n: number ): string[] {
  return Array ( n ).fill ( 0 ).map ( ( _, i ) => `String ${paramName ( seed, i )} = "${i}";` )
}
export const resolverRestD: ExampleRestD = {
  dataDD: resolverDD,
  url: '/api/resolver',
  params: fromCommonIds ( 'brandRef', 'clientRef' ),
  actions: [ 'get' ],
  resolvers: {
    getResolver: {
      type: 'case',

      name: 'case',
      params: [ 'brandRef', 'clientRef' ],
      select: [
        {
          guard: [ 'brandRef==3' ], type: "manual", name: 'manual3',
          code: manualCode ( 'output', 5 ),
          params: [ 'brandRef', 'clientRef', ...nOutputParams ( 5, manualOutputParams ( 'output' ) ) ]
        },
        {
          guard: [ 'brandRef==4' ], type: "manual", name: 'manual4', throwsException: true,
          code: `throw new RuntimeException();`,
          params: [ 'brandRef', 'clientRef', ...nOutputParams ( 5, manualOutputParams ( 'output' ) ) ]
        },
        {
          guard: [ 'brandRef==5' ], type: "multiple",
          mutations: [
            { type: "message", message: 'some message' },
            {
              type: "manual", name: 'manual51', throwsException: true,
              code: `throw new RuntimeException();`,
              params: [ 'brandRef', 'clientRef', ...nOutputParams ( 5, manualOutputParams ( 'output' ) ) ]
            }
          ],
          // params: [ 'brandRef', 'clientRef', ...nOutputParams ( 5, manualOutputParams ( 'output' ) ) ]
        },
        {
          guard: [], type: "multiple",
          mutations: [
            { type: "message", message: 'some message' },
            {
              type: "manual", name: 'manual10',
              code: manualCode ( 'output', 10 ),
              params: [ 'brandRef', 'clientRef', ...nOutputParams ( 10, manualOutputParams ( 'output' ) ) ]
            },
          ]
        },
      ]
    }
  }
}

export const resolversRefD: ExampleRefD = {
  description: 'Just for tests',
  domain: { data: { dataDD: resolverDD } },
  name: "Resolvers",
  rest: { resolvers: { rest: resolverRestD, targetFromPath: '~/data' } }

}