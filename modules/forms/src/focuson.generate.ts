import { generate } from "./makeFiles/generate";
import *  as fse from "fs-extra";
import { focusOnVersion, generatedPages, javaOutputRoot, devAppConfig, tsRoot } from "./focuson.config";
import { AllGuardCreator } from "./buttons/guardButton";
import { makeButtons } from "./buttons/allButtons";


generate (devAppConfig, javaOutputRoot, tsRoot, focusOnVersion, AllGuardCreator, makeButtons () ) ( generatedPages )

fse.copySync ( '../formComponents/src', tsRoot + "/src/copied" )


