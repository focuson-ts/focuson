const apply = <T, T1>(t: T | undefined, fn: (t: T) => T1): T1 | undefined => t ? fn(t) : undefined;
const applyOrDefault = <T, T1>(t: T | undefined, fn: (t: T) => T1, def: T1): T1 => t ? fn(t) : def;
const useOrDefault = <T>(def: T) => (t: T | undefined): T => t ? t : def;

function copyWithFieldSet<T, K extends keyof T>(t: T, k: K, v: T[K]) {
    let result = {...t}
    result[k] = v
    return result
}


export const identityOptics = <State>(): Iso<State, State> => new Iso(x => x, x => x);


export function nthItem<T>(n: number): Optional<T[], T> {
    return new Optional<T[], T>(
        t => t[n],
        (arr, t) => {
            let result = [...arr]
            result[n] = t
            return result
        }
    )
}

export function firstIn2<T1, T2>(): Optional<[T1, T2], T1> {
    return new Optional(arr => arr[0], (arr, t1) => [t1, arr[1]])
}

export function secondIn2<T1, T2>(): Optional<[T1, T2], T2> {
    return new Optional(arr => arr[1], (arr, t2) => [arr[0], t2])
}

// interface Optics2<Main,Child>{
//     getOption: (m: Main) => Child | undefined,
//     set: (m: Main, c: Child) => Main,
//     focusOn<K extends keyof Child>(k: K): Optics<Main, Required<Child[K]>>,
//
// }

export class Optional<Main, Child> {
    getOption: (m: Main) => Child | undefined
    setOption: (m: Main, c: Child) => Main | undefined

    constructor(getOption: (m: Main) => (Child | undefined), optionalSet: (m: Main, c: Child) => Main | undefined) {
        this.getOption = getOption;
        this.setOption = optionalSet;
    }

    set = (m: Main, c: Child): Main => useOrDefault(m)(this.setOption(m, c));
    map = (m: Main, fn: (c: Child) => Child): Main => applyOrDefault(this.getOption(m), c => this.set(m, c), m)


    /** This is used when the 'parameter' points to definite value. i.e. it isn't 'x: X | undefined' or 'x?: X'. If you want to
     * walk through those you probably want to use 'focusQuery'
     *
     * If the type system is complaining and you are sure that it should be OK, check if the previous focusOn should be a focusQuery
     * @param k
     */
    focusOn<K extends keyof Child>(k: K): Optional<Main, Child[K]> {
        return new Optional<Main, Child[K]>(
            (m) => apply(this.getOption(m),
                c => c[k]), (m, v: Child[K]) => apply(this.getOption(m), c => this.set(m, copyWithFieldSet(c, k, v))))
    }

    /** Used to focus onto a child that might not be there. If you don't use this, then the type system is likely to complain if you try and carry on focusing. */
    focusQuery<K extends keyof Child, Req extends Required<Child>>(k: K): Optional<Main, Req[K]> {
        return new Optional<Main, Req[K]>(
            // @ts-ignore
            m => apply(this.getOption(m), c => c[k]), (m, v) => apply(this.getOption(m), c => this.set(m, copyWithFieldSet(c, k, v))))
    }


    chain<T>(o: Optional<Child, T>): Optional<Main, T> {
        return new Optional<Main, T>(
            m => apply(this.getOption(m), c => o.getOption(c)),
            (m, t) => this.map(m, oldC => o.set(oldC, t))
        )
    }


    combine<OtherChild>(other: Optional<Main, OtherChild>) {
        return new Optional<Main, [Child, OtherChild]>(
            m => apply(this.getOption(m), (c: Child) => apply(other.getOption(m), nc => [c, nc])),
            (m, newChild) => {
                let [nc, noc] = newChild
                return this.set(other.set(m, noc), nc)
            })
    }

    combineAs<OtherChild, NewChild>(other: Optional<Main, OtherChild>, iso: Iso<[Child, OtherChild], NewChild>): Optional<Main, NewChild> {
        return this.combine(other).chain(iso)
    }

}

export class Lens<Main, Child> extends Optional<Main, Child> {
    set: (m: Main, c: Child) => Main
    get: (m: Main) => Child

    constructor(get: (m: Main) => (Child), set: (m: Main, c: Child) => Main) {
        super(get, set);
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
    focusOn<K extends keyof Child>(k: K): Lens<Main, Child[K]> {
        return new Lens<Main, Child[K]>(
            (m) => this.get(m)[k],
            (m, c) => this.set(m, copyWithFieldSet(this.get(m), k, c)))
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
    focusWithDefault<K extends keyof Child, Req extends Required<Child>>(k: K, def: Child[K]): Lens<Main, Req[K]> {
        // @ts-ignore
        return new Lens<Main, Required<Child[K]>>((m: Main) => useOrDefault(def)(this.get(m)[k]), (m, v) => this.set(m, copyWithFieldSet(this.get(m), k, v)))
    }


    chainLens = <T>(o: Lens<Child, T>): Lens<Main, T> => new Lens<Main, T>(
        m => o.get(this.get(m)),
        (m, t) => this.set(m, o.set(this.get(m), t)));

    combineLens<OtherChild>(other: Lens<Main, OtherChild>): Lens<Main, [Child, OtherChild]> {
        return new Lens<Main, [Child, OtherChild]>(
            m => [this.get(m), other.get(m)],
            (m, newChild) => this.set(other.set(m, newChild[1]), newChild[0]))
    }
}

export class Prism<Main, Child> extends Optional<Main, Child> {
    reverseGet: (c: Child) => Main

    constructor(getOption: (m: Main) => (Child | undefined), reverseGet: (c: Child) => Main) {
        super(getOption, (m, c) => reverseGet(c));
        this.reverseGet = reverseGet;
    }
}

export function iso<Main,Child>(get: (m: Main) => Child, reverseGet:(c:  Child) => Main):Iso<Main, Child>{
    return new Iso(get, reverseGet)
}

export class Iso<Main, Child> extends Lens<Main, Child> {
    reverseGet: (c: Child) => Main

    constructor(get: (m: Main) => Child, reverseGet: (c: Child) => Main) {
        super(get, (m, c) => reverseGet(c));
        this.reverseGet = reverseGet;
    }
}

