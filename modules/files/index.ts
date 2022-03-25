import { applyToTemplate } from "@focuson/template";
import { log } from "@focuson/utils";


const fs = require ( 'fs' )//Why comment: because things like story book die if we have this as an import

export function writeToFile ( name: string, contents: () => string[], logDepth?: number ) {
  if ( logDepth >= 0 ) log ( logDepth, name )
  try {
    const text = contents ().join ( '\n' );
    fs.writeFileSync ( name, text )
  } catch ( e: any ) {
    console.error ( `Exception creating file ${name}` )
    throw e
  }
}

export interface DirectorySpec {
  main: string;
  backup: string
}
export const copyFiles = ( toRoot: string, fromRoot: string, directorySpec?: DirectorySpec ) => ( ...names: string[] ) => {
  // console.log ( 'copyFiles', fromRoot, toRoot, names )
  names.forEach ( n => copyFile ( toRoot + "/" + n, fromRoot + "/" + n, directorySpec ) )
};
export function copyFile ( name: string, from: string, directorySpec?: DirectorySpec ) {
  // console.log ( 'copyFile name to ', name, 'from', from )
  const { main, backup } = directorySpec ? directorySpec : { main: ".", backup: "." }
  const mainPath = main + "/" + from;
  try {
    // console.log ( '   main copyFile', mainPath, name )
    fs.copyFileSync ( mainPath, name )
  } catch ( e: any ) {
    const backupPath = backup + "/" + from;

    console.log ( '   main copyFile', backupPath, name )
    fs.copyFileSync ( backupPath, name )

  }
}

export function loadFile ( inputName: string, directorySpec?: DirectorySpec ): string {
  const fs = require ( 'fs' )//Why comment: because things like story book die if we have this as an import
  const { main, backup } = directorySpec ? directorySpec : { main: ".", backup: "." }
  const mainPath = main + "/" + inputName;
  try {
    return fs.readFileSync ( mainPath ).toString ()
  } catch ( e: any ) {
    const backupPath = backup + "/" + inputName;
    try {
      return fs.readFileSync ( backupPath ).toString ()
    } catch ( e: any ) {
      const extra = mainPath === backupPath ? "" : `And from ${backupPath}`
      throw Error ( `Failed to load file ${mainPath}${extra}` )
    }
  }
}

export function templateFile ( name: string, inputName: string, template: any, directorySpec?: DirectorySpec, logDepth?: number ) {
  writeToFile ( name, () => applyToTemplate ( loadFile ( inputName, directorySpec ), template ), logDepth )

}