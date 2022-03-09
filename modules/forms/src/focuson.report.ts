import { generate } from "./makeFiles/generate";
import *  as fse from "fs-extra";
import { focusOnVersion, generatedPages, javaOutputRoot, tsRoot } from "./focuson.config";
import { makeReport } from "./reporting/report";


let lines: string[] = makeReport ( generatedPages );
lines.forEach ( p => {
  process.stdout.write ( p );
  process.stdout.write ( "\n" )
} )


