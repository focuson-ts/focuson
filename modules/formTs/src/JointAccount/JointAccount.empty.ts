import * as domains from '../JointAccount/JointAccount.domains'

export const emptyJointAccount:domains.JointAccountDomain =
  {
    "balance": 0,
    "main": {
      "name": "",
      "addresses": [
        {
          "line1": "",
          "line2": ""
        }
      ]
    },
    "joint": {
      "name": "",
      "addresses": [
        {
          "line1": "",
          "line2": ""
        }
      ]
    }
  }
export const emptyJointAccountAddress:domains.JointAccountAddressDomain =
  {
    "line1": "",
    "line2": ""
  }
export const emptyJointAccountAddresses:domains.JointAccountAddressesDomain =
  [
    {
      "line1": "",
      "line2": ""
    }
  ]
export const emptyJointAccountCustomer:domains.JointAccountCustomerDomain =
  {
    "name": "",
    "addresses": [
      {
        "line1": "",
        "line2": ""
      }
    ]
  }