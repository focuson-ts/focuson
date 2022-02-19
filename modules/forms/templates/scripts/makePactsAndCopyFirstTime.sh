

function usage (){
   echo "makePactsAndCopyFirstTime.sh"
   echo "   runs the pact tests in the react gui"
   echo "   generates the pact verify java files"
   echo "   copies the pact tests and the pact validation to {javaRoot}"
}

if [ $# != 0 ]; then usage; fi

echo "makePactsAndCopyFirstTime  ===>  {javaRoot}   and {thePackage}"

#yarn test
mkdir -p {javaRoot}/acceptedPacts
mkdir -p {javaRoot}/src/test/java
cp pact/pacts/*  {javaRoot}/acceptedPacts
scripts/makeJvmPact.sh
cp res/*  {javaRoot}/src/test/java/

cd  {javaRoot}

