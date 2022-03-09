import { generate } from "./makeFiles/generate";
import *  as fse from "fs-extra";
import { focusOnVersion, generatedPages, javaOutputRoot, tsRoot } from "./focuson.config";


generate ( javaOutputRoot, tsRoot, focusOnVersion ) ( generatedPages )

fse.copySync ( '../formComponents/src', tsRoot + "/src/copied" )


