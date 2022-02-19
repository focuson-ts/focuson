#!/usr/bin/env bash

file="src/allPacts.ts"
echo 'import { FetchFn } from "@focuson/utils";
export const allPacts: [string, string, number, any][]=[' > "$file"
find pact/pacts -type f -name "*.json"  | xargs -L1 cat |  jq  -c '.interactions[]|[.request.method,.request.path,.response.status, .response.body]' | sed '$!s/$/,/' >> $file
echo ']

export const pactFetchFn: FetchFn = (req, info) =>{
  const result = allPacts.find(([method, path, status, body]) => req.toString()== path)
  return result ? Promise.resolve([result[2], result[3]]) : Promise.resolve([404, `Url ${req} is not found`])
}' >> "$file"
