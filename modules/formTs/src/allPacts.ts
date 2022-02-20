import { FetchFn } from "@focuson/utils";
export const allPacts: [string, string, number, any][]=[
["GET","/api/accountsSummary",200,{"eAccountsTable":[{"accountId":"1233450","displayType":"checking","description":"This account has a description","virtualBankSeq":"seq1","total":"1000","frequency":"23"}],"totalMonthlyCost":"1000","oneAccountBalance":"9921","currentAccountBalance":"12321","createPlan":{"createPlanStart":"2022-01-01","createPlanDate":"2022-03-01","createPlanEnd":"2022-10-01"}}]
]

export const pactFetchFn: FetchFn = (req, info) =>{
  const result = allPacts.find(([method, path, status, body]) => req.toString()== path)
  return result ? Promise.resolve([result[2], result[3]]) : Promise.resolve([404, `Url ${req} is not found`])
}
