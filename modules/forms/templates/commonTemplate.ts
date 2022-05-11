export interface Has{commonParams} {{commonParams}: {commonParams}}
export type {commonParams} = {
{commonParamDefns}
}

export const identityL = identityOptics<FState> ();
export const commonIdsL = identityL.focusQuery('CommonIds');

export const commonIds: NameAndLens<FState> = {
{commonParamNameAndLens}
}

export interface FocusedProps<S,D, Context> extends LensProps<S,D, Context>{
  mode: PageMode;
  id: string;
  label?:string;
  allButtons: NameAnd<JSX.Element>;
}

export function commonFetch<S extends HasSimpleMessages & HasTagHolder & HasPageSelection, T> ( onError?: OnTagFetchErrorFn<S, any, T, SimpleMessage> ) {
  return commonTagFetchProps<S, T> (
    ( s, date ) => [], //later do the messaging
    defaultDateFn ) ( onError ) //updateTagsAndMessagesOnError ( defaultErrorMessage )
}
