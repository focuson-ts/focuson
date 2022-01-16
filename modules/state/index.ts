//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS

import {Lens, Lenses, transformTwoValues, updateTwoValues} from "@focuson/lens";
import {Optional} from "../lens";

export interface LensProps<Main, T> {
    state: LensState<Main, T>
}


export const lensState = <Main>(main: Main, setMain: (m: Main) => void, description: string): LensState<Main, Main> =>
    new LensState(main, setMain, Lenses.identity<Main>().withDescription(description));

export function defineState<Main, T>(state: LensState<Main, T | undefined>): LensState<Main, T> {
    return state.chainLens(Lenses.define<T>())
}

function getOr<Main, Child>(optional: Optional<Main, Child>, main: Main, errorMessageIfNotHere?: () => string): Child {
    let result = optional.getOption(main)
    if (result == undefined) {
        if (errorMessageIfNotHere) throw errorMessageIfNotHere()
        throw Error(`Cannot access json as doesn't exist ${optional}}`)
    }
    return result

}

export class LensState<Main, T> {
    /** The full state. This should normally not be called by your code. */
    main: Main

    /** This should probably not be called by your code. Normally you will use 'setJson' or 'setFromTwo' (if you need to update two parts at the same time */
    dangerouslySetMain: (m: Main) => void

    /** This is focused on the thing we are interested it. The 'optional' means that 'maybe the json isn't there...
     * for example if we walk down a data structure and there is a field 'x | undefined' then perhaps x isn't there. But we still
     * want to talk about it. This is similar to 'a?.x' in normal javascript/typescript' */
    optional: Optional<Main, T>


    constructor(main: Main, setMain: (m: Main) => void, lens: Optional<Main, T>) {
        this.main = main;
        this.dangerouslySetMain = setMain;
        this.optional = lens
    }

    /** If just 'walking down the json' using field names this is great. The parameter 'fieldName' is a 'key' of the current focused place,
     * and this returns a new context focused on the json under the field name */
    focusOn<K extends keyof T, Req extends Required<T>>(k: K): LensState<Main, Req[K]> {
        return this.copyWithLens(this.optional.focusQuery(k))
    }

    /** When we want to focus on something like 'the nth item' then 'withChildLens' is used. This returns a context focused on the block of json under the lens starting from 'here' */
    chainLens<NewT>(lens: Optional<T, NewT>): LensState<Main, NewT> {
        return new LensState(this.main, this.dangerouslySetMain, this.optional.chain(lens))
    }

    /** When we want to focus on something like 'the nth item' then 'withChildLens' is used. This returns a context focused on the block of json under the lens passed in */
    copyWithLens<NewT>(lens: Optional<Main, NewT>): LensState<Main, NewT> {
        return new LensState(this.main, this.dangerouslySetMain, lens)
    }

    /** The json that this context is focused on */
    json(errorMessageIfNotHere?: () => string): T {
        return getOr(this.optional, this.main, errorMessageIfNotHere)
    }

    /** The json that this context is focused on */
    optJson(): T | undefined {
        return this.optional.getOption(this.main)
    }

    /** How we edit the json that this is focused on: we call setJson and that will make a new main json with the bit passed in placing the json that we are focused on
     *
     * Very often the LensContext is being used in a flux pattern (for example with react) and this method will cause other things to happen (like re-rendering) */
    setJson(json: T) {
        this.dangerouslySetMain(this.optional.set(this.main, json))
    }


    /** 'Modify' the stored json. If the json is undefined, then 'nothing happen' (just like a map)` */
    transform(fn: (json: T) => T) {
        const j = this.optional.getOption(this.main)
        if (j) this.setJson(fn(j))
    }

    addSecond<T2>(lens2: Optional<Main, T2>): LensState2<Main, T, T2> {
        return new LensState2(this.main, this.optional, lens2, this.dangerouslySetMain)
    }

    doubleUp(): LensState2<Main, T, T> {
        return this.addSecond(this.optional)
    }

    useOtherAsWell<T2>(lens: Optional<Main, T2>) {
        let parent = this
        return new class extends WithTwoLens<Main, T, T2> {
            setTwoValues(t: T, t2: T2): void {
                parent.dangerouslySetMain(updateTwoValues(parent.optional, lens)(parent.main, t, t2))
            }

            transformTwoValues(fn1: (t1: T, t2: T2) => T, fn2: (t1: T, t2: T2) => T2): void {
                parent.dangerouslySetMain(transformTwoValues(parent.optional, lens)(fn1, fn2)(parent.main))
            }

            transformFocused(fn1: (t1: T, t2: T2) => T): WithTwoLensAndOneTransformFn<Main, T, T2> {
                return new class extends WithTwoLensAndOneTransformFn<Main, T, T2> {
                    andTransformOther(fn2: (t1: T, t2: T2) => T2): void {
                        parent.dangerouslySetMain(transformTwoValues(parent.optional, lens)(fn1, fn2)(parent.main))
                    }
                }
            }

        }
    }
}

export abstract class WithTwoLens<Main, T1, T2> {
    public abstract setTwoValues(t1: T1, t2: T2): void

    public abstract transformTwoValues(fn1: (t1: T1, t2: T2) => T1, fn2: (t1: T1, t2: T2) => T2): void

    public abstract transformFocused(fn1: (t1: T1, t2: T2) => T1): WithTwoLensAndOneTransformFn<Main, T1, T2>
}

export abstract class WithTwoLensAndOneTransformFn<Main, T1, T2> {
    public abstract andTransformOther(fn2: (t1: T1, t2: T2) => T2): void
}

export let focusOnNth = <Main, T>(state: LensState<Main, T[]>, n: number) => state.chainLens(Lenses.nth(n));
export let focus1OnNth = <Main, T1, T2>(state: LensState2<Main, T1[], T2>, n: number) => state.chain1(Lenses.nth(n));
export let focus2OnNth = <Main, T1, T2>(state: LensState2<Main, T1, T2[]>, n: number) => state.chain2(Lenses.nth(n));


/** When using the lens context in a flux pattern (for example with react) if you have a long transformation on the 'main' (for example you call a pricing engine or similar,
 * then you can use this.
 * @param description Purely for debugging and testing. Will typically be 'root' or the string for the 'Main' type
 * @param fn The function that creates a thing (for example a react component) given a context
 * @param transformJson a function that transforms the main json before it is sent back to the 'fn'
 */
export const setJsonWithLongTransformation = <Main>(description: string, fn: (lc: LensState<Main, Main>) => void,
                                                    transformJson: (m: Main) => Promise<Main> = m => Promise.resolve(m)): (m: Main) => void =>
    (main: Main) => transformJson(main).then(processedMain => fn(lensState(processedMain, setJsonWithLongTransformation(description, fn, transformJson), description)))


/** This is the simplest 'flux' pattern (for example we use it with react).
 * @param description Purely for debugging and testing. Will typically be 'root' or the string for the 'Main' type
 * @param fn The function that creates a thing (for example a react component) given a context
 */

export function setJsonForFlux<Main, Result>(description: string, fn: (lc: LensState<Main, Main>) => Result): (m: Main) => Result {
    return (main: Main) => fn(lensState<Main>(main, setJsonForFlux<Main, Result>(description, fn), description))
}

export function getElement(name: string): HTMLElement {
    let result = document.getElementById(name);
    if (result === null) throw Error(`Must have an element called ${name}, and can't find it`)
    return result
}


export class LensState2<Main, T1, T2> {
    main: Main
    lens1: Optional<Main, T1>
    lens2: Optional<Main, T2>
    dangerouslySetMain: (m: Main) => void

    constructor(main: Main, lens1: Optional<Main, T1>, lens2: Optional<Main, T2>, dangerouslySetMain: (m: Main) => void) {
        this.main = main;
        this.lens1 = lens1;
        this.lens2 = lens2;
        this.dangerouslySetMain = dangerouslySetMain;
    }

    addThird<T3>(lens: Lens<Main, T3>) {
        return new LensState3<Main, T1, T2, T3>(this.main, this.lens1, this.lens2, lens, this.dangerouslySetMain)
    }

    state1(): LensState<Main, T1> {
        return new LensState<Main, T1>(this.main, this.dangerouslySetMain, this.lens1)
    }

    json1(errorMessageIfNotHere?: () => string): T1 {
        return getOr(this.lens1, this.main, errorMessageIfNotHere)
    }

    optJson1(): T1 | undefined {
        return this.lens1.getOption(this.main)
    }

    chain1<Child>(lens: Optional<T1, Child>) {
        return new LensState2(this.main, this.lens1.chain(lens), this.lens2, this.dangerouslySetMain)
    }

    focus1On<K extends keyof T1, Req extends Required<T1>>(k: K): LensState2<Main, Req[K], T2> {
        // @ts-ignore
        return new LensState2<Main, T1[K], T2>(this.main, this.lens1.focusQuery(k), this.lens2, this.dangerouslySetMain)
    }

    state2(): LensState<Main, T2> {
        return new LensState<Main, T2>(this.main, this.dangerouslySetMain, this.lens2)
    }

    json2(errorMessageIfNotHere?: () => string): T2 {
        return getOr(this.lens2, this.main, errorMessageIfNotHere)
    }

    optJson2(): T2 | undefined {
        return this.lens2.getOption(this.main)
    }

    focus2On<K extends keyof T2, Req extends Required<T2>>(k: K): LensState2<Main, T1, Req[K]> {
        return new LensState2(this.main, this.lens1, this.lens2.focusQuery(k), this.dangerouslySetMain);
    }

    chain2<Child>(lens: Optional<T2, Child>) {
        return new LensState2(this.main, this.lens1, this.lens2.chain(lens), this.dangerouslySetMain)
    }

    setJson(t1: T1, t2: T2) {
        this.dangerouslySetMain(this.lens2.set(this.lens1.set(this.main, t1), t2))
    }

    transformJson(fn1: (t1: T1) => T1, fn2: (t2: T2) => T2) {
        this.dangerouslySetMain(this.lens1.transform(fn1)(this.lens2.transform(fn2)(this.main)))
    }

    transformJson2(fn1: (t1: T1, t2: T2) => T1, fn2: (t1: T1, t2: T2) => T2, errorMessageIfNotThere?: () => string) {
        let t1 = getOr(this.lens1, this.main, errorMessageIfNotThere);
        let t2 = getOr(this.lens2, this.main, errorMessageIfNotThere)
        this.dangerouslySetMain(this.lens1.set(this.lens2.set(this.main, fn2(t1, t2)), fn1(t1, t2)))
    }

}

export class LensState3<Main, T1, T2, T3> {
    main: Main
    lens1: Optional<Main, T1>
    lens2: Optional<Main, T2>
    lens3: Optional<Main, T3>
    dangerouslySetMain: (m: Main) => void

    constructor(main: Main, lens1: Optional<Main, T1>, lens2: Optional<Main, T2>, lens3: Optional<Main, T3>, dangerouslySetMain: (m: Main) => void) {
        this.main = main;
        this.lens1 = lens1;
        this.lens2 = lens2;
        this.lens3 = lens3;
        this.dangerouslySetMain = dangerouslySetMain;
    }

    state1(): LensState<Main, T1> {
        return new LensState<Main, T1>(this.main, this.dangerouslySetMain, this.lens1)
    }

    json1(errorMessageIfNotThere?: () => string): T1 {
        return getOr(this.lens1, this.main, errorMessageIfNotThere)
    }

    optJson1(): T1 | undefined {
        return this.lens1.getOption(this.main)
    }

    focus1On<K extends keyof T1, Req extends Required<T1>>(k: K): LensState3<Main, Req[K], T2, T3> {
        return new LensState3(this.main, this.lens1.focusQuery(k), this.lens2, this.lens3, this.dangerouslySetMain)
    }

    chain1<Child>(lens: Lens<T1, Child>) {
        return new LensState3(this.main, this.lens1.chain(lens), this.lens2, this.lens3, this.dangerouslySetMain)
    }

    state2(): LensState<Main, T2> {
        return new LensState<Main, T2>(this.main, this.dangerouslySetMain, this.lens2)
    }

    json2(errorMessageIfNotThere?: () => string): T2 {
        return getOr(this.lens2, this.main, errorMessageIfNotThere)
    }

    optJson2(): T2 | undefined {
        return this.lens2.getOption(this.main)
    }

    focus2On<K extends keyof T2, Req extends Required<T2>>(k: K): LensState3<Main, T1, Req[K], T3> {
        return new LensState3(this.main, this.lens1, this.lens2.focusQuery(k), this.lens3, this.dangerouslySetMain);
    }

    chain2<Child>(lens: Optional<T2, Child>) {
        return new LensState3(this.main, this.lens1, this.lens2.chain(lens), this.lens3, this.dangerouslySetMain)
    }

    state3(): LensState<Main, T3> {
        return new LensState<Main, T3>(this.main, this.dangerouslySetMain, this.lens3)
    }

    json3(errorMessageIfNotThere?: () => string): T3 {
        return getOr(this.lens3, this.main, errorMessageIfNotThere)
    }

    optJson3(): T3 | undefined {
        return this.lens3.getOption(this.main)
    }

    focus3On<K extends keyof T3, Req extends Required<T3>>(k: K): LensState3<Main, T1, T2, Req[K]> {
        return new LensState3(this.main, this.lens1, this.lens2, this.lens3.focusQuery(k), this.dangerouslySetMain);
    }

    chainLens3<Child>(lens: Lens<T3, Child>) {
        return new LensState3(this.main, this.lens1, this.lens2, this.lens3.chain(lens), this.dangerouslySetMain)
    }

    setJson(t1: T1, t2: T2, t3: T3) {
        this.dangerouslySetMain(this.lens3.set(this.lens2.set(this.lens1.set(this.main, t1), t2), t3))
    }

    transformJson(fn1: (t1: T1) => T1, fn2: (t2: T2) => T2, fn3: (t3: T3) => T3) {
        this.dangerouslySetMain(this.lens1.transform(fn1)(this.lens2.transform(fn2)(this.lens3.transform(fn3)(this.main))))
    }

    transformJson3(fn1: (t1: T1, t2: T2, t3: T3) => T1, fn2: (t1: T1, t2: T2, t3: T3) => T2, fn3: (t1: T1, t2: T2, t3: T3) => T3, errorMessageIfNotThere?: () => string) {
        let t1 = getOr(this.lens1, this.main, errorMessageIfNotThere)
        let t2 = getOr(this.lens2, this.main, errorMessageIfNotThere)
        let t3 = getOr(this.lens3, this.main, errorMessageIfNotThere)
        this.dangerouslySetMain(this.lens1.set(this.lens2.set(this.lens3.set(this.main, fn3(t1, t2, t3)), fn2(t1, t2, t3)), fn1(t1, t2, t3)))
    }

}


export interface LensProps2<Main, T1, T2> {
    state: LensState2<Main, T1, T2>
}

