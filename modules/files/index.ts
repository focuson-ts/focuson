import { applyToTemplate } from "@focuson/template";
import { log } from "@focuson/utils";


const fs = require ( 'fs' )//Why comment: because things like story book die if we have this as an import

export function writeToFile ( name: string, contents: () => string[], logDepth?: number ) {
  if ( logDepth && logDepth >= 0 ) log ( logDepth, name )
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

export interface GetFileResult {
  isDir: boolean
  path: string
  file: string
}
/**
 * serach files and directories recursively.
 *  Option: you can limit search path depth.
 * @param {string} targetpath search base path
 * @param {number} depth recursive depth. default = no depth limit
 * @returns list of { path:absolute path, file: name, isDir:is directory } of files and dirs in targetpath
 */
export const GetFilelistRecursively2 = (( targetpath: string, depth: number = -1 ): GetFileResult[] => {
  let result: GetFileResult[] = [];
  let dirs: string[] = fs.readdirSync ( targetpath );
  dirs.forEach ( file => {
    let filepath = targetpath + "/" + file;
    let isDir = fs.lstatSync ( filepath ).isDirectory ();
    result.push ( { path: filepath, isDir: isDir, file } );
    if ( isDir ) {
      if ( depth == 0 ) return result;
      result = result.concat ( GetFilelistRecursively2 ( filepath, depth - 1 ) );
    }
  } );
  return result;
});

/**
 * Recursively copies folders and files under the specified path with the same structure.
 * If the destination directory does not exist, a folder will be created and copied into it.
 * In case of insufficient permissions or insufficient capacity, it will detect an exception and stop.
 * @param {string} srcpath copy from the path
 * @param {string} destpath copy to the path
 */
export const CopyFilesRecursively = (( srcpath: string, destpath: string, depth: number = -1 ) => {
  if ( !fs.existsSync ( destpath ) ) {
    fs.mkdirSync ( destpath, { recursive: true } );
  }
  let targetList = GetFilelistRecursively2 ( srcpath, depth );
  targetList.forEach ( node => {
    let newpath = destpath + node.path.substring ( srcpath.length );
    if ( node.isDir ) {
      if ( !fs.existsSync ( destpath ) ) fs.mkdirSync ( newpath );
    } else {
      fs.copyFile ( node.path, newpath, ( err: any ) => {if ( err ) throw err} );
    }
  } );
});