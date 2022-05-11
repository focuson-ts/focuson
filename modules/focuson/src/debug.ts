import { FetcherDebug } from "@focuson/fetcher";
import { SelectedPageDebug } from "@focuson/pages";
import { RestDebug } from "@focuson/rest";
import { AccordionsInDebug, TracingDebug } from "./config";
import { TagFetcherDebug } from "./tagFetcher";

export interface HasFocusOnDebug {
  debug?: FocusOnDebug
}
export interface FocusOnDebug extends FetcherDebug, SelectedPageDebug,  RestDebug, TracingDebug, AccordionsInDebug, TagFetcherDebug {
}