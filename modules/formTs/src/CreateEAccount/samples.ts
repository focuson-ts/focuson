import * as domains from './domains';
export const sampleCreateEAccountDataDD0: domains.CreateEAccountDataDDDomain = 
{
  "name": "This is a one line string",
  "type": "checking",
  "savingsStyle": "adHoc",
  "initialAmount": 123
}
export const sampleCreateEAccountDataDD1: domains.CreateEAccountDataDDDomain = 
{
  "name": "another one line string",
  "type": "savings",
  "savingsStyle": "payRegular",
  "initialAmount": 456
}
export const sampleCreateEAccountDataDD2: domains.CreateEAccountDataDDDomain = 
{
  "name": "This is a one line string",
  "type": "This is a one line string",
  "savingsStyle": "paySettime",
  "initialAmount": 123
}