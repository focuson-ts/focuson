import { expand } from "./template";
import { GetNameFn, NameAndLens, Optional } from "@focuson/lens";
import { RestAction } from "@focuson/utils";


export type Tags = (string | undefined)[]

export interface HasTagHolder {
  tags: TagHolder
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

export interface UrlConfigWithoutFdLens<S, FD, D> {
  cd: NameAndLens<S>;
  fdd: NameAndLens<FD>;
  dLens: Optional<FD, D>;
  resourceId: string [];
  ids: string []
}

/**
 * @param cd the common id details (where in state are things like applicationr ef, client ref... shared across multiple pages
 * @param fdd the full domain id details for the page being displayed,
 * @param fdLens how we find the full domain
 * @param resourceId.
 * @params ids. The data we need to send with every request
 */
export interface UrlConfig<S, FD, D> extends UrlConfigWithoutFdLens<S, FD, D> {
  cd: NameAndLens<S>;
  fdd: NameAndLens<FD>;
  fdLens: Optional<S, FD>;
  dLens: Optional<FD, D>;
  resourceId: string [];
  ids: string []
}

type TagOpsFn<T> = <S, FD, D>( urlConfig: UrlConfig<S, FD, D>, restAction: RestAction ) => ( m: S ) => T
export interface TagOps {
  /** puts the values defined in the urlConfig as tags. */
  tags: TagOpsFn<Tags>
  /** The lens is to describe where the data comes from (in a update/create) or goes to (get/list) it's not used in the get/list, but having it means that we can simplify the calling code */
  reqFor: TagOpsFn<( url: string ) => [ RequestInfo, RequestInit | undefined ]>
}


export const tags: TagOpsFn<Tags> = ( urlConfig, restAction ) => <S> ( s ) => {
  const names = needsId ( restAction ) ? [ ...urlConfig.resourceId, ...urlConfig.ids ] : urlConfig.ids
  return names.map ( onePart ( urlConfig, { failSilently: true } ) ( s, restAction ) ).sort ()
};
export function nameToLens<S, FD, D> ( urlConfig: UrlConfig<S, FD, D>, restAction: RestAction ): GetNameFn<S, any> {
  return ( name: string ) => {
    if ( name === 'query' ) return { getOption: s => makeAEqualsB ( urlConfig, { failSilently: true } ) ( s, restAction ) }
    const fromFdd = urlConfig.fdd[ name ]
    if ( fromFdd ) return urlConfig.fdLens.chain ( fromFdd )
    const fromCd = urlConfig.cd[ name ]
    if ( fromCd ) return fromCd
    return { getOption: () => name }
  }
}

export const url: TagOpsFn<( urlTemplate: string ) => string> =
               ( urlConfig, restAction ) => s =>
                 urlTemplate => expand ( nameToLens ( urlConfig, restAction ) ) ( urlTemplate ) ( s )
export function methodFor ( r: RestAction ) {
  return {
    get: 'get', getOption: 'get', list: 'get',
    delete: 'delete', create: 'post', update: 'put'
  }[ r ]

}

export const bodyFor: TagOpsFn<RequestInit | undefined> =
               ( urlConfig, restAction ) => s => {
                 const method = methodFor ( restAction )
                 if ( restAction === 'get' || restAction === 'getOption' || restAction === 'list' ) return undefined
                 if ( restAction === 'delete' ) return { method }
                 const body: any = urlConfig.fdLens.chain ( urlConfig.dLens ).getOption ( s )
                 if ( body ) {
                   console.log ( "made body for ", body )
                   return { method, body: JSON.stringify ( body ) }
                 }
                 throw new Error ( `Cannot execute restAction ${restAction} because the data object is empty\n${JSON.stringify ( s )}` )
               }

export const reqFor: TagOpsFn<( url: string ) => [ RequestInfo, RequestInit | undefined ]> =
               ( urlConfig, restAction ) => <S> ( s ) =>
                   u => [ url ( urlConfig, restAction ) ( s ) ( u ), bodyFor ( urlConfig, restAction ) ( s ) ]

export const tagOps: TagOps = ({ tags, reqFor });

export const makeAEqualsB = <S, FD, D> ( urlConfig: UrlConfig<S, FD, D>, { encoder, separator, failSilently }: MakeAEqualsBProps ): ( s: S, restAction: RestAction ) => string => {
  const realEncoder = encoder ? encoder : stringify
  const realSeparator = separator ? separator : '&'
  return ( main, restAction ) => {
    const nameLnFn = nameToLens ( urlConfig, restAction )
    const names = needsId ( restAction ) ? [ ...urlConfig.ids, ...urlConfig.resourceId ] : urlConfig.ids
    return names.map ( name => {
        const value = nameLnFn ( name ).getOption ( main )
        if ( value || failSilently ) return name + '=' + realEncoder ( value )
        throw new Error ( `Could not find [${name}] in makeAEqualsB. All names are ${names.join ( "." )}` )
      }
    ).join ( realSeparator )
  }
};
// export function regFor ( props: TagOpsProps ) {
//   const query = makeAEqualsB<Main> ( nameFn, { encoder } ) ( ...names ) ( main )
//     return expand ( addValue ( nameFn, "query", query ) ) ( url, ...names ) ( main )

// }

function stringify ( s: any ): string | undefined { return s ? (typeof s === 'object') ? JSON.stringify ( s ) : s.toString () : undefined}
const from = <S> ( n: NameAndLens<S>, name: string, s: S | undefined ): string | undefined => stringify ( n[ name ]?.getOption ( s ) )

export const onePart = <S, FD, D> ( urlConfig: UrlConfig<S, FD, D>, props: MakeAEqualsBProps ) => ( s: S, restAction: RestAction ) => ( name: string ): string | undefined => {
  const { cd, fdd, fdLens } = urlConfig
  if ( name === 'query' ) return makeAEqualsB ( urlConfig, props ) ( s, restAction )
  const fromFd = from ( fdd, name, fdLens.getOption ( s ) )
  return fromFd ? fromFd : from ( cd, name, s )
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
  return r === 'get' || r === 'getOption' || r === 'update' || r === 'delete'
}
