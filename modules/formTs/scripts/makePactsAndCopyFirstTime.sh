function usage (){
   echo "makePactsAndCopyFirstTime.sh"
   echo "   runs the pact tests in the react gui"
   echo "   generates the pact verify java files"
   echo "   copies the pact tests and the pact validation to ../formJava/java/ExampleApp"
}
if [ $# != 0 ]; then usage; fi
echo "makePactsAndCopyFirstTime  ===>  ../formJava/java/ExampleApp   and focuson.data"
#yarn test
mkdir -p ../formJava/java/ExampleApp/acceptedPacts
mkdir -p ../formJava/java/ExampleApp/src/test/java
cp pact/pacts/*  ../formJava/java/ExampleApp/acceptedPacts
scripts/makeJvmPact.sh
cp res/*  ../formJava/java/ExampleApp/src/test/java/
cd  ../formJava/java/ExampleApp