//Copyright (c)2020-2022 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS

import { HasOptional, Lens, Lenses, massTransform, Optional, Transform, transformTwoValues, updateTwoValues } from "@focuson/lens";


export interface LensProps<Main, T, Context> {
  state: LensState<Main, T, Context>
}

type SetJsonReasonEvent = 'onClick' | 'onChange' | 'textChanged'
/** The reason we changed the json if it was a component event */
export interface SetJsonReasonForComponent {
  component?: string;
  id?: string;
  event: SetJsonReasonEvent
  comment?: string;
}
export function reasonFor ( component: string, event: SetJsonReasonEvent, id?: string, comment?: string ): SetJsonReasonForComponent {
  return ({ component, id, event, comment })
}
export const lensState = <Main, Context> ( main: Main, setMain: ( m: Main, reason: any ) => void, description: string, context: Context ): LensState<Main, Main, Context> =>
  new LensState ( main, setMain, Lenses.identity<Main> ().withDescription ( description ), context );

export function defineState<Main, T, Context> ( state: LensState<Main, T | undefined, Context> ): LensState<Main, T, Context> {
  return state.chainLens ( Lenses.define<T> () )
}

function getOr<Main, Child> ( optional: Optional<Main, Child>, main: Main, errorMessageIfNotHere?: () => string ): Child {
  let result = optional.getOption ( main )
  if ( result == undefined ) {
    if ( errorMessageIfNotHere ) throw errorMessageIfNotHere ()
    throw Error ( `Cannot access json as doesn't exist ${optional}}` )
  }
  return result

}

export interface SetJsonReason {
  reason: any;
  json: any;
  lens: string;
}
export function isSetJsonReason ( reason: any ): reason is SetJsonReason {
  return reason && reason?.reason !== undefined && reason?.json !== undefined && reason?.lens !== undefined
}
export interface MassTransformReason {
  reason: any;
  txLens: [ string, any ] []; // the description of the lens and the value that will be put there.
}
export function isMassTransformReason ( reason: any ): reason is MassTransformReason {
  return reason && reason.reason !== undefined && reason.txLens !== undefined// && Array.isArray ( reason.txLens )
}

export class LensState<Main, T, Context> implements HasOptional<Main, T> {
  /** The full state. This should normally not be called by your code. */
  main: Main;

  /** For dependency injection. Often holds things like 'page config' and/or 'commonly used lens like page selection' */
  context: Context;

  /** This should probably not be called by your code. Normally you will use 'setJson' or 'setFromTwo' (if you need to update two parts at the same time */
  dangerouslySetMain: ( m: Main, reason: any ) => void

  /** This is focused on the thing we are interested it. The 'optional' means that 'maybe the json isn't there...
   * for example if we walk down a data structure and there is a field 'x | undefined' then perhaps x isn't there. But we still
   * want to talk about it. This is similar to 'a?.x' in normal javascript/typescript' */
  optional: Optional<Main, T>


  constructor ( main: Main, setMain: ( m: Main, reason: any ) => void, lens: Optional<Main, T>, context: Context ) {
    this.main = main;
    this.dangerouslySetMain = setMain;
    this.optional = lens
    this.context = context
  }

  /** If just 'walking down the json' using field names this is great. The parameter 'fieldName' is a 'key' of the current focused place,
   * and this returns a new context focused on the json under the field name */
  focusOn<K extends keyof T, Req extends Required<T>> ( k: K ): LensState<Main, Req[K], Context> {
    return this.copyWithLens ( this.optional.focusQuery ( k ) )
  }

  /** When we want to focus on something like 'the nth item' then 'withChildLens' is used. This returns a context focused on the block of json under the lens starting from 'here' */
  chainLens<NewT> ( lens: Optional<T, NewT> ): LensState<Main, NewT, Context> {
    return new LensState ( this.main, this.dangerouslySetMain, this.optional.chain ( lens ), this.context )
  }


  /** When we want to focus on something like 'the nth item' then 'withChildLens' is used. This returns a context focused on the block of json under the lens passed in */
  copyWithLens<NewT> ( lens: Optional<Main, NewT> ): LensState<Main, NewT, Context> {
    return new LensState ( this.main, this.dangerouslySetMain, lens, this.context )
  }
  copyWithIdentity (): LensState<Main, Main, Context> {
    return new LensState ( this.main, this.dangerouslySetMain, Lenses.identity (), this.context )

  }

  /** The json that this context is focused on */
  json = ( errorMessageIfNotHere?: () => string ): T =>
    getOr ( this.optional, this.main, () =>
      errorMessageIfNotHere ? errorMessageIfNotHere () : `Trying to get json from ${this.optional.description} and it is not present` );

  /** The json that this context is focused on */
  optJson (): T | undefined {
    return this.optional.getOption ( this.main )
  }
  /** The json that this context is focused on */
  optJsonOr ( t: T ): T {
    let result = this.optional.getOption ( this.main );
    return result ? result : t
  }

  /** How we edit the json that this is focused on: we call setJson and that will make a new main json with the bit passed in placing the json that we are focused on
   *
   * Very often the LensContext is being used in a flux pattern (for example with react) and this method will cause other things to happen (like re-rendering) */
  setJson ( json: T, reason: any ) {
    const result = this.optional.setOption ( this.main, json );
    if ( result === undefined ) {
      console.log ( "failure in setJson- main", this.main )
      console.log ( "failure in setJson- lens", this.optional.description )
      console.log ( "failure in setJson- json", json )
      throw new Error ( `Tried and failed to set Json. Lens is ${this.optional.description} json ${JSON.stringify ( json )}` )
    }
    const r: SetJsonReason = { reason, json, lens: this.optional.description }
    this.dangerouslySetMain ( result, r )
  }

  chainNthFromPath ( state: LensState<Main, number, Context> ): LensState<Main, any, Context> {
    // @ts-ignore We have to ignore because typescript doesn't allow type guards Main here is a T[]... we just have no way to prove it
    return this.copyWithLens(Lenses.calculatedNth ( state.optional, this.optional ))
  }
  /** 'Modify' the stored json. If the json is undefined, then 'nothing happen' (just like a map)` */
  transform ( fn: ( json: T ) => T, reason: any ) {
    const j = this.optional.getOption ( this.main )
    if ( j ) this.setJson ( fn ( j ), reason )
  }

  addSecond<T2> ( lens2: Optional<Main, T2> ): LensState2<Main, T, T2, Context> {
    return new LensState2 ( this.main, this.optional, lens2, this.dangerouslySetMain, this.context )
  }

  doubleUp (): LensState2<Main, T, T, Context> {
    return this.addSecond ( this.optional )
  }

  massTransform ( reason: any ): ( ...ts: Transform<Main, any>[] ) => void {
    return ( ...ts: Transform<Main, any>[] ) => {
      const r: MassTransformReason = ({
        reason,
        txLens: ts.map ( t => [ t[ 0 ].description, t[ 1 ] ( t[ 0 ].getOption ( this.main ) ) ] )
      })
      const newMain = ts.reduce ( ( acc, tx, i ) => {
        try {
          return tx[ 0 ].setOption ( acc, r.txLens[ i ][ 1 ] )
        }catch (e: any){
          console.error(`had error in mass transform with ${tx[0]?.description}`, tx)
        }
      }, this.main )
      this.dangerouslySetMain ( newMain, r );
    }
  }

  useOtherAsWell<T2> ( lens: Optional<Main, T2> ) {
    let parent = this
    return new class extends WithTwoLens<Main, T, T2> {
      setTwoValues ( t: T | undefined, t2: T2 | undefined, reason: any ): void {
        parent.dangerouslySetMain ( updateTwoValues ( parent.optional, lens ) ( parent.main, t, t2 ), reason )
      }

      transformTwoValues ( fn1: ( t1: T, t2: T2 ) => T | undefined, fn2: ( t1: T, t2: T2 ) => T2 | undefined, reason: any ): void {
        parent.dangerouslySetMain ( transformTwoValues ( parent.optional, lens ) ( fn1, fn2 ) ( parent.main ), reason )
      }

      transformFocused ( fn1: ( t1: T, t2: T2 ) => T | undefined ): WithTwoLensAndOneTransformFn<Main, T, T2> {
        return new class extends WithTwoLensAndOneTransformFn<Main, T, T2> {
          andTransformOther ( fn2: ( t1: T, t2: T2 ) => T2, reason: any ): void {
            parent.dangerouslySetMain ( transformTwoValues ( parent.optional, lens ) ( fn1, fn2 ) ( parent.main ), reason )
          }
        }
      }

    }
  }
}

export abstract class WithTwoLens<Main, T1, T2> {
  public abstract setTwoValues ( t1: T1, t2: T2, reason: any ): void

  public abstract transformTwoValues ( fn1: ( t1: T1, t2: T2 ) => T1, fn2: ( t1: T1, t2: T2 ) => T2, reason: any ): void

  public abstract transformFocused ( fn1: ( t1: T1, t2: T2 ) => T1, reason: any ): WithTwoLensAndOneTransformFn<Main, T1, T2>
}

export abstract class WithTwoLensAndOneTransformFn<Main, T1, T2> {
  public abstract andTransformOther ( fn2: ( t1: T1, t2: T2 ) => T2, reason: any ): void
}

export let focusOnNth = <Main, T, Context> ( state: LensState<Main, T[], Context>, n: number ) => state.chainLens ( Lenses.nth ( n ) );
export let focus1OnNth = <Main, T1, T2, Context> ( state: LensState2<Main, T1[], T2, Context>, n: number ) => state.chain1 ( Lenses.nth ( n ) );
export let focus2OnNth = <Main, T1, T2, Context> ( state: LensState2<Main, T1, T2[], Context>, n: number ) => state.chain2 ( Lenses.nth ( n ) );


/** When using the lens context in a flux pattern (for example with react) if you have a long transformation on the 'main' (for example you call a pricing engine or similar,
 * then you can use this.
 * @param description Purely for debugging and testing. Will typically be 'root' or the string for the 'Main' type
 * @param fn The function that creates a thing (for example a react component) given a context
 * @param transformJson a function that transforms the main json before it is sent back to the 'fn'
 * @param context for dependency inject. Carries things like 'commonly used lens'
 */
export const setJsonWithLongTransformation = <Main, Context> ( description: string, context: Context, fn: ( lc: LensState<Main, Main, Context> ) => void,
                                                               transformJson: ( m: Main ) => Promise<Main> = m => Promise.resolve ( m ) ): ( m: Main ) => void =>
  ( main: Main ) => transformJson ( main ).then ( processedMain => fn ( lensState ( processedMain, setJsonWithLongTransformation ( description, context, fn, transformJson ), description, context ) ) )


/** This is the simplest 'flux' pattern (for example we use it with react).
 * @param description Purely for debugging and testing. Will typically be 'root' or the string for the 'Main' type
 * @param fn The function that creates a thing (for example a react component) given a context
 */

export function setJsonForFlux<Main, Result, Context> ( description: string, context: Context, fn: ( lc: LensState<Main, Main, Context> ) => Result ): ( m: Main ) => Result {
  return ( main: Main ) => fn ( lensState<Main, Context> ( main, setJsonForFlux<Main, Result, Context> ( description, context, fn ), description, context ) )
}

export function getElement ( name: string ): HTMLElement {
  let result = document.getElementById ( name );
  if ( result === null ) throw Error ( `Must have an element called ${name}, and can't find it` )
  return result
}


export class LensState2<Main, T1, T2, Context> {
  main: Main
  lens1: Optional<Main, T1>
  lens2: Optional<Main, T2>
  context: Context
  dangerouslySetMain: ( m: Main, reason: any ) => void

  constructor ( main: Main, lens1: Optional<Main, T1>, lens2: Optional<Main, T2>, dangerouslySetMain: ( m: Main, reason: any ) => void, context: Context ) {
    this.main = main;
    this.lens1 = lens1;
    this.lens2 = lens2;
    this.dangerouslySetMain = dangerouslySetMain;
    this.context = context
  }

  addThird<T3> ( lens: Lens<Main, T3> ) {
    return new LensState3<Main, T1, T2, T3, Context> ( this.main, this.lens1, this.lens2, lens, this.dangerouslySetMain, this.context )
  }

  state1 (): LensState<Main, T1, Context> {
    return new LensState<Main, T1, Context> ( this.main, this.dangerouslySetMain, this.lens1, this.context )
  }

  json1 ( errorMessageIfNotHere?: () => string ): T1 {
    return getOr ( this.lens1, this.main, errorMessageIfNotHere )
  }

  optJson1 (): T1 | undefined {
    return this.lens1.getOption ( this.main )
  }

  chain1<Child> ( lens: Optional<T1, Child> ) {
    return new LensState2 ( this.main, this.lens1.chain ( lens ), this.lens2, this.dangerouslySetMain, this.context )
  }
  withLens1<Child> ( lens: Optional<Main, Child> ) {
    return new LensState2 ( this.main, lens, this.lens2, this.dangerouslySetMain, this.context )
  }

  focus1On<K extends keyof T1, Req extends Required<T1>> ( k: K ): LensState2<Main, Req[K], T2, Context> {
    // @ts-ignore
    return new LensState2<Main, T1[K], T2> ( this.main, this.lens1.focusQuery ( k ), this.lens2, this.dangerouslySetMain, this.context )
  }

  state2 (): LensState<Main, T2, Context> {
    return new LensState<Main, T2, Context> ( this.main, this.dangerouslySetMain, this.lens2, this.context )
  }

  json2 ( errorMessageIfNotHere?: () => string ): T2 {
    return getOr ( this.lens2, this.main, errorMessageIfNotHere )
  }

  optJson2 (): T2 | undefined {
    return this.lens2.getOption ( this.main )
  }

  focus2On<K extends keyof T2, Req extends Required<T2>> ( k: K ): LensState2<Main, T1, Req[K], Context> {
    return new LensState2 ( this.main, this.lens1, this.lens2.focusQuery ( k ), this.dangerouslySetMain, this.context );
  }

  chain2<Child> ( lens: Optional<T2, Child> ) {
    return new LensState2 ( this.main, this.lens1, this.lens2.chain ( lens ), this.dangerouslySetMain, this.context )
  }
  withLens2<Child> ( lens: Optional<Main, Child> ) {
    return new LensState2 ( this.main, this.lens1, lens, this.dangerouslySetMain, this.context )
  }

  setJson ( t1: T1, t2: T2, reason: any ) {
    this.dangerouslySetMain ( this.lens2.set ( this.lens1.set ( this.main, t1 ), t2 ), reason )
  }

  transformJson ( fn1: ( t1: T1 ) => T1, fn2: ( t2: T2 ) => T2, reason: any ) {
    this.dangerouslySetMain ( this.lens1.transform ( fn1 ) ( this.lens2.transform ( fn2 ) ( this.main ) ), reason )
  }

  transformJson2 ( fn1: ( t1: T1, t2: T2 ) => T1, fn2: ( t1: T1, t2: T2 ) => T2, reason: any, errorMessageIfNotThere?: () => string ) {
    let t1 = getOr ( this.lens1, this.main, errorMessageIfNotThere );
    let t2 = getOr ( this.lens2, this.main, errorMessageIfNotThere )
    this.dangerouslySetMain ( this.lens1.set ( this.lens2.set ( this.main, fn2 ( t1, t2 ) ), fn1 ( t1, t2 ) ), reason )
  }

}

export class LensState3<Main, T1, T2, T3, Context> {
  main: Main
  lens1: Optional<Main, T1>
  lens2: Optional<Main, T2>
  lens3: Optional<Main, T3>
  dangerouslySetMain: ( m: Main, reason: any ) => void
  context: Context

  constructor ( main: Main, lens1: Optional<Main, T1>, lens2: Optional<Main, T2>, lens3: Optional<Main, T3>, dangerouslySetMain: ( m: Main, reason: any ) => void, context: Context ) {
    this.main = main;
    this.lens1 = lens1;
    this.lens2 = lens2;
    this.lens3 = lens3;
    this.dangerouslySetMain = dangerouslySetMain;
    this.context = context
  }

  state1 (): LensState<Main, T1, Context> {
    return new LensState<Main, T1, Context> ( this.main, this.dangerouslySetMain, this.lens1, this.context )
  }

  json1 ( errorMessageIfNotThere?: () => string ): T1 {
    return getOr ( this.lens1, this.main, errorMessageIfNotThere )
  }

  optJson1 (): T1 | undefined {
    return this.lens1.getOption ( this.main )
  }

  focus1On<K extends keyof T1, Req extends Required<T1>> ( k: K ): LensState3<Main, Req[K], T2, T3, Context> {
    return new LensState3 ( this.main, this.lens1.focusQuery ( k ), this.lens2, this.lens3, this.dangerouslySetMain, this.context )
  }

  chain1<Child> ( lens: Lens<T1, Child> ) {
    return new LensState3 ( this.main, this.lens1.chain ( lens ), this.lens2, this.lens3, this.dangerouslySetMain, this.context )
  }
  withLens1<Child> ( lens: Optional<Main, Child> ) {
    return new LensState3 ( this.main, lens, this.lens2, this.lens3, this.dangerouslySetMain, this.context )
  }

  state2 (): LensState<Main, T2, Context> {
    return new LensState<Main, T2, Context> ( this.main, this.dangerouslySetMain, this.lens2, this.context )
  }

  json2 ( errorMessageIfNotThere?: () => string ): T2 {
    return getOr ( this.lens2, this.main, errorMessageIfNotThere )
  }

  optJson2 (): T2 | undefined {
    return this.lens2.getOption ( this.main )
  }

  focus2On<K extends keyof T2, Req extends Required<T2>> ( k: K ): LensState3<Main, T1, Req[K], T3, Context> {
    return new LensState3 ( this.main, this.lens1, this.lens2.focusQuery ( k ), this.lens3, this.dangerouslySetMain, this.context );
  }

  chain2<Child> ( lens: Optional<T2, Child> ) {
    return new LensState3 ( this.main, this.lens1, this.lens2.chain ( lens ), this.lens3, this.dangerouslySetMain, this.context )
  }
  withLens2<Child> ( lens: Optional<Main, Child> ) {
    return new LensState3 ( this.main, this.lens1, lens, this.lens3, this.dangerouslySetMain, this.context )
  }

  state3 (): LensState<Main, T3, Context> {
    return new LensState<Main, T3, Context> ( this.main, this.dangerouslySetMain, this.lens3, this.context )
  }

  json3 ( errorMessageIfNotThere?: () => string ): T3 {
    return getOr ( this.lens3, this.main, errorMessageIfNotThere )
  }

  optJson3 (): T3 | undefined {
    return this.lens3.getOption ( this.main )
  }

  focus3On<K extends keyof T3, Req extends Required<T3>> ( k: K ): LensState3<Main, T1, T2, Req[K], Context> {
    return new LensState3 ( this.main, this.lens1, this.lens2, this.lens3.focusQuery ( k ), this.dangerouslySetMain, this.context );
  }

  chainLens3<Child> ( lens: Lens<T3, Child> ) {
    return new LensState3 ( this.main, this.lens1, this.lens2, this.lens3.chain ( lens ), this.dangerouslySetMain, this.context )
  }
  withLens3<Child> ( lens: Optional<Main, Child> ) {
    return new LensState3 ( this.main, this.lens1, this.lens2, lens, this.dangerouslySetMain, this.context )
  }

  setJson ( t1: T1, t2: T2, t3: T3, reason: any ) {
    this.dangerouslySetMain ( this.lens3.set ( this.lens2.set ( this.lens1.set ( this.main, t1 ), t2 ), t3 ), reason )
  }

  transformJson ( fn1: ( t1: T1 ) => T1, fn2: ( t2: T2 ) => T2, fn3: ( t3: T3 ) => T3, reason: any ) {
    this.dangerouslySetMain ( this.lens1.transform ( fn1 ) ( this.lens2.transform ( fn2 ) ( this.lens3.transform ( fn3 ) ( this.main ) ) ), reason )
  }

  transformJson3 ( fn1: ( t1: T1, t2: T2, t3: T3 ) => T1, fn2: ( t1: T1, t2: T2, t3: T3 ) => T2, fn3: ( t1: T1, t2: T2, t3: T3 ) => T3, reason: any, errorMessageIfNotThere?: () => string ) {
    let t1 = getOr ( this.lens1, this.main, errorMessageIfNotThere )
    let t2 = getOr ( this.lens2, this.main, errorMessageIfNotThere )
    let t3 = getOr ( this.lens3, this.main, errorMessageIfNotThere )
    this.dangerouslySetMain ( this.lens1.set ( this.lens2.set ( this.lens3.set ( this.main, fn3 ( t1, t2, t3 ) ), fn2 ( t1, t2, t3 ) ), fn1 ( t1, t2, t3 ) ), reason )
  }

}


export interface LensProps2<Main, T1, T2, Context> {
  state: LensState2<Main, T1, T2, Context>
}

