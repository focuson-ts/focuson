
export interface Has{commonParams} {{commonParams}: {commonParams}}
export type {commonParams} = {
{commonParamDefns}
}
export interface FocusedProps<S,D, Context> extends LensProps<S,D, Context>{
  mode: PageMode;
}

export const commonIdLens = Lenses.identity<{stateName}> ().focusOn ( '{commonParams}' )
export const commonIdOps = tagOps ( commonIdLens, { failSilently: false } )
export function commonFetch<S extends HasSimpleMessages & HasTagHolder & HasPageSelection, T> ( onError?: OnTagFetchErrorFn<S, any, T, SimpleMessage> ) {
  return commonTagFetchProps<S, T> (
    ( s, date ) => [], //later do the messaging
    defaultDateFn ) ( onError ) //updateTagsAndMessagesOnError ( defaultErrorMessage )
}
