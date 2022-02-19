#!/usr/bin/env bash

provider="$1"
stateAsOneString=$2
state=$( sed  -e 's/!!!!/","/g' -e 's/^/"/' -e 's/$/"/' <<< $stateAsOneString)
if [[ "$provider" == *" "* ]]; then echo "Provider [$provider] has space in it. This will cause problems with the port"; fi
port=$(echo "$provider" | join - "scripts/ports" | awk '{print $2 }')
if [ "$port" == '' ]; then echo "Add $provider to port"; fi
mkdir -p res
#echo "debug making pact [$provider] [$state] [$port]"
#cat scripts/template.java | sed -e "s/<PROVIDER>/$provider/g" -e "s/<STATE>/$state/g" -e "s/<PORT>/$port/g"
cat scripts/template.java | sed -e "s/<PROVIDER>/$provider/g" -e "s/<STATE>/$state/g" -e "s/<PORT>/$port/g" > "res/${provider}ProviderPactTest.java"

