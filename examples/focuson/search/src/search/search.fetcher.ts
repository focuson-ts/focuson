import { FullSearchDomain, SearchRequirements } from "./fullSearchDomain";
import { commonFetch, Fetcher, ifEEqualsFetcher, loadInfo, MutateFn, OnTagFetchErrorFn, partialFnUsageError, ReqFn, stateAndFromApiTagFetcher, Tags } from "@focuson/fetcher";
import { Iso, Lenses, Optional } from "@focuson/lens";
import { HasPageSelection, HasSimpleMessages } from "@focuson/pages";
import { CommonTagFetcher, HasTagHolder, SpecificTagFetcher } from "@focuson/fetcher/src/tagFetcher";
import { areAllDefined, arraysEqual, or } from "@focuson/utils";
//
// export function stateAndFromApiTagFetcher<S, Target> (
//   ctf: CommonTagFetcher<S>,
//   pageName: keyof S,
//   tagName: string,
//   targetL: ( s: Optional<S, S> ) => Optional<S, Target>,
//   actualTags: ( s: S ) => Tags,
//   reqFn: ReqFn<S>,
//   description?: string
// ) {
//   const stf = specify<S, Target> ( ctf, `${pageName}_${tagName}`, actualTags, reqFn, targetL ( ctf.identityL ) );
//   return ifEEqualsFetcher<S> ( ( s ) => ctf.mainThingL.get ( s ) === pageName.toString (), tagFetcher ( stf ), description );
// }
//
// function specify<S, T> (
//   ctf: CommonTagFetcher<S>,
//   tagName: string,
//   actualTags: ( s: S ) => Tags,
//   reqFn: ReqFn<S>,
//   targetLens: Optional<S, T>,
//   description?: string
// ): SpecificTagFetcher<S, T> {
//   return {
//     ...ctf,
//     tagFetcher,
//     targetLens,
//     actualTags,
//     reqFn,
//     // @ts-ignore  We need this ignore here to avoid the effort of setting up Tag properly. This reduces the work of every page, so I think it's worth it
//     tagLens: ctf.tagHolderL.focusQuery ( tagName ),
//     description: description ? description : tagName.toString ()
//   };
// }
// export function tagFetcher<S, T> ( sf: SpecificTagFetcher<S, T> ): Fetcher<S, T> {
//   const result: Fetcher<S, T> = {
//     shouldLoad ( s: S ) {
//       const currentTags = sf.tagLens.getOption ( s );
//       let desiredTags = sf.actualTags ( s );
//       let target = sf.targetLens.getOption ( s );
//       let tagsDifferent = !arraysEqual ( desiredTags, currentTags );
//       let result = areAllDefined ( desiredTags ) && (tagsDifferent || target === undefined);
//       return result;
//     },
//     load ( s: S ) {
//       const currentTags = sf.actualTags ( s );
//
//       if ( !areAllDefined ( currentTags ) ) throw partialFnUsageError ( result );
//       const req = sf.reqFn ( s );
//
//       if ( !req ) throw partialFnUsageError ( result );
//       const [ url, info ] = req;
//       const mutateForHolder: MutateFn<S, T> = ( state ) => ( status, json ) => {
//         console.error("mutateForHolder1", status)
//         if ( !state ) throw partialFnUsageError ( result );
//         const tagAndTargetLens = sf.tagLens.combine ( sf.targetLens );
//         console.error("mutateForHolder2", status)
//         return status < 300
//           ? tagAndTargetLens.set ( state, [ currentTags, json ] )
//           : sf.tagLens.set ( sf.onTagFetchError ( s, status, req, json, sf.tagLens.getOption ( s ), currentTags ), currentTags );
//       };
//       return loadInfo ( url, info, mutateForHolder );
//     },
//     description: `tagFetcher(tag=${sf.tagLens.description},target=${sf.targetLens.description},error=${sf.onTagFetchError})`
//   };
//   return result;
// }
//
//
// export function onTagFetchError<S> ( errorMessageL: Optional<S, string> ): OnTagFetchErrorFn<S> {
//   return ( s: S, status: number, req: any, response: any, originalTags?: Tags, currentTags?: Tags ) => {
//     console.error ( 'In onTagFetchError', s, status, req, response, originalTags, currentTags )
//     return errorMessageL.set (
//       s,
//       `Req: ${JSON.stringify ( req )}, Resp: ${JSON.stringify ( response )}, ${status}, ${originalTags}, ${currentTags}`
//     );
//   }
// }
//
// export function commonFetch<S extends HasSimpleMessages & HasTagHolder & HasPageSelection> (): CommonTagFetcher<S> {
//   const identityL: Iso<S, S> = Lenses.identity<S> ( 'state' ); //we need the any because of a typescript compiler bug
//   // @ts-ignore I don't know why this doesn't compile
//   let errorMessageL: Optional<S, string> = identityL.focusQuery ( 'errorMessage' );
//   return {
//     identityL,
//     mainThingL: identityL.focusOn ( 'pageSelection' ).focusOn ( 'pageName' ),
//     tagHolderL: identityL.focusQuery ( 'tags' ),
//     onTagFetchError: onTagFetchError ( errorMessageL )
//   };
// }

export function searchFetcher<S extends SearchRequirements> () {
  return stateAndFromApiTagFetcher<S, string[]> (
    commonFetch<S> (),
    'search',
    'search',
    l => {
      //@ts-ignore
      let optional: Optional<S, FullSearchDomain> = l.focusQuery ( 'search' );
      return optional.focusQuery ( 'queryResults' );
    },
    s => [ s.search?.query ],
    s => [ `/api/search?query=${s.search?.query}`, undefined ] )
}
