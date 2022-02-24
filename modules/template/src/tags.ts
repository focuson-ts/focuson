import { addValue, expand, makeAEqualsB, MakeAEqualsBProps, nameLensFn, NameLensFn, queryParamsFor } from "./template";
import { Optional } from "@focuson/lens";


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


export interface TagOps<Main, Details> {
  queryParam: ( ...names: (keyof Details)[] ) => ( m: Main ) => string
  tags: ( ...names: (keyof Details)[] ) => ( m: Main ) => Tags
  getUrlFor: ( url: string, ...names: (keyof Details)[] ) => ( m: Main ) => string,
  getReqFor: ( url: string, reqInit?: RequestInit, ...names: (keyof Details)[] ) => ( m: Main ) => [ RequestInfo, RequestInit | undefined ]
}

export function tagOps<Main, Details> ( lens: Optional<Main, Details>, props: MakeAEqualsBProps ): TagOps<Main, Details> {
  return { queryParam: queryParamsFor ( lens, {} ), tags: findTagsFor ( lens ), getUrlFor: getUrlFor ( lens ), getReqFor: getReqFor ( lens ) }
}

export const findTagsFor = <Main, Details> ( lens: Optional<Main, Details> ) => ( ...names: (keyof Details)[] ): ( m: Main ) => Tags =>
  findTags ( nameLensFn ( lens ) ) ( ...names.map ( n => n.toString () ) )

export const findTags = <Main> ( nameFn: NameLensFn<Main, string> ) => ( ...names: string[] ): ( m: Main ) => Tags =>
  main => names.map ( nameFn ).map ( opt => opt.getOption ( main ) )

export const getUrl = <Main> ( nameFn: NameLensFn<Main, any>, encoder?: ( s: string ) => string ) => ( url: string, ...names: string[] ): ( m: Main ) => string => {
  return main => {
    const query = makeAEqualsB<Main> ( nameFn, { encoder } ) ( ...names ) ( main )
    return expand ( addValue ( nameFn, "query", query ) ) ( url, ...names ) ( main )
  }
}
export const getUrlFor = <Main, Details> ( lens: Optional<Main, Details> ) => ( url: string, ...names: (keyof Details)[] ): ( m: Main ) => string =>
  getUrl ( nameLensFn ( lens ) ) ( url, ...names.map ( n => n.toString () ) )

export const getReqFor = <Main, Details> ( lens: Optional<Main, Details> ) => ( url: string, reqInit?: RequestInit, ...names: (keyof Details)[] ): ( m: Main ) => [ RequestInfo, RequestInit | undefined ] =>
  m => [ getUrl ( nameLensFn ( lens ) ) ( url, ...names.map ( n => n.toString () ) ) ( m ), reqInit ]
