import * as domains from '../CreateEAccount/CreateEAccount.domains'

export const emptyCreateEAccountData:domains.CreateEAccountDataDomain =
  {
    "name": "",
    "type": "savings",
    "savingsStyle": "adhoc",
    "initialAmount": 0
  }