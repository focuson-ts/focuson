export type Fn<From, To> = ( from: From ) => To
export type FnK<From, To> = ( from: From ) => Promise<To>

export type FnWithError<From, To, Error> = ( from: From ) => To | Error[]

export type Fn11<From, Mid, To> = ( f: From ) => ( m: Mid ) => To

export type Transformer<From1, To1, From2, To2> = ( fn: Fn<From1, To1> ) => Fn<From2, To2>
export type Delegate<From, To> = Transformer<From, To, From, To>

export const chainOfResponsibilityFns = <From, To> ( ...fns: Fn<From, To | undefined>[] ): Fn<From, To | undefined> =>
  ( from: From ) => {
    for ( var i = 0; i < fns.length; i++ ) {
      const f = fns[ i ]
      const result = f ( from );
      if ( result !== undefined ) return result
    }
    return undefined
  };
const unary = fn => ( ...args ) => fn ( args[ 0 ] );
export const combineTxs = <From, To> ( ...txs: Delegate<From, To>[] ): Delegate<From, To> =>
  ( fn: Fn<From, To> ) => txs.reduce ( ( acc: Fn<From, To>, tx ) => tx ( acc ), fn );

export const ifFn = <From, To1, To2> ( cond: Fn<From, boolean>, thenFn: Fn<From, To1>, elseFn: Fn<From, To2> ): Fn<From, To1 | To2> =>
  from => cond ( from ) ? thenFn ( from ) : elseFn ( from );

export const pipe = <T> ( ...fns: Fn<T, T>[] ): Fn<T, T> =>
  from => fns.reduce ( ( acc: T, fn ) => fn ( acc ), from )

interface SimpleNonFunctional<From, To> {
  pre: ( from: From ) => From
  post: ( to: To, from: From ) => To
}
function isSimpleNF<From, To> ( n: NonFunctional<From, To> ): n is SimpleNonFunctional<From, To> {
  const a: any = n
  return a.pre !== undefined
}
interface ErrorNonFunctional<From, To> {
  error: ( from: From, e: any ) => To
}
function isErrorNF<From, To> ( n: NonFunctional<From, To> ): n is ErrorNonFunctional<From, To> {
  const a: any = n
  return a.error !== undefined
}
type NonFunctional<From, To> = SimpleNonFunctional<From, To> | ErrorNonFunctional<From, To>


const applyNonFunctional = <From, To> ( fn: Fn<From, To>, nf: NonFunctional<From, To> ): Fn<From, To> => {
  return from => {
    if ( isErrorNF ( nf ) )
      try {
        return fn ( from )
      } catch ( e: any ) {
        return nf.error ( from, e )
      }
    if ( isSimpleNF ( nf ) ) return nf.post ( fn ( nf.pre ( from ) ), from )
  }
}

export const applyNonFunctionals = <From, To> ( ...nfs: NonFunctional<From, To>[] ) => ( fn: Fn<From, To> ) =>
  nfs.reduce ( applyNonFunctional, fn )

const applyNonFunctionalK = <From, To> ( fn: FnK<From, To>, nf: NonFunctional<From, To> ): FnK<From, To> => {
  return from => {
    if ( isErrorNF ( nf ) )
      try {
        return fn ( from ).catch ( error => nf.error ( from, error ) )
      } catch ( e: any ) {
        return Promise.resolve ( nf.error ( from, e ) )
      }
    if ( isSimpleNF ( nf ) ) return fn ( nf.pre ( from ) ).then ( res => nf.post ( res, from ) )
  }
}

export const applyNonFunctionalsK = <From, To> ( ...nfs: NonFunctional<From, To>[] ) => ( fn: FnK<From, To> ) =>
  nfs.reduce ( applyNonFunctionalK, fn )