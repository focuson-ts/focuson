I had a number of issues getting the @pact library to compile

In the end I found this useful https://github.com/Microsoft/nodejs-guidelines/blob/master/windows-environment.md#compiling-native-addon-modules

I installed visual studio 2017 (very old and parts of it unsupported) and 
ran `yarn` from the command prompt of that. To get the prompt I 
opened up the explorer

I also needed  `npm config set msvs_version 2017` to make this work


#Running the pact server
docker pull pactfoundation/pact-stub-server
docker run -t -p 8080:8080 -v "$(pwd)/pact/pacts/:/app/pact/pacts" pactfoundation/pact-stub-server -p 8080 -d pact/pacts

or you can use `laoban runPact` which runs the pact server for projects with packport defined in the `project.details`