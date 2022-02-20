export const imports = ( ...names: string[] ): string[] => names.map ( name => {
  const s = noExtension ( name )
  return `import * as ${s} from './${s}';`
} );

export function noExtension ( name: string ) {
  const int = name.lastIndexOf ( '.' )
  if ( int < 0 ) return name;
  return name.substr ( 0, int )
}

export const addStringToEndOfAllButLast = ( ch: string ) => ( ss: string[] ): string[] =>
  ss.map ( ( s, i ) => i < ss.length - 1 ? s + ch : s );

export const indent = ( path: string[], s: string ): string => ' '.repeat ( path.length * 2 + 2 ) + s;
export const indentList = ( ss: string[] ): string[] => ss.map ( s => ' ' + s )
