import { Lenses, NameAndLens, Optional } from "../index";
import { NameAnd } from "@focuson/utils";

export interface PathBuilder<Build> {
  zero: ( initial: string ) => Build;
  foldAppend: ( acc: Build ) => Build;
  foldLast: ( acc: Build ) => Build;
  foldBracketsPath: ( acc: Build, path: Build ) => Build;
  foldKey: ( acc: Build, key: string ) => Build;
  foldNth: ( acc: Build, n: number ) => Build;
  foldChoices: ( acc: Build, choices: string[] ) => Build;
}

interface ParseState<Build> {
  errorPrefix: string;
  tokens: string[]; // these are in reverse order. We consume them by popping
  build: Build;
}
function makeError<Build> ( s: ParseState<Build>, msg: string ) {
  return Error ( `${s.errorPrefix} ${msg}` )
}

export function tokenisePath ( p: string ) {
  var i = 0
  const tokens: string[] = []
  var accStart: number = 0
  function addAcc () {
    let s = p.slice ( accStart, i - 1 );
    if ( inSpecialBrackets ) s = s.startsWith ( '$' ) ? s : '$' + s
    if ( s !== '' ) tokens.push ( s );
    accStart = i
    inSpecialBrackets = false
  }

  var inSpecialBrackets = false
  while ( true ) {
    if ( i >= p.length ) {
      if ( accStart < p.length ) tokens.push ( p.slice ( accStart ) )
      return tokens;
    }
    const ch = p[ i ];
    i = i + 1
    if ( inSpecialBrackets && ch === ']' ) addAcc ();
    else if ( ch === '[' && p[ i ] && (p[ i ] === '$' || p[ i ].match ( /[0-9]/ )) ) {
      addAcc ();
      inSpecialBrackets = true
    } else if ( ch === '[' || ch === ']' || ch === '~' || ch === '/' || ch == '|' ) {
      addAcc ();
      tokens.push ( ch )
    } else if ( !ch.match ( /[0-9A-Za-z._$]/ ) ) throw new Error ( `Illegal character [${ch}] at position ${i - 1} in [${p}]` )
  }
}
export function parsePath<Build> ( path: string, p: PathBuilder<Build> ): Build {
  const tokens = tokenisePath ( path )
  const build: Build = undefined;
  const s: ParseState<Build> = { build, tokens: tokens.reverse (), errorPrefix: `Error parsing '${path}'.` }
  processPath ( s, p, false )
  return s.build
}

export function prefixNameAndLens<S> ( ...choices: [ string, Optional<S, any> ][] ): NameAndLens<S> {
  const result: NameAndLens<S> = { '/': Lenses.identity () }
  choices.forEach ( ( [ p, l ] ) => result[ p ] = l )
  return result
}
export function lensBuilder<S> ( prefixs: NameAndLens<S> ): PathBuilder<Optional<S, any>> {
  return {
    zero ( initial: string ): Optional<S, any> { return prefixs[ initial ]; },
    foldBracketsPath ( acc: Optional<S, any>, path: Optional<S, any> ): Optional<S, any> { return acc.chainCalc ( path ) },
    foldAppend ( acc: Optional<S, any> ): Optional<S, any> { return acc.chain ( Lenses.append () ); },
    foldKey ( acc: Optional<S, any>, key: string ): Optional<S, any> { return acc.focusQuery ( key ); },
    foldLast ( acc: Optional<S, any> ): Optional<S, any> { return acc.chain ( Lenses.last () ); },
    foldNth ( acc: Optional<S, any>, n: number ): Optional<S, any> { return acc.chain ( Lenses.nth ( n ) ); },
    foldChoices ( acc, choices ) {return acc.chainIntoArray ( choices )}
  }
}

export function stateCodeInitials ( stateName: string ): NameAnd<string> {
  return { '': 'state', '~': 'fullState', '/': `state.copyWithIdentity()` }
}
export function stateCodeBuilder ( initials: NameAnd<string>, focusQuery?: string ): PathBuilder<string> {
  const realFocusQuery = focusQuery ? focusQuery : 'focusQuery'
  return {
    zero ( initial: string ): string { return initials[ initial ]; },
    foldBracketsPath ( acc: string, path: string ): string { return acc + `.chainNthFromPath(${path})`; },
    foldKey ( acc: string, key: string ): string { return acc + `.${realFocusQuery}('${key}')` },
    foldAppend ( acc: string ): string { return acc + ".chain(Lenses.append())"; },
    foldLast ( acc: string ): string { return acc + ".chain(Lenses.last())"; },
    foldNth ( acc: string, n: number ): string { return acc + `.chain(Lenses.nth(${n}))` },
    foldChoices ( acc: string, choices: string[] ) {return acc + `.chainIntoArray(${JSON.stringify ( choices )}`}
  }
}


function processBarAtEndOfPath<Build> ( s: ParseState<Build>, p: PathBuilder<Build>, expectBracket: boolean ) {
  var choices: string[] = []

  while ( true ) {
    const token1 = s.tokens.pop ()  // should be string not specific token
    if ( token1 === undefined ) throw makeError ( s, 'Ran out of tokens!' )
    if ( token1 === '[' || token1 === '/' || token1 === '~' || token1 === ']' ) throw makeError ( s, `Unexpected '${token1}` )
    choices.push ( token1 )

    const token2 = s.tokens.pop ()
    if ( token2 === undefined ) if ( expectBracket ) throw makeError ( s, 'Ran out of tokens!' ); else {
      s.build = p.foldChoices ( s.build, choices );
      return
    }
    if ( token2 === ']' )
      if ( expectBracket ) {
        s.build = p.foldChoices ( s.build, choices );
        return;
      } else throw makeError ( s, 'Unexpected ]' );
    if ( token2 !== '|' ) throw makeError ( s, `Expecting | got ${token2}` );

  }
}
export function processPath<Build> ( s: ParseState<Build>, p: PathBuilder<Build>, expectBracket: boolean ) {
  if ( s.tokens.length == 0 ) {
    s.build = p.zero ( '' );
    return
  }
  const initial = s.tokens[ s.tokens.length - 1 ]
  let hasSpecificInitial = initial === '/' || initial === '~';
  const actualInitial = hasSpecificInitial ? initial : ''
  if ( hasSpecificInitial ) s.tokens.pop ()
  s.build = p.zero ( actualInitial )
  if ( s.build === undefined ) throw makeError ( s, `Cannot find initial  '${actualInitial}'` )
  while ( true ) {
    const token = s.tokens.pop ()
    if ( token === undefined ) if ( expectBracket ) throw makeError ( s, 'Ran out of tokens!' ); else return
    if ( token === ']' ) if ( expectBracket ) return; else throw makeError ( s, 'Unexpected ]' );
    if ( token.startsWith ( '$' ) ) {
      if ( token === '$append' ) s.build = p.foldAppend ( s.build );
      else if ( token === '$last' ) s.build = p.foldLast ( s.build );
      else {
        let n = Number.parseInt ( token.slice ( 1 ) );
        if ( n === Number.NaN ) throw makeError ( s, `'${token.slice ( 1 )} is not a number` )
        s.build = p.foldNth ( s.build, n )
      }
    } else if ( token === '/' ) {}//
    else if ( token === '~' ) {throw makeError ( s, 'Unexpected ~' )}//
    else if ( token === '[' ) {
      const newState = { ...s } //note: not copying tokens: this is mutable .. we still consume tokens inside this, but there is a new state.
      processPath ( newState, p, true ); //the ] has been popped.
      s.build = p.foldBracketsPath ( s.build, newState.build )
    } else if ( token == '|' ) {
      processBarAtEndOfPath ( s, p, expectBracket );
      return
    } else {
      s.build = p.foldKey ( s.build, token )
    }
  }
}

