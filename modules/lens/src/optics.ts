
export type LensWithPath<Main, Child> = {
    path: string[]
    get: (m: Partial<Main>) => Child
    set: (m: Partial<Main>, c: Child) => Partial<Main>
}

export function lens<Main>(): LensBuilder<Main, Main> {
    return new LensBuilder<Main, Main>(identityLens())
}

export function get<Main, Child>(m: Main, l: LensWithPath<Main, Child>): Child {
    return l.get(m)
}

export function set<Main, Child>(m: Partial<Main>, c: Child, l: LensWithPath<Main, Child>): Partial<Main> {
    return l.set(m, c)
}

export function identityLens<Main>(): LensWithPath<Main, Main> {
    return {
        path: [],
        get: (m: Partial<Main>) => m as Main,
        set: (m: Partial<Main>, c: Main) => c
    }
}

export class LensBuilder<Main, Child> {
    lens: LensWithPath<Main, Child>

    constructor(lens: LensWithPath<Main, Child>) {
        this.lens = lens
    }

    build(): LensWithPath<Main, Child> {
        return this.lens
    }

    focuson<K extends keyof Child>(key: K): LensBuilder<Main, Child[K]> {
        const thisLens = this.lens;
        return new LensBuilder<Main, Child[K]>({
            path: [...thisLens.path, key as string],
            get: (m: Partial<Main>) => {
                const parent = thisLens.get(m);
                let result = parent === undefined ? undefined : parent?.[key];
                return result as Child[K];
            },
            set: (m: Partial<Main>, c: Child[K]) => {
                const current = thisLens.get(m) || {} as Child;
                const newChild = {...current, [key]: c};
                return thisLens.set(m, newChild);
            }
        });
    }

    //Type guard.
    //This method will only compile if 'this' meets the signature LensBuilder<Main, Item[]>
    //why? This will throw compilation error if we focusonNth on something that isn't an array
    //raising typescript to 6/10 Types are fantastic. Scala has them Haskal has them. I didn't know typescript.
    focusonNth<Item>(this: LensBuilder<Main, Item[]>, index: number): LensBuilder<Main, Item> {
        const thisLens = this.lens;
        return new LensBuilder<Main, Item>({
            path: [...thisLens.path, `[${index}]`],
            get: (m: Partial<Main>) => {
                const childArray = thisLens.get(m);
                return Array.isArray(childArray) ? childArray[index] : undefined as Item;
            },
            set: (m: Partial<Main>, c: Item) => {
                const childArray = thisLens.get(m) || [];
                const newChild = Array.isArray(childArray) ? [...childArray] : [];
                newChild[index] = c;
                return thisLens.set(m, newChild);
            }
        });
    }
}

// a.b.c  but it could be a.b[3].c   [1].connection.host
export function lensFromPath<Main>(path: string): LensWithPath<Main, any> {
    const pathSegments = path.split(/\.|\[|\]/).filter(Boolean);
    let builder = pathSegments.reduce((lens, segment) => {
        if (segment.match(/^\d+$/)) {
            const index = parseInt(segment, 10);
            return lens.focusonNth(index);
        } else {
            return lens.focuson(segment);
        }
    }, lens<any>());
    return builder.lens;
}
