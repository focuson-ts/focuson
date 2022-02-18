import * as fs from "fs";
import { applyToTemplate } from "./template";



export function writeToFile ( name: string, contents: string[] ) {
  fs.writeFileSync ( name, contents.join ( '\n' ) )
}

export interface DirectorySpec {
  main: string;
  backup: string
}
export const copyFiles = ( fromRoot: string, toRoot: string, directorySpec?: DirectorySpec ) => ( ...names: string[] ) => {
  names.forEach ( n => copyFile ( fromRoot + "/" + n, toRoot + "/" + n, directorySpec ) )
};
export function copyFile ( name: string, from: string, directorySpec?: DirectorySpec ) {
  const { main, backup } = directorySpec ? directorySpec : { main: ".", backup: "." }
  const mainPath = main + "/" + from;
  try {
    fs.copyFileSync ( from, mainPath )
  } catch ( e: any ) {
    const backupPath = backup + "/" + from;
    try {
      fs.copyFileSync ( from, backupPath )
    } catch ( e: any ) {
      const extra = mainPath === backupPath ? "" : `And from ${backupPath}`
      throw Error ( `Failed to copy files. Target [${name}] ${mainPath}${extra}` )
    }
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