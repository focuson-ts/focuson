#!/usr/bin/env bash

find pact/pacts -type f -name "*.json"  | xargs -L1 cat |  jq -r '[.provider.name,([(.interactions[] | .providerState)]|unique|join("!!!!"))]|@csv' | tr  , ' ' | xargs -L1  scripts/makeJava.sh