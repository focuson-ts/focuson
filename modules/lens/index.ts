import { apply, applyOrDefault, checkIsFunction, copyWithFieldSet, NameAnd, useOrDefault } from "@focuson/utils";

export const identityOptics = <State> ( description?: string ): Iso<State, State> => new Iso ( x => x, x => x, description ? description : "I" );

export interface GetOptioner<Main, Child> {
  getOption: ( m: Main ) => Child | undefined
}
export interface SetOptioner<Main, Child> {
  setOption: ( m: Main, c: Child ) => Main | undefined
}
export interface Getter<Main, Child> {
  get: ( m: Main ) => Child
}
export interface Setter<Main, Child> {
  set: ( m: Main, c: Child ) => Main
}


export interface HasOptional<Main, T> {
  optional: Optional<Main, T>
}
/** An Optional is like a lens, except that it is not guaranteed to 'work'. Specifically if you ask for a child... maybe that child isn't there.
 *
 * This is great for things like 'optional values' which are often written as 'name?: type' in typescript.
 *
 * It is rare that you create one directly. Usually it is created using 'focusQuery' on a lens
 */
export class Optional<Main, Child> implements GetOptioner<Main, Child>, SetOptioner<Main, Child> {
  getOption: ( m: Main ) => Child | undefined
  setOption: ( m: Main, c: Child ) => Main | undefined
  description: string

  constructor ( getOption: ( m: Main ) => (Child | undefined), optionalSet: ( m: Main, c: Child ) => Main | undefined, description?: string ) {
    this.getOption = getOption;
    this.setOption = optionalSet;
    this.description = description ? description : ""
  }

  set = ( m: Main, c: Child ): Main => useOrDefault ( m ) ( this.setOption ( m, c ) );
  map = ( m: Main, fn: ( c: Child | undefined ) => Child ): Main => this.set ( m, fn ( this.getOption ( m ) ) )
  mapDefined = ( m: Main, fn: ( c: Child ) => Child ): Main => applyOrDefault ( this.getOption ( m ), c => this.set ( m, fn ( c ) ), m )

  /** This is identical to this.setOption(m, undefined) */
  clearJson ( m: Main, msgIfCannot?: string ) {
    // @ts-ignore
    return this.setOption ( m, undefined )
  }

  /** Allows us to change the focuson-ed child based on it's existing value
   * @fn a function that will be given the old value and will calculate the new
   * @returns a function that given a Main will return a new main with the child transformed as per  'fn' */
  transform ( fn: ( oldChild: Child ) => Child ): ( m: Main ) => Main {
    return m => this.map ( m, fn )
  }

  /** This is used when the 'parameter' points to definite value. i.e. it isn't 'x: X | undefined' or 'x?: X'. If you want to
   * walk through those you probably want to use 'focusQuery'
   *
   * If the type system is complaining and you are sure that it should be OK, check if the previous focusOn should be a focusQuery
   * @param k
   */
  focusOn<K extends keyof Child> ( k: K ): Optional<Main, Child[K]> {
    return new Optional<Main, Child[K]> (
      ( m ) => apply ( this.getOption ( m ),
        c => c[ k ] ), ( m, v: Child[K] ) => apply ( this.getOption ( m ), c => this.set ( m, copyWithFieldSet ( c, k, v ) ) ), this.description + ".focusOn(" + k + ")" )
  }

  /** Used to focus onto a child that might not be there. If you don't use this, then the type system is likely to complain if you try and carry on focusing. */
  focusQuery<K extends keyof Child, Req extends Required<Child>> ( k: K ): Optional<Main, Req[K]> {
    return new Optional<Main, Req[K]> (
      // @ts-ignore
      m => apply ( this.getOption ( m ), c => c[ k ] ), ( m, v ) => apply ( this.getOption ( m ), c => this.set ( m, copyWithFieldSet ( c, k, v ) ) ),
      this.description + ".focus?(" + k + ")" )
  }


  chain<T> ( o: Optional<Child, T> ): Optional<Main, T> {
    return new Optional<Main, T> (
      m => apply ( this.getOption ( m ), c => o.getOption ( c ) ),
      ( m, t ) => this.map ( m, oldC => o.set ( oldC, t ) ),
      this.description + ".chain(" + o.description + ")"
    )
  }


  combine<OtherChild> ( other: Optional<Main, OtherChild> ) {
    return new Optional<Main, [ Child, OtherChild ]> (
      m => apply ( this.getOption ( m ), ( c: Child ) => apply ( other.getOption ( m ), nc => [ c, nc ] ) ),
      ( m, newChild ) => {
        let [ nc, noc ] = newChild
        let m1 = other.set ( m, noc );
        return this.set ( m1, nc )
      },
      "combine(" + this.description + "," + other.description + ")"
    )
  }
  /** If you desire to change the description this will do that. It is rarely called outside the Lens code itself */
  withDescription ( description: string ) {
    return new Optional ( this.getOption, this.set, description )
  }


  combineAs<OtherChild, NewChild> ( other: Optional<Main, OtherChild>, iso: Iso<[ Child, OtherChild ], NewChild> ): Optional<Main, NewChild> {
    return this.combine ( other ).chain ( iso )
  }

  toString () {
    return "Optional(" + this.description + ")"
  }
}
export function optional<Main, Child> ( getOption: ( m: Main ) => Child | undefined, setOption: ( m: Main, c: Child ) => Main | undefined, description?: string ) {
  return new Optional ( getOption, setOption, description )
}
export function orUndefined<T> ( description?: string ): Optional<T | undefined, T> {
  const getOption = ( t: T | undefined ) => t
  const setOption = ( t: T | undefined, child: T | undefined ) => child
  return optional<T | undefined, T> ( getOption, setOption, description )
}

export function castIfOptional<T, T1> ( cond: ( t: T ) => boolean, description?: string ): Optional<T, T1> {
  function getOption ( t: T ): T1 | undefined {
    // @ts-ignore
    return cond ( t ) ? t : undefined
  }

  function setOption ( ignore: T, child: T1 ): T | undefined {
    // @ts-ignore
    return child
  }
  return optional ( getOption, setOption, description ? description : `castIf` )
}

/**
 * Creates a lens with two generics. Lens<Main,Child>. Main is the main 'object' that we start with, and Child is the part of Main that the lens is focuson-ed
 * @param get should be a sideeffect free function that goes from 'Main' to the focuson-ed child. When called it 'gets' the Child from the Main
 * @param set should be a sideeffect free function that creates a new Main out of an old main and a new child. It returns the old main with the 'focuson-ed' part replaced by the new child
 * @param description should probably be the string representation of the class 'Main'. If the main object is of type Dragon, this could be the string 'dragon'.
 *
 * Usually these are created by code like
 *
 * identityOptics<Dragon>().focuson('head')
 */
export function lens<Main, Child> ( get: ( main: Main ) => Child, set: ( main: Main, newChild: Child ) => Main, description?: string ): Lens<Main, Child> {
  checkIsFunction ( get )
  checkIsFunction ( set )
  return new Lens ( get, set, description ? description : "lens" )
}

/** This is the class that represents a Lens<Main,Child> which focuses on Child which is a part of the Main */
export class Lens<Main, Child> extends Optional<Main, Child> implements Getter<Main, Child>, Setter<Main, Child> {
  set: ( m: Main, c: Child ) => Main
  get: ( m: Main ) => Child

  constructor ( get: ( m: Main ) => (Child), set: ( m: Main, c: Child ) => Main, description: string ) {
    super ( get, set, description );
    this.get = get;
    this.set = set;
  }


  /** this is the 'normal' focuson. We use it when we know that the result is there. i.e. if we have
   *
   * interface AB{
   *      a: string,
   *      b?: SomeInterface | undefined
   * }
   *
   * In this case focusOn('a') will give us a Lens<AB,string> but focusOn('b') will give a lens<AB, SomeInterface|undefined>.

   * @param k
   */
  focusOn<K extends keyof Child> ( k: K ): Lens<Main, Child[K]> {
    return new Lens<Main, Child[K]> (
      ( m ) => this.get ( m )[ k ],
      ( m, c ) => this.set ( m, copyWithFieldSet ( this.get ( m ), k, c ) ),
      this.description + ".focusOn(" + k + ")" )
  }

  /** interface AB{
   *      a: string,
   *      b?: SomeInterface | undefined
   * }
   *
   * In this case it would be redundant to have  focusWithDefault('a', "someA") because 'a' should never be undefined.
   * However (if someValue is a SomeInterface)  focusWithDfeault('b', someValue) return Lens<AB,SomeInterface>  and if we do a get, and b was undefined, we use 'someValue'
   * @param k
   */
  focusWithDefault<K extends keyof Child, Req extends Required<Child>> ( k: K, def: Child[K] ): Lens<Main, Req[K]> {
    // @ts-ignore
    return new Lens<Main, Required<Child[K]>> ( ( m: Main ) => useOrDefault ( def ) ( this.get ( m )[ k ] ),
      // @ts-ignore
      ( m, v ) => this.set ( m, copyWithFieldSet ( this.get ( m ), k, v ) ),
      this.description + ".focusWithDefault(" + k + ")" )
  }

  chainLens = <T> ( o: Lens<Child, T> ): Lens<Main, T> => new Lens<Main, T> (
    m => o.get ( this.get ( m ) ),
    ( m, t ) => this.set ( m, o.set ( this.get ( m ), t ) ),
    this.description + ".chain(" + o.description + ")" );

  /** @deprecated */
  chainWith = this.chainLens


  combineLens<OtherChild> ( other: Lens<Main, OtherChild> ): Lens<Main, [ Child, OtherChild ]> {
    return new Lens<Main, [ Child, OtherChild ]> (
      m => [ this.get ( m ), other.get ( m ) ],
      ( m, newChild ) => this.set ( other.set ( m, newChild[ 1 ] ), newChild[ 0 ] ),
      "combine(" + this.description + "," + other.description + ")" )
  }

  /** If you desire to change the description this will do that. It is rarely called outside the Lens code itself */
  withDescription ( description: string ) {
    return new Lens ( this.get, this.set, description )
  }


  toString () {
    return "Lens(" + this.description + ")"
  }
}


/** A factory class that allows us to create new Lens. Every method on it is static, so you would never create one of these
 *
 * This class will be removed and replaced with just 'plain functions'
 * */

export class Lenses {

  /** This is a the normal way to generate lens. It create a link that goes from Main to itself */
  static build<Main> ( description: string ) {
    return Lenses.identity<Main> ().withDescription ( description )
  }

  static fromPath = <From, To> ( path: string[], description?: string ): Optional<From, To> => {
    let initialValue: any = Lenses.identity<any> ( description ? description : '' );
    return path.reduce ( ( acc, p ) => acc.focusQuery ( p ), initialValue )
  }
  static fromPathWith = <From, To> ( ref: NameAnd<Optional<From, number>> ) => ( path: string[], description?: string ): Optional<From, To> => {
    let initialValue: any = Lenses.identity<any> ( description ? description : '' );
    return path.reduce ( ( acc, p ) => {
      const matchRef = /^{([a-z0-9]+)}$/g.exec ( p )
      if ( matchRef ) return Lenses.chainNthRef ( acc, ref, matchRef[ 1 ] )
      const matchNum = /^\[([0-9]+)]$/g.exec ( p )
      if ( matchNum ) return acc.chain ( Lenses.nth ( Number.parseInt ( matchNum[ 1 ] ) ) )
      return acc.focusQuery ( p );
    }, initialValue )

  }


  /** Given a main which is an object, with a field name, this returns a lens that goes from the Main to the contents of the field name */
  static field = <Main, K extends keyof Main> ( fieldName: K ): Lens<Main, Main[K]> => lens ( m => m[ fieldName ], ( m, c ) => {
    let result = Object.assign ( {}, m )
    result[ fieldName ] = c
    return result
  }, fieldName.toString () )

  /** Given a main which is an object, with a field name, this returns a lens that goes from the Main to the contents of the field name */
  static identity<M> ( description?: string ): Iso<M, M> {
    return identityOptics<M> ( description )
  }

  /**This should no longer be needed. It was in fact the need for this method that drove the rewrite using Optionals/Prisms and Isos.
   *
   * Nowadays we can use focusQuery
   *
   * It should only be used when we 'know' that a Lens<Main,Child|undefined> is really a Lens<Main,Child>.
   * @deprecated */
  static define<T> (): Lens<T | undefined, T> {
    return lens ( main => {
        if ( main != undefined ) return main; else throw new Error ( "undefined" )
      },
      ( main, child ) => child )
  }


  /** This returns a lens from an array of T to the nth member of the array */
  static nth<T> ( n: number ): Lens<T[], T> {
    const check = ( verb: string, length: number ) => {
      if ( n > length ) throw Error ( `Cannot Lens.nth(${n}).${verb}. arr.length is ${length}` )
    };
    if ( n < 0 ) throw Error ( `Cannot give Lens.nth a negative n [${n}]` )
    return lens ( arr => {
        check ( 'get', arr.length );
        return arr[ n ]
      },
      ( main, value ) => {
        check ( 'set', main.length )
        let result = main.slice ();
        result[ n ] = value;
        return result
      }, `[${n}]` )
  }

  static chainNthRef<From, T> ( lens: Optional<From, T[]>, lookup: NameAnd<Optional<From, number>>, name: string, description?: string ): Optional<From, T> {
    if ( !lookup ) throw new Error ( 'lookup must not be undefined' )
    function findIndex ( f: From ): number {
      const opt: Optional<From, number> = lookup[ name ]
      if ( !opt ) throw new Error ( `nthRef of [${name}] doesn't exist. Legal names are ${Object.keys ( lookup ).sort ()}` )
      const index = opt.getOption ( f )
      if ( index === undefined || index < 0 ) throw new Error ( `nthRef of ${name} maps to ${index} in ${JSON.stringify ( f )}` )
      return index;
    }
    function findArrayAndCheckIndex ( f: From, index: number ): T[] | undefined {
      const array = lens.getOption ( f )
      if ( array )
        if ( index >= array.length ) throw new Error ( `nthRef of ${name} maps to ${index} which is too big (> ${array.length})` )
        else
          return array
    }
    const getter = ( f: From ) => (lens.getOption ( f ))?.[ findIndex ( f ) ];
    function setter ( f: From, t: T ): From {
      const index = findIndex ( f )
      const array = lens.getOption ( f )
      const res = [ ...array ]
      res[ index ] = t
      return lens.set ( f, res )
    }
    return new Lens<From, T> ( getter, setter, description ? description : `${lens.description}.{${name}}` )
  }


  static constant = <Main, Child> ( value: Child, description?: string ): Lens<Main, Child> => lens ( m => value, ( m, c ) => m, description );

  static safeList<T> (): Lens<T[] | undefined, T[]> {
    return lens<T[] | undefined, T[]> (
      ( list: T[] | undefined ) => list ? list : [],
      ( main: T[] | undefined, list: T[] ) => list,
      'removeUndefined'
    )
  }
}


export function prism<Main, Child> ( getOption: ( m: Main ) => Child | undefined, reverseGet: ( c: Child ) => Main, description?: string ): Prism<Main, Child> {
  return new Prism ( getOption, reverseGet, description ? description : "prism" )
}

export function dirtyPrism<Main, Child> ( getOption: ( m: Main ) => Child | undefined, reverseGet: ( c: Child ) => Main, description?: string ): DirtyPrism<Main, Child> {
  return new DirtyPrism ( getOption, reverseGet, description ? description : "prism" )
}

export class DirtyPrism<Main, Child> extends Optional<Main, Child> {
  reverseGet: ( c: Child ) => Main

  constructor ( getOption: ( m: Main ) => (Child | undefined), reverseGet: ( c: Child ) => Main, description: string ) {
    super ( getOption, ( m, c ) => reverseGet ( c ), description );
    this.reverseGet = reverseGet;
  }

  toString () {
    return "DirtyPrism(" + this.description + ")"
  }

}

export class Prism<Main, Child> extends DirtyPrism<Main, Child> {

  constructor ( getOption: ( m: Main ) => (Child | undefined), reverseGet: ( c: Child ) => Main, description: string ) {
    super ( getOption, reverseGet, description );
  }

  toString () {
    return "Prims(" + this.description + ")"
  }

}

export function iso<Main, Child> ( get: ( m: Main ) => Child, reverseGet: ( c: Child ) => Main, description?: string ): Iso<Main, Child> {
  return new Iso ( get, reverseGet, description ? description : "iso" )
}

export class Iso<Main, Child> extends Lens<Main, Child> {
  reverseGet: ( c: Child ) => Main
  optional: Optional<Main, Child>

  constructor ( get: ( m: Main ) => Child, reverseGet: ( c: Child ) => Main, description: string ) {
    super ( get, ( m, c ) => reverseGet ( c ), description );
    this.reverseGet = reverseGet;
    this.optional = new Optional<Main, Child> ( get, ( s, c ) => reverseGet ( c ) )
  }


  toString () {
    return "Iso(" + this.description + ")"
  }

}

/** This 'changes' two parts of Main simultaneously.
 *
 * @param lens1 This is focused in on a part of main that we want to change
 * @param lens2 This is focused in on a second part of main that we want to change
 * @param fn1  Given the old values that lens1 and lens2 are focused on, this gives us a new value for the part of main that lens1 is focused on
 * @param fn2  Given the old values that lens1 and lens2 are focused on, this gives us a new value for the part of main that lens2 is focused on
 * @returns a function that given a Main will return a new main with the two functions used to modify the parts of Main that the two lens are focused in on
 *
 */
export const transformTwoValues = <Main, C1, C2> ( lens1: Optional<Main, C1>, lens2: Optional<Main, C2> ) => ( fn1: ( c1: C1, c2: C2 ) => C1, fn2: ( c1: C1, c2: C2 ) => C2 ) => ( main: Main ): Main => {
  let c1 = lens1.getOption ( main )
  let c2 = lens2.getOption ( main )
  return c1 && c2 ? lens1.set ( lens2.set ( main, fn2 ( c1, c2 ) ), fn1 ( c1, c2 ) ) : main
}

/** This 'changes' two parts of Main simultaneously.
 *
 * @param lens1 This is focused in on a part of main that we want to change
 * @param lens2 This is focused in on a second part of main that we want to change
 * @param main  A value that is to be 'changed' by the method. Changed means that we will make a copy of it with changes
 * @param c1  The new value for the part that lens1 is focused on
 * @param c2  The new value for the part that lens2 is focused on
 * @returns a new main with the parts the two lens are focused on changed by the new values
 *
 */
export const updateTwoValues = <Main, C1, C2> ( lens1: Optional<Main, C1>, lens2: Optional<Main, C2> ) => ( main: Main, c1: C1, c2: C2 ): Main =>
  lens1.set ( lens2.set ( main, c2 ), c1 )


/** This 'changes' three parts of Main simultaneously.
 *
 * @param lens1 This is focused in on a part of main that we want to change
 * @param lens2 This is focused in on a second part of main that we want to change
 * @param lens3 This is focused in on a third part of main that we want to change
 * @param main  A value that is to be 'changed' by the method. Changed means that we will make a copy of it with changes
 * @param c1  The new value for the part that lens1 is focused on
 * @param c2  The new value for the part that lens2 is focused on
 * @param c3  The new value for the part that lens3 is focused on
 * @returns a new main with the parts the three lens are focused on changed by the new values
 *
 */
export const updateThreeValues = <Main, C1, C2, C3> ( lens1: Optional<Main, C1>, lens2: Optional<Main, C2>, lens3: Optional<Main, C3> ) =>
  ( main: Main, c1: C1, c2: C2, c3: C3 ): Main => lens1.set ( lens2.set ( lens3.set ( main, c3 ), c2 ), c1 )


export function nthItem<T> ( n: number ): Optional<T[], T> {
  return new Optional<T[], T> (
    t => t[ n ],
    ( arr, t ) => {
      let result = [ ...arr ]
      result[ n ] = t
      return result
    }, "nth(" + n + ")"
  )
}
export function firstIn2<T1, T2> (): Optional<[ T1, T2 ], T1> {
  return new Optional ( arr => arr[ 0 ], ( arr, t1 ) => [ t1, arr[ 1 ] ], "firstIn2" )
}

export function secondIn2<T1, T2> (): Optional<[ T1, T2 ], T2> {
  return new Optional ( arr => arr[ 1 ], ( arr, t2 ) => [ arr[ 0 ], t2 ], "secondIn2" )
}


export type Transform<Main, Child> = [ Optional<Main, Child>, ( c: Child | undefined ) => Child ]
export function massTransform<Main> ( main: Main, ...transforms: Transform<Main, any>[] ): Main {
  return transforms.reduce<Main> ( ( acc, c ) => c[ 0 ].set ( acc, c[ 1 ] ( c[ 0 ].getOption ( acc ) ) ), main )
}

