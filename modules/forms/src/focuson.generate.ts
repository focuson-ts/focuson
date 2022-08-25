import { directorySpec, generate, params } from "./makeFiles/generate";
import *  as fse from "fs-extra";
import { devAppConfig, focusOnVersion, javaOutputRoot, tsRoot } from "./appConfig";
import { AllGuardCreator } from "./buttons/guardButton";
import { makeButtons } from "./buttons/allButtons";
import { GenerateLogLevel } from "@focuson/utils";
import { generatedPages, generatedRefs } from "./focuson.config";


const logLevel: GenerateLogLevel = 'detailed';

generate ( logLevel, directorySpec, devAppConfig, {
    ...params,
    guardFnsFile: '../guardFns',
    controllerAnnotations: [ "@CrossOrigin()" ],
    endpointAnnotations: [],// ['@SomeSecurityAnnotation("{description} + {url}")'],
    endpointImports: [],
    focusOnVersion,
    thePackage: 'somepackage.somepostfix.another',
    theme: 'theme-dark',
    debugLevel: 'debug',
  },
  javaOutputRoot, tsRoot, AllGuardCreator, makeButtons () ) ( generatedPages, generatedRefs )


fse.copySync ( '../formComponents/src', tsRoot + "/src/formComponents" )
fse.copySync ( './src/guardFns.ts', tsRoot + "/src/guardFns.ts" )



