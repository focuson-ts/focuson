import * as domains from '../CreateEAccount/CreateEAccount.domains'

export const sampleCreateEAccountData0: domains.CreateEAccountDataDomain = 
{
  "name": "This is a one line string",
  "type": "checking",
  "savingsStyle": "adHoc",
  "initialAmount": 123
}
export const sampleCreateEAccountData1: domains.CreateEAccountDataDomain = 
{
  "name": "another one line string",
  "type": "savings",
  "savingsStyle": "payRegular",
  "initialAmount": 456
}
export const sampleCreateEAccountData2: domains.CreateEAccountDataDomain = 
{
  "name": "This is a one line string",
  "type": "checking",
  "savingsStyle": "paySettime",
  "initialAmount": 123
}