import { generate } from "./makeFiles/generate";
import *  as fse from "fs-extra";
import { focusOnVersion, generatedPages, javaOutputRoot, tsRoot } from "./focuson.config";
import { makeReport } from "./reporting/report";
import { AllButtonsInPage } from "./buttons/allButtons";
import { AllGuards } from "./buttons/guardButton";


let lines: string[] = makeReport<AllButtonsInPage<AllGuards>, AllGuards> ( generatedPages );
lines.forEach ( p => {
  process.stdout.write ( p );
  process.stdout.write ( "\n" )
} )


