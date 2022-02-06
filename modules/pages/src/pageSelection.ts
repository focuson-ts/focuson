import { identityOptics, Lens } from "@focuson/lens";

export interface PageSelection {
  pageName: string,
  firstTime?: boolean
}
export interface HasPageSelection {
  pageSelection: PageSelection
}

export function pageSelectionlens<S extends HasPageSelection> (): Lens<S, PageSelection >{
  return identityOptics<S> ( 'state' ).focusOn ( 'pageSelection' )
}
