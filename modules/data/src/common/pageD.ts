import { DataD } from "./dataD";
import { RestD } from "./restD";


type PageMode = 'view' | 'create' | 'edit'
export interface DomainDefnInPage {
  [ name: string ]: { dataDD: DataD }
}
export interface RestDefnInPage {
  [ name: string ]: { rest: RestD, targetFromPath: string, fetcher?: boolean }
}
type AllButtonsInPage = ModalButtonInPage | RestButtonInPage | ModalCloseButton
export interface ModalButtonInPage {
  control: 'ModalButton',
  modal: string,
  mode: PageMode,
  mainData?: string,
  tempData: string,
  restOnCommit?: { rest: any, action: string }
}
export interface RestButtonInPage {
  control: 'RestButton',
  rest: string,
  action: string,
  confirm?: boolean
}
export interface ModalCloseButton {
  control: 'ModalCancelButton' | 'ModalCommitButton'
}
export interface ButtonDefnInPage {
  [ name: string ]: AllButtonsInPage
}
export interface PageD {
  modal?: boolean,
  path?: string[],
  modes: PageMode[],
  display: { layout: any, target: string[], dataDD: DataD },
  initialValue: any,
  domain: DomainDefnInPage,
  rest: RestDefnInPage,
  buttons: ButtonDefnInPage
}

