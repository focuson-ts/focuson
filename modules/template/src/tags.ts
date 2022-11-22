import { expand } from "./template";
import { GetNameFn, NameAndLens, Optional } from "@focuson/lens";
import { isRestStateChange, NameAnd, RestAction, toArray, unique } from "@focuson/utils";


export type Tags = (string | undefined)[]
export type NamePlusTags = [ string, string | undefined ][]

export interface HasTagHolder {
  tags: TagHolder
}
export interface HasTagHolderL<S> {
  tagHolderL: Optional<S, TagHolder>
}
/** The tags are the 'bits of data' that tell us if we need to load something'
 * For example a statement needs a customer id. If the customer id changes then we need to fetch the statement data again
 */
export interface TagHolder {
  [ name: string ]: Tags;
}

/** Quite often this will be in the context, meaning that if you have a lenstate you can find where the
 * shared / common ids are kept. These are things like 'application id, customer id..
 */
export interface HasCommonIdDetails<S> {
  commonIdDetails: NameAndLens<S>
}


/**
 * @param cd the common id details (where in state are things like applicationr ef, client ref... shared across multiple pages
 * @param fdd the full domain id details for the page being displayed,
 * @param fdLens how we find the full domain
 * @param resourceId.
 * @params ids. The data we need to send with every request
 */
export interface UrlConfig<S, FD, D> {
  cd: NameAndLens<S>;
  fdd: NameAndLens<FD>;
  fdLens: Optional<S, FD>;
  bodyFrom?: Optional<S, any>; //defaults to fdLens
  dLens: Optional<FD, D>;
  resourceId: string [];
  ids: string [];
  canBeUndefinedIds?: string[];
  jwtIds: string[]
}

type TagOpsFn<T> = <S, FD, D>( urlConfig: UrlConfig<S, FD, D>, includeJwtIds: boolean, restAction: RestAction ) => ( m: S ) => T
export interface TagOps {
  /** puts the values defined in the urlConfig as tags. */
  tags: TagOpsFn<NamePlusTags>
  /** The lens is to describe where the data comes from (in a update/create) or goes to (get/list) it's not used in the get/list, but having it means that we can simplify the calling code */
  reqFor: TagOpsFn<( url: string ) => [ RequestInfo, RequestInit | undefined ]>
}


export const tags: TagOpsFn<[ string, string | undefined ][]> = <S, FD, D> ( urlConfig: UrlConfig<S, FD, D>, includeJwtIds: boolean, restAction: RestAction ) => ( s: S ) => {
  const names = needsId ( restAction ) ? [ ...urlConfig.resourceId, ...urlConfig.ids ] : urlConfig.ids
  return names.sort ().map ( name => [ name, onePart<S, FD, D> ( urlConfig, { failSilently: true } ) ( s, restAction ) ( name ) ] )
}

export function nameToLens<S, FD, D> ( urlConfig: UrlConfig<S, FD, D>, restAction: RestAction ): GetNameFn<S, any> {
  return ( name: string ) => {
    if ( name === 'query' )
      return { getOption: s => makeAEqualsB ( urlConfig, { failSilently: true } ) ( s, restAction ) }
    const fromFdd = urlConfig.fdd[ name ]
    if ( fromFdd ) return urlConfig.fdLens.chain ( fromFdd )
    const fromCd = urlConfig.cd[ name ]//local ovrerride common
    if ( fromCd ) return fromCd
    return { getOption: () => name }//failed to find it
  }
}

export const headersFor: TagOpsFn<NameAnd<string> | undefined> =
               ( urlConfig, includeJwtIds, restAction ) => main => {
                 const jwtIds = urlConfig.jwtIds
                 if ( includeJwtIds && jwtIds && jwtIds.length > 0 ) {
                   const n2L = nameToLens ( urlConfig, restAction )
                   return Object.fromEntries ( jwtIds.map ( jwtId => [ jwtId, n2L ( (jwtId) ).getOption ( main ) ] ) )
                 }
                 return undefined
               }

export const url: TagOpsFn<( urlTemplate: string ) => string> =
               ( urlConfig, includeJwtIds, restAction ) => s =>
                 urlTemplate => expand ( nameToLens ( urlConfig, restAction ) ) ( urlTemplate ) ( s )

export function methodFor ( r: RestAction ) {
  if ( isRestStateChange ( r ) ) return 'post'
  return {
    get: 'get', getOption: 'get', list: 'get',
    delete: 'delete', create: 'post', update: 'put',
    updateWithoutFetch: 'put', createWithoutFetch: 'post'
  }[ r ]

}

export const bodyAndHeadersFor: TagOpsFn<RequestInit | undefined> =
               ( urlConfig, includeJwtIds, restAction ) => s => {
                 const method = methodFor ( restAction )
                 const headers = headersFor ( urlConfig, includeJwtIds, restAction ) ( s )
                 if ( restAction === 'get' ) return headers === undefined ? undefined : { headers } // || restAction === 'list'
                 if ( restAction === 'delete' ) return { method, headers }
                 let bodyL = urlConfig.bodyFrom ? urlConfig.bodyFrom : urlConfig.fdLens.chain ( urlConfig.dLens );
                 const body: any = bodyL.getOption ( s )
                 if ( body ) {
                   console.log ( "made body for ", body )
                   return { method, body: JSON.stringify ( body ), headers }
                 }
                 throw new Error ( `Cannot execute restAction ${restAction}, using the data at [${bodyL.description}] because the data object is empty\n${JSON.stringify ( s )}` )
               }

export const reqFor: TagOpsFn<( url: string ) => [ RequestInfo, RequestInit | undefined ]> =
               <S, FD, D> ( urlConfig: UrlConfig<S, FD, D>, includeJwtIds: boolean, restAction: RestAction ) => ( s: S ) =>
                 u => [ url ( urlConfig, includeJwtIds, restAction ) ( s ) ( u ), bodyAndHeadersFor<S, FD, D> ( urlConfig, includeJwtIds, restAction ) ( s ) ]

export const tagOps: TagOps = ({ tags, reqFor });

export const makeAEqualsB = <S, FD, D> ( urlConfig: UrlConfig<S, FD, D>, { encoder, separator, failSilently }: MakeAEqualsBProps ): ( s: S, restAction: RestAction ) => string => {
  const realEncoder = encoder ? encoder : stringify
  const realSeparator = separator ? separator : '&'
  return ( main, restAction ) => {
    const nameLnFn = nameToLens ( urlConfig, restAction )
    const rawNames = needsId ( restAction ) ? [ ...urlConfig.ids, ...urlConfig.resourceId ] : urlConfig.ids
    const jwtIds = urlConfig.jwtIds
    const canBeUndefinedIds = urlConfig.canBeUndefinedIds
    const names = rawNames.filter ( name => !jwtIds.includes ( name ) )
    console.log ( 'makeAEqualsB', rawNames, jwtIds, names )
    return unique ( names.flatMap ( name => {
        const value = nameLnFn ( name ).getOption ( main )
        if ( value === undefined && toArray(canBeUndefinedIds).includes ( name ) ) return []
        if ( value !== undefined || failSilently ) return [ name + '=' + realEncoder ( value ) ]
        throw new Error ( `Could not find [${name}] in makeAEqualsB. All names are ${names.join ( "." )}` )
      }
    ), t => t ).join ( realSeparator )
  }
};
// export function regFor ( props: TagOpsProps ) {
//   const query = makeAEqualsB<Main> ( nameFn, { encoder } ) ( ...names ) ( main )
//     return expand ( addValue ( nameFn, "query", query ) ) ( url, ...names ) ( main )

// }

function stringify ( s: any ): string | undefined { return s !== undefined ? (typeof s === 'object') ? JSON.stringify ( s ) : s.toString () : undefined}

const from = <S> ( n: NameAndLens<S>, name: string, s: S | undefined ): string | undefined => stringify ( s ? n[ name ]?.getOption ( s ) : undefined )

export const onePart = <S, FD, D> ( urlConfig: UrlConfig<S, FD, D>, props: MakeAEqualsBProps ) => ( s: S, restAction: RestAction ) => ( name: string ): string | undefined => {
  const { cd, fdd, fdLens } = urlConfig
  if ( name === 'query' ) return makeAEqualsB ( urlConfig, props ) ( s, restAction )
  if ( fdd[ name ] !== undefined ) return from ( fdd, name, fdLens.getOption ( s ) )
  return from ( cd, name, s )
}


export interface MakeAEqualsBProps {
  failSilently?: boolean,
  separator?: string,
  encoder?: ( s: string | undefined ) => string
}

export interface TagOpsProps extends MakeAEqualsBProps {
  separator: '&';
}

export function needsId ( r: RestAction ): boolean {
  return r === 'get' || r === 'update' || r === 'delete' || isRestStateChange ( r )
}
