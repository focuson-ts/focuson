import { identityOptics, Lens } from "@focuson/lens";

export type PageMode = 'view' | 'create' | 'edit'

export interface PagePosition {
  left?: number;
  right?: number;
  top?: number;
  button?: number;
}

export interface PageParams {
  position?: PagePosition;
}

export interface PageOnClose {
  onCloseHandler: string;//
  onCloseParams: any; //
}
export interface PageSelection {
  pageName: string;
  firstTime?: boolean;
  pageMode: PageMode;
  params?: PageParams;
  onClose?: PageOnClose;
}
export interface HasPageSelection {
  pageSelection: PageSelection
}

export function pageSelectionlens<S extends HasPageSelection> (): Lens<S, PageSelection> {
  return identityOptics<S> ( 'state' ).focusOn ( 'pageSelection' )
}
