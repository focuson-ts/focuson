//Copyright (c)2020-2021 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS

/**
 * Creates a lens with two generics. Lens<Main,Child>. Main is the main 'object' that we start with, and Child is the part of Main that the lens is focuson-ed
 * @param get should be a sideeffect free function that goes from 'Main' to the focuson-ed child. When called it 'gets' the Child from the Main
 * @param set should be a sideeffect free function that creates a new Main out of an old main and a new child. It returns the old main with the 'focuson-ed' part replaced by the new child
 * @param description should probably be the string representation of the class 'Main'. If the main object is of type Dragon, this could be the string 'dragon'.
 *
 * Usually these are created by code like
 *
 * Lens.build<Dragon>().focuson('head')
 */
export function lens<Main, Child>(get: (main: Main) => Child, set?: (main: Main, newChild: Child) => Main, description?: string): Lens<Main, Child> {
    checkIsFunction(get)
    if (set) checkIsFunction(set)
    return new Lens(get, set ? set : (m, c) => {throw Error(`Cannot call set on this lens : ${description}`)}, description)
}

/** This is the class that represents a Lens<Main,Child> which focuses on Child which is a part of the Main */
export class Lens<Main, Child> {
    /** The description is extremely useful in debugging and in testing. It plays no part other than that.
     * Most lens are formed from other lens and the creation methods will usually generate a description.
     * See the tests in @focuson/lenstest to see how they simplify testing, and hence debugging*/
    description: string

    /**  get should be a sideeffect free function that goes from 'Main' to the focuson-ed child. When called it 'gets' the Child from the Main */
    get: (m: Main) => Child;
    /** @param set should be a sideeffect free function that creates a new Main out of an old main and a new child. It returns the old main with the 'focuson-ed' part replaced by the new child */
    set: (m: Main, newChild: Child) => Main;

    constructor(get: (m: Main) => Child, set: (m: Main, newChild: Child) => Main, description?: string) {
        this.get = get;
        this.set = set;
        this.description = description ? description : "<undefined>"
    }


    /** This method takes a lens that goes from Child -> GrandChild, and creates a new lens that goes
     * from the Main -> GrandChild
     * @param otherLens A lens that focuses from the Child to a part of the Child 'GrandChild'
     * @returns a lens that goes from Main to GrandChild. */
    chainWith<GrandChild>(otherLens: Lens<Child, GrandChild>): Lens<Main, GrandChild> {
        return new Lens(
            (m: Main) => otherLens.get(this.get(m)),
            (m: Main, c: GrandChild) => this.set(m, otherLens.set(this.get(m), c)), this.description + "/" + otherLens.description)
    }

    /** Main times our main is a javascript object, and it has fields in it. Given such a field name this returns a lens that goes from
     * Main to the contents of the field
     *
     * For example if we have interface Dragon{body: Body, head: Head}. We have a lens that goes from Game -> Dragon. We can call
     * lens.focuson('head') and now we have a lens from the Game -> Head. */
    focusOn = <K extends keyof Child>(fieldName: K): Lens<Main, Child[K]> => this.chainWith(Lenses.field<Child, K>(fieldName));

    /** Allows us to change the focuson-ed child based on it's existing value
     * @fn a function that will be given the old value and will calculate the new
     * @returns a function that given a Main will return a new main with the child transformed as per  'fn' */
    transform(fn: (oldChild: Child) => Child): (m: Main) => Main { return m => this.set(m, fn(this.get(m))) }

    /** If you desire to change the description this will do that. It is rarely called outside the Lens code itself */
    withDescription(description: string) {return new Lens(this.get, this.set, description)}

    toString() { return `Lens(${this.description})` }

    /** Allows us to combine with another lens that goes from Main -> Child2, return a Lens that focuses on a Tuple2 of Child and Child2
     *
     * Often the methods {@link #transformTwoValues} or {@link #updateTwoValues} will deliver cleaner code if you just want to change child1 and child2 at the same time*/
    combineWith = <Child2>(other: Lens<Main, Child2>) => new Lens<Main, Tuple2<Child, Child2>>(
        main => ({one: this.get(main), two: other.get(main)}),
        (main, tuple) => this.set(other.set(main, tuple.two), tuple.one))

    /** Allows us to combine with other lens that goes from Main -> Child2/Main ->Child3, return a Lens that focuses on a Tuple3 of Child, Child2 and Child3
     * Often the method {@link #updateThreeValues}  will deliver cleaner code if you just want to change child1, child2 and child3 at the same time */
    combineWithTwoOtherLens = <Child1, Child2>(lens1: Lens<Main, Child1>, lens2: Lens<Main, Child2>) => new Lens<Main, Tuple3<Child, Child1, Child2>>(
        main => ({one: this.get(main), two: lens1.get(main), three: lens2.get(main)}),
        (main, tuple) => this.set(lens1.set(lens2.set(main, tuple.three), tuple.two), tuple.one))
}


/** A factory class that allows us to create new Lens. Every method on it is static, so you would never create one of these*/
export class Lenses {

    /** This is a the normal way to generate lens. It create a link that goes from Main to itself */
    static build<Main>(description: string) {return Lenses.identity<Main>().withDescription(description)}

    /** Given a main which is an object, with a field name, this returns a lens that goes from the Main to the contents of the field name */
    static field = <Main, K extends keyof Main>(fieldName: K): Lens<Main, Main[K]> => lens(m => m[fieldName], (m, c) => {
        let result = Object.assign({}, m)
        result[fieldName] = c
        return result
    }, fieldName.toString())

    /** Given a main which is an object, with a field name, this returns a lens that goes from the Main to the contents of the field name */
    static identity<M>(): Lens<M, M> { return lens(m => m, (m, c) => c, 'identity') }

    /** This returns a lens from an array of T to the nth member of the array */
    static nth<T>(n: number): Lens<T[], T> {
        const check = (verb: string, length: number) => { if (n > length) throw Error(`Cannot Lens.nth(${n}).${verb}. arr.length is ${length}`)};
        if (n < 0) throw Error(`Cannot give Lens.nth a negative n [${n}]`)
        return lens(arr => {
                check('get', arr.length);
                return arr[n]
            },
            (main, value) => {
                check('set', main.length)
                let result = main.slice();
                result[n] = value;
                return result
            }, `[${n}]`)
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
export const transformTwoValues = <Main, C1, C2>(lens1: Lens<Main, C1>, lens2: Lens<Main, C2>) => (fn1: (c1: C1, c2: C2) => C1, fn2: (c1: C1, c2: C2) => C2) => (main: Main): Main =>
    lens1.set(lens2.set(main, fn2(lens1.get(main), lens2.get(main))), fn1(lens1.get(main), lens2.get(main)))

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
export const updateTwoValues = <Main, C1, C2>(lens1: Lens<Main, C1>, lens2: Lens<Main, C2>) => (main: Main, c1: C1, c2: C2): Main =>
    lens1.set(lens2.set(main, c2), c1)

/** This 'changes' two parts of Main simultaneously.
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
export const updateThreeValues = <Main, C1, C2, C3>(lens1: Lens<Main, C1>, lens2: Lens<Main, C2>, lens3: Lens<Main, C3>) =>
    (main: Main, c1: C1, c2: C2, c3: C3): Main => lens1.set(lens2.set(lens3.set(main, c3), c2), c1)


function checkIsFunction(functionToCheck: any) {
    if (!(typeof functionToCheck === "function")) throw Error('getter should be a function, instead is ' + JSON.stringify(functionToCheck))
}

export interface Tuple2<T1, T2> {
    one: T1,
    two: T2
}
export interface Tuple3<T1, T2, T3> {
    one: T1,
    two: T2,
    three: T3
}
