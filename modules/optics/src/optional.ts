function apply<T, T1>(t: T | undefined, fn: (t: T) => T1): T1 | undefined {
    return t ? fn(t) : undefined
}

const useOrDefault = <T>(def: T) => (t: T | undefined): T => t ? t : def;

function copyWithFieldSet<T, K extends keyof T>(t: T, k: K, v: T[K]) {
    let result = {...t}
    result[k] = v
    return result
}


export const identityOptics = <State>(): Iso<State, State> => new Iso(x => x, x => x);


// interface Optics2<Main,Child>{
//     getOption: (m: Main) => Child | undefined,
//     set: (m: Main, c: Child) => Main,
//     focusOn<K extends keyof Child>(k: K): Optics<Main, Required<Child[K]>>,
//
// }

export class Optional<Main, Child> {
    getOption: (m: Main) => Child | undefined
    set: (m: Main, c: Child) => Main


    constructor(getOption: (m: Main) => (Child | undefined), set: (m: Main, c: Child) => Main) {
        this.getOption = getOption;
        this.set = set;
    }

    map = (m: Main, fn: (c: Child) => Child): Main => useOrDefault(m)(apply(this.getOption(m), nc => this.set(m, nc)))

    focusOn<K extends keyof Child>(k: K): Optional<Main, Child[K]> {
        return new Optional<Main, Child[K]>(
            (m) => apply(this.getOption(m),
                c => c[k]), (m, v: Child[K]) => this.map(m, oldc => copyWithFieldSet(oldc, k, v)))
    }

    /** this is the 'normal' focuson. We use it when we know that the result is there. i.e. if we have
     *
     * interface AB{
     *      a: string,
     *      b?: SomeInterface | undefined
     * }
     *
     * In this focusQuery gives us a Optional instead of a lens as the result. The important point about a Optional is that we are saying 'the focused on thing might not exist'
     * This is the normal way to 'walk' down through an object with a 'b?: someInterface' type signature.
     * @param k
     */
    focusQuery<K extends keyof Child, Req extends Required<Child>>(k: K): Optional<Main, Req[K]> {
        return new Optional<Main, Req[K]>(
            // @ts-ignore
            m => {
                const child = this.getOption(m)
                return child ? child[k] : undefined
            },
            (m, v) => {
                const child = this.getOption(m)
                return child ? this.set(m, copyWithFieldSet(child, k, v)) : m
            })
    }


    chainWithOptics<T>(o: Optional<Child, T>): Optional<Main, T> {
        return new Optional<Main, T>(
            m => apply(this.getOption(m), c => o.getOption(c)),
            (m, t) => this.map(m, oldC => o.set(oldC, t))
        )
    }


    combineWith<OtherChild>(other: Optional<Main, OtherChild>) {
        return new Optional<Main, [Child, OtherChild]>(
            m => apply(this.getOption(m), (c: Child) => apply(other.getOption(m), nc => [c, nc])),
            (m, newChild) => {
                let [nc, noc] = newChild
                return this.set(other.set(m, noc), nc)
            })
    }

    combineAsType<OtherChild, NewChild>(other: Optional<Main, OtherChild>, make: (c: Child, nc: OtherChild) => NewChild, extract: (t: NewChild) => [Child, OtherChild]): Optional<Main, NewChild> {
        return this.combineWith(other).chainWithOptics<NewChild>(new Iso(arr => make(arr[0], arr[1]), extract))
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


    chainWithLens = <T>(o: Lens<Child, T>): Lens<Main, T> => new Lens<Main, T>(
        m => o.get(this.get(m)),
        (m, t) => this.set(m, o.set(this.get(m), t)));

    combineWithLens<OtherChild>(other: Lens<Main, OtherChild>): Lens<Main, [Child, OtherChild]> {
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


export class Iso<Main, Child> extends Lens<Main, Child> {
    reverseGet: (c: Child) => Main

    constructor(get: (m: Main) => Child, reverseGet: (c: Child) => Main) {
        super(get, (m, c) => reverseGet(c));
        this.reverseGet = reverseGet;
    }
}

