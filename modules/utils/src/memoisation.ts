const cacheofCache: Map<string, Map<string, any>> = new Map ()
export const memoise = ( type: string, key: string ) => <T> ( generator: () => T ): T => {
  var cache = cacheofCache.get ( type )
  if ( !cache ) {
    cache = new Map ()
    cacheofCache.set ( type, cache )
  }
  const result = cache.get ( key )
  if ( result ) return result
  const newT: T = generator ()
  cache.set ( key, newT )
  return newT
};