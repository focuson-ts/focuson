import { DataD } from "../common/dataD";
import { safeArray } from "@focuson/utils";
import { ButtonDefnInPage, PageD, RestOnCommit } from "../common/pageD";
import { PageMode, SetToLengthOnClose } from "@focuson/pages";
import { ButtonCreator, MakeButton } from "../codegen/makeButtons";
import { opt, optT } from "../codegen/codegen";
import { emptyName, modalName, restDetailsName } from "../codegen/names";

export interface CommonModalButtonInPage<G> {
  control: string;
  text?: string;
  modal: PageD<any, G>,
  mode: PageMode,
  restOnCommit?: RestOnCommit,
  copyOnClose?: string[]
  focusOn: string[],
  copyFrom?: string[],
  setToLengthOnClose?: SetToLengthOnClose
}

export function restForButton<B, G> ( parent: PageD<B, G>, rest?: RestOnCommit ): string {
  return rest ? ` rest={${JSON.stringify ( { name: restDetailsName ( parent, rest.rest ), restAction: rest.action, path: safeArray ( rest.target ) } )}}` : ""
}

export function isModalButtonInPage<G> ( m: any ): m is ModalButtonInPage<G> {
  return m.control === 'ModalButton'
}
export interface ModalButtonInPage<G> extends CommonModalButtonInPage<G> {
  control: 'ModalButton',
  createEmpty?: DataD<G>
}
function makeModalButtonInPage<G> (): ButtonCreator<ModalButtonInPage<G>, G> {
  return {
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
}

export function makeModalButtons<G> (): MakeButton<G> {
  return { ModalButton: makeModalButtonInPage<G> (), }
}




