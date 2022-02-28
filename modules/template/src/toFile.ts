import * as fs from "fs";
import { applyToTemplate } from "./template";


export function writeToFile ( name: string, contents: string[] ) {
  fs.writeFileSync ( name, contents.join ( '\n' ) )
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
  const mainPath = main +"/" + from;
  try {
    // console.log ( '   main copyFile', mainPath, name )
    fs.copyFileSync ( mainPath, name )
  } catch ( e: any ) {
    const backupPath = backup + "/"+ from;

    console.log ( '   main copyFile', backupPath, name )
    fs.copyFileSync ( backupPath, name )

  }
}

export function loadFile ( inputName: string, directorySpec?: DirectorySpec ): string {
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

export function templateFile ( name: string, inputName: string, template: any, directorySpec?: DirectorySpec ) {
  const content = applyToTemplate ( loadFile ( inputName, directorySpec ), template )
  writeToFile ( name, content )

}