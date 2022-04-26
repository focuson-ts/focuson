import { directorySpec, generate, params } from "./makeFiles/generate";
import *  as fse from "fs-extra";
import { devAppConfig, focusOnVersion, generatedPages, javaOutputRoot, tsRoot } from "./focuson.config";
import { AllGuardCreator, AllGuards } from "./buttons/guardButton";
import { AllButtonsInPage, makeButtons } from "./buttons/allButtons";
import { GenerateLogLevel } from "@focuson/utils";
import { makeReport } from "./reporting/report";
import { writeToFile } from "@focuson/files";


const logLevel: GenerateLogLevel = 'detailed';

generate ( logLevel, directorySpec, devAppConfig, { ...params, focusOnVersion, thePackage: 'focuson.data' }, javaOutputRoot, tsRoot, AllGuardCreator, makeButtons () ) ( generatedPages )



fse.copySync ( '../formComponents/src', tsRoot + "/src/formComponents" )


