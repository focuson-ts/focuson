import { identityOptics, Lens } from "@focuson/lens";

export type PageMode = 'view' | 'create' | 'edit'

export interface PageSelection {
  pageName: string;
  firstTime?: boolean;
  pageMode: PageMode;
}
export interface HasPageSelection {
  pageSelection: PageSelection
}

export function pageSelectionlens<S extends HasPageSelection> (): Lens<S, PageSelection> {
  return identityOptics<S> ( 'state' ).focusOn ( 'pageSelection' )
}
