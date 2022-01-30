import { identityOptics, Lens } from "@focuson/lens";

export interface PageSelection<PD> {
  pageName: keyof PD,
  firstTime?: boolean
}
export interface HasPageSelection<PD> {
  pageSelection: PageSelection<PD>
}

export function pageSelectionlens<S extends HasPageSelection<any>, PD> (): Lens<S, PageSelection<PD>> {
  return identityOptics<S> ( 'state' ).focusOn ( 'pageSelection' )
}
