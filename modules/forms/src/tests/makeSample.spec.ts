import { makeEmptyData, makeJavaVariable, makeSampleVariable, makeTsSample } from "../codegen/makeSample";
import { CreatePlanDD, EAccountsSummaryDD } from "../example/eAccounts/eAccountsSummary.dataD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { RepeatingPageD } from "../example/repeating/repeating.pageD";
import { RepeatingWholeDataD } from "../example/repeating/repeating.dataD";
import { JointAccountDd } from "../example/jointAccount/jointAccount.dataD";

describe ( "makeEmptyTs", () => {
  it ( "should make an empty data structure", () => {
    expect ( makeEmptyData ( EAccountsSummaryDD ) ).toEqual ( {
      "createPlan": {
        "createPlanDate": "2022-1-1",
        "createPlanEnd": "2022-1-1",
        "createPlanStart": "2022-1-1"
      },
      "currentAccountBalance": 0,
      "eAccountsTable": [
        {
          "accountId": 0,
          "description": "",
          "displayType": "savings",
          "frequency": "",
          "total": 0,
          "virtualBankSeq": ""
        }
      ],
      "oneAccountBalance": 0,
      "totalMonthlyCost": 0,
      "useEStatements": false
    } )
  } )
} )
describe ( 'makeSample', () => {
  it ( "should make a JSON sample", () => {
    expect ( makeTsSample ( CreatePlanDD, 0 ) ).toEqual ( {
      "createPlanDate": "2022-03-01",
      "createPlanEnd": "2022-10-01",
      "createPlanStart": "2022-01-01"
    } )
    expect ( makeTsSample ( EAccountsSummaryDD, 0 ) ).toEqual ( {
      "createPlan": {
        "createPlanDate": "2022-03-01",
        "createPlanEnd": "2022-10-01",
        "createPlanStart": "2022-01-01"
      },
      "currentAccountBalance": 12321,
      "eAccountsTable": [
        {
          "accountId": 1233450,
          "description": "This account's description",
          "displayType": "checking",
          "frequency": "23",
          "total": 1000,
          "virtualBankSeq": "seq1"
        },
        {
          "accountId": 3233450,
          "description": "This account's description",
          "displayType": "savings",
          "frequency": "23",
          "total": 2991,
          "virtualBankSeq": "seq2"
        },
        {
          "accountId": 4333450,
          "description": "This account's description",
          "displayType": "checking",
          "frequency": "23",
          "total": 1000,
          "virtualBankSeq": "seq3"
        }
      ],
      "oneAccountBalance": 9921,
      "totalMonthlyCost": 1000,
      "useEStatements": true
    })
  } )

} );

describe ( "makeJavaVariable", () => {
  it ( "should create code that parses the sample from the ts sample", () => {
    expect ( makeJavaVariable ( EAccountsSummaryDD, 0 ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "public static Map sampleEAccountsSummary0 =  parse.parseMap(",
      "       '{'+",
      "       '  \\'useEStatements\\': true,'+",
      "       '  \\'eAccountsTable\\': ['+",
      "       '    {'+",
      "       '      \\'accountId\\': 1233450,'+",
      "       '      \\'displayType\\': \\'checking\\','+",
      "       '      \\'description\\': \\'This account's description\\','+",
      "       '      \\'virtualBankSeq\\': \\'seq1\\','+",
      "       '      \\'total\\': 1000,'+",
      "       '      \\'frequency\\': \\'23\\''+",
      "       '    },'+",
      "       '    {'+",
      "       '      \\'accountId\\': 3233450,'+",
      "       '      \\'displayType\\': \\'savings\\','+",
      "       '      \\'description\\': \\'This account's description\\','+",
      "       '      \\'virtualBankSeq\\': \\'seq2\\','+",
      "       '      \\'total\\': 2991,'+",
      "       '      \\'frequency\\': \\'23\\''+",
      "       '    },'+",
      "       '    {'+",
      "       '      \\'accountId\\': 4333450,'+",
      "       '      \\'displayType\\': \\'checking\\','+",
      "       '      \\'description\\': \\'This account's description\\','+",
      "       '      \\'virtualBankSeq\\': \\'seq3\\','+",
      "       '      \\'total\\': 1000,'+",
      "       '      \\'frequency\\': \\'23\\''+",
      "       '    }'+",
      "       '  ],'+",
      "       '  \\'totalMonthlyCost\\': 1000,'+",
      "       '  \\'oneAccountBalance\\': 9921,'+",
      "       '  \\'currentAccountBalance\\': 12321,'+",
      "       '  \\'createPlan\\': {'+",
      "       '    \\'createPlanStart\\': \\'2022-01-01\\','+",
      "       '    \\'createPlanDate\\': \\'2022-03-01\\','+",
      "       '    \\'createPlanEnd\\': \\'2022-10-01\\''+",
      "       '  }'+",
      "       '}'",
      ");"
    ] )
  } )
  it ( "should make sample code for a repeating", () => {
    expect ( makeJavaVariable ( RepeatingWholeDataD, 0 ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "public static List sampleRepeatingWholeData0 =  parse.parseList(",
      "       '['+",
      "       '  {'+",
      "       '    \\'name\\': \\'This is a one line string\\','+",
      "       '    \\'age\\': 123'+",
      "       '  },'+",
      "       '  {'+",
      "       '    \\'name\\': \\'another one line string\\','+",
      "       '    \\'age\\': 456'+",
      "       '  },'+",
      "       '  {'+",
      "       '    \\'name\\': \\'This is a one line string\\','+",
      "       '    \\'age\\': 123'+",
      "       '  }'+",
      "       ']'",
      ");"
    ])

  } )

  it ("should make a sample with a sampleOffset", () =>{
    expect ( makeSampleVariable ( paramsForTest, JointAccountDd, 0 ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export const sampleJointAccount0: domains.JointAccountDomain = ",
      "{",
      "  'balance': 123,",
      "  'main': {",
      "    'name': 'Fred Bloggs',",
      "    'addresses': [",
      "      {",
      "        'line1': 'This is a one line string',",
      "        'line2': 'This is a one line string'",
      "      },",
      "      {",
      "        'line1': 'another one line string',",
      "        'line2': 'another one line string'",
      "      },",
      "      {",
      "        'line1': 'This is a one line string',",
      "        'line2': 'This is a one line string'",
      "      }",
      "    ]",
      "  },",
      "  'joint': {",
      "    'name': 'Jill Blogs',",
      "    'addresses': [",
      "      {",
      "        'line1': 'another one line string',",
      "        'line2': 'another one line string'",
      "      },",
      "      {",
      "        'line1': 'another one line string',",
      "        'line2': 'another one line string'",
      "      },",
      "      {",
      "        'line1': 'This is a one line string',",
      "        'line2': 'This is a one line string'",
      "      }",
      "    ]",
      "  }",
      "}"
    ])

  })
} )



describe ( "makeSampleVariable", () => {
  it ( "should attach a sample to a variable", () => {
    expect ( makeSampleVariable ( paramsForTest, CreatePlanDD, 0 ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "export const sampleCreatePlan0: domains.CreatePlanDomain = ",
      "{",
      "  'createPlanStart': '2022-01-01',",
      "  'createPlanDate': '2022-03-01',",
      "  'createPlanEnd': '2022-10-01'",
      "}"
    ] )
  } )
} )