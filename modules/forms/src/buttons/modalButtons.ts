import { DataD } from "../common/dataD";
import { safeArray } from "@focuson/utils";
import { ButtonDefnInPage, PageD, RestOnCommit } from "../common/pageD";
import { PageMode, SetToLengthOnClose } from "@focuson/pages";
import { ButtonCreator, MakeButton } from "../codegen/makeButtons";
import { opt, optT } from "../codegen/codegen";
import { emptyName, modalName, restDetailsName } from "../codegen/names";

export interface CommonModalButtonInPage {
  control: string;
  text?: string;
  modal: PageD<any>,
  mode: PageMode,
  restOnCommit?: RestOnCommit,
  copyOnClose?: string[]
  focusOn: string[],
  copyFrom?: string[],
  setToLengthOnClose?: SetToLengthOnClose
}

export function restForButton<B> ( parent: PageD<B>, rest?: RestOnCommit ): string {
  return rest ? ` rest={${JSON.stringify ( { name: restDetailsName ( parent, rest.rest ), restAction: rest.action, path: safeArray ( rest.target ) } )}}` : ""
}

export function isModalButtonInPage ( m: any ): m is ModalButtonInPage {
  return m.control === 'ModalButton'
}
export interface ModalButtonInPage extends CommonModalButtonInPage {
  control: 'ModalButton',
  createEmpty?: DataD
}
const makeModalButtonInPage: ButtonCreator<ModalButtonInPage> = {
  import: "@focuson/pages",
  makeButton:
    ( { params, parent, name, button } ) => {
      const { modal, mode, restOnCommit, focusOn, copyFrom, createEmpty, copyOnClose, setToLengthOnClose, text } = button
      const createEmptyString = createEmpty ? `createEmpty={${params.emptyFile}.${emptyName ( createEmpty )}}` : ""

      const focusOnArray = [ parent.name, ...focusOn ]
      const copyOnCloseArray = copyOnClose ? [ parent.name, ...copyOnClose ] : undefined
      const copyFromArray = copyFrom ? [ parent.name, ...copyFrom ] : undefined
      const actualSetToLengthOnClose = setToLengthOnClose ? { array: [ parent.name, ...setToLengthOnClose.array ], variable: [ parent.name, ...setToLengthOnClose.variable ] } : undefined
      return `<${button.control} id='${name}' text='${text ? text : name}'  state={state} modal = '${modalName ( parent, modal )}'  ` +
        `${optT ( 'focusOn', focusOnArray )} ${optT ( 'copyFrom', copyFromArray )} ${optT ( 'copyOnClose', copyOnCloseArray )}` +
        `${createEmptyString}  ${optT ( 'setToLengthOnClose', actualSetToLengthOnClose )} ${opt ( 'pageMode', mode )}  ${restForButton ( parent, restOnCommit )} />`;

    }
}

export const makeModalButtons: MakeButton = {
  ModalButton: makeModalButtonInPage,
}




