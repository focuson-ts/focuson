export function fromObject<M, K extends keyof M>(map: M, key: K): M[K] {
    let value = map[key]
    if (value === undefined) throw Error('fromMap is null for name ' + key)
    return value
}
export function fromMap<K, V>(map: Map<K, V>, k: K): V {
    if (!map) throw Error('map is undefined')
    let result = map.get(k)
    if (result !== undefined) return result
    throw Error(`Cannot find data for ${k}\nLegal values are ${Array.from(map.keys()).sort()}`)
}
