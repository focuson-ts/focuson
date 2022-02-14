import * as path from "path";
import { Command } from 'commander';
const program = new Command();
program
  .name ( 'string-util' )
  .description ( 'CLI to some JavaScript string utilities' )
  .version ( '0.8.0' );

program.command ( 'createReactComponents' )
  .description ( 'Makes the react components for each resource' )
  .option ( '--output <char>', 'where to put the output', 'react/resource'  )
  .action ( ( str: any ) => {
    const {output} = str;
    console.log("CreateReactComponents",str, output)
  } );

program.parse ();