import { directorySpec, generate, params } from "./makeFiles/generate";
import *  as fse from "fs-extra";
import { devAppConfig, focusOnVersion,  javaOutputRoot, tsRoot } from "./appConfig";
import { AllGuardCreator } from "./buttons/guardButton";
import { makeButtons } from "./buttons/allButtons";
import { GenerateLogLevel } from "@focuson/utils";
import { generatedPages } from "./focuson.config";


const logLevel: GenerateLogLevel = 'detailed';



generate ( logLevel, directorySpec, devAppConfig, { ...params, focusOnVersion, thePackage: 'focuson.data' }, javaOutputRoot, tsRoot, AllGuardCreator, makeButtons () ) ( generatedPages )


fse.copySync ( '../formComponents/src', tsRoot + "/src/formComponents" )


