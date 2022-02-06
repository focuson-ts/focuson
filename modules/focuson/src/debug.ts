import { FetcherDebug } from "@focuson/fetcher";
import { SelectedPageDebug } from "@focuson/pages";

export interface HasFocusOnDebug{
  debug?: FocusOnDebug
}
export interface FocusOnDebug extends  FetcherDebug , SelectedPageDebug{
}