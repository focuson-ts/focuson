import { generate } from "./makeFiles/generate";
import *  as fse from "fs-extra";
import { focusOnVersion, generatedPages, javaOutputRoot, tsRoot } from "./focuson.config";
import { AllGuardCreator } from "./buttons/guardButton";
import { makeButtons } from "./buttons/allButtons";


generate ( javaOutputRoot, tsRoot, focusOnVersion, AllGuardCreator, makeButtons () ) ( generatedPages )

fse.copySync ( '../formComponents/src', tsRoot + "/src/copied" )


