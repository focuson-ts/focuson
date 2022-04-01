import { FetcherDebug } from "@focuson/fetcher";
import { SelectedPageDebug } from "@focuson/pages";
import { PostDebug } from "@focuson/poster";
import { RestDebug } from "@focuson/rest";
import { TracingDebug } from "./config";

export interface HasFocusOnDebug {
  debug?: FocusOnDebug
}
export interface FocusOnDebug extends FetcherDebug, SelectedPageDebug, PostDebug, RestDebug, TracingDebug {
}