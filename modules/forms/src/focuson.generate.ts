import { directorySpec, generate, params } from "./makeFiles/generate";
import *  as fse from "fs-extra";
import { devAppConfig, focusOnVersion, javaOutputRoot, tsRoot } from "./appConfig";
import { AllGuardCreator } from "./buttons/guardButton";
import { makeButtons } from "./buttons/allButtons";
import { GenerateLogLevel } from "@focuson/utils";
import { generatedPages, generatedRefs } from "./focuson.config";
import { CombinedParams } from "./codegen/config";


const logLevel: GenerateLogLevel = 'detailed';

const params2: CombinedParams = {
    ...params,
    guardFnsFile: '../guardFns',
    controllerAnnotations: [ "@CrossOrigin()" ],
    endpointAnnotations: [],// ['@SomeSecurityAnnotation("{description} + {url}")'],
    endpointImports: [],
    focusOnVersion,
    thePackage: 'somepackage.somepostfix.another',
    theme: 'theme-light',
    debugLevel: 'debug',
};
generate ( logLevel, directorySpec, devAppConfig, params2,
  javaOutputRoot, tsRoot, AllGuardCreator, makeButtons () ) ( generatedPages, generatedRefs )


// fse.copySync ( '../formComponents/src', tsRoot + "/src/formComponents" )
fse.copySync ( './src/guardFns.ts', tsRoot + "/src/guardFns.ts" )



