import { generatedPages } from "./focuson.config";
import { makeReport } from "./reporting/report";
import { AllButtonsInPage } from "./buttons/allButtons";
import { AllGuards } from "./buttons/guardButton";


let lines: string[] = makeReport<AllButtonsInPage<AllGuards>, AllGuards> ( generatedPages );
lines.forEach ( p => {
  process.stdout.write ( p );
  process.stdout.write ( "\n" )
} )


