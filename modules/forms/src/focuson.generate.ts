import { generate } from "./makeFiles/generate";
import *  as fse from "fs-extra";
import { devAppConfig, focusOnVersion, generatedPages, javaOutputRoot, tsRoot } from "./focuson.config";
import { AllGuardCreator } from "./buttons/guardButton";
import { makeButtons } from "./buttons/allButtons";
import { GenerateLogLevel } from "@focuson/utils";


const logLevel: GenerateLogLevel = 'detailed';

generate ( logLevel, devAppConfig, javaOutputRoot, tsRoot, focusOnVersion, AllGuardCreator, makeButtons () ) ( generatedPages )

fse.copySync ( '../formComponents/src', tsRoot + "/src/formComponents" )


