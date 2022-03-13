import { DataD } from "../common/dataD";
import { safeArray } from "@focuson/utils";
import { PageD, RestOnCommit } from "../common/pageD";
import { CopyDetails, PageMode, SetToLengthOnClose } from "@focuson/pages";
import { ButtonCreator, MakeButton } from "../codegen/makeButtons";
import { indentList, opt, optT } from "../codegen/codegen";
import { emptyName, modalName, restDetailsName } from "../codegen/names";


export interface CommonModalButtonInPage<G> {
  control: string;
  text?: string;
  modal: PageD<any, G>,
  mode: PageMode,
  restOnCommit?: RestOnCommit,
  copy?: CopyDetails | CopyDetails[],
  copyOnClose?: CopyDetails | CopyDetails[];
  focusOn: string[],
  setToLengthOnClose?: SetToLengthOnClose
}

export function restForButton<B, G> ( parent: PageD<B, G>, rest?: RestOnCommit ): string[] {
  return rest ? [ ` rest={${JSON.stringify ( { name: restDetailsName ( parent, rest.rest ), restAction: rest.action, path: safeArray ( rest.target ) } )}}` ] : []
}

export function isModalButtonInPage<G> ( m: any ): m is ModalButtonInPage<G> {
  return m.control === 'ModalButton'
}
export interface ModalButtonInPage<G> extends CommonModalButtonInPage<G> {
  control: 'ModalButton',
  createEmpty?: DataD<G>
}
const addToStart = ( parent: string ) => ( copy: CopyDetails ) => {
  const result: CopyDetails = {}
  if ( copy.from ) result.from = [ parent, ...copy.from ]
  if ( copy.to ) result.to = [ parent, ...copy.to ]
  return result
};
function singleToList<T> ( ts: T | T[] ): T[] {
  if ( Array.isArray ( ts ) ) return ts
  return [ ts ]
}
function makeModalButtonInPage<G> (): ButtonCreator<ModalButtonInPage<G>, G> {
  return {
    import: "@focuson/pages",
    makeButton:
      ( { params, parent, name, button } ) => {
        const { modal, mode, restOnCommit, focusOn, copy, createEmpty, copyOnClose, setToLengthOnClose, text } = button
        const createEmptyString = createEmpty ? [ `createEmpty={${params.emptyFile}.${emptyName ( createEmpty )}}` ] : []

        const focusOnArray = [ parent.name, ...focusOn ]
        const copyOnCloseArray = copyOnClose ? singleToList ( copyOnClose ).map ( addToStart ( parent.name ) ) : undefined
        const copyFromArray = copy ? singleToList ( copy ).map ( addToStart ( parent.name ) ) : undefined
        const actualSetToLengthOnClose = setToLengthOnClose ? { array: [ parent.name, ...setToLengthOnClose.array ], variable: [ parent.name, ...setToLengthOnClose.variable ] } : undefined
        return [ `<${button.control} id='${name}' text='${text ? text : name}'  state={state} modal = '${modalName ( parent, modal )}'  `,
          ...indentList ( [
            ...opt ( 'pageMode', mode ),
            ...optT ( 'focusOn', focusOnArray ),
            ...optT ( 'copy', copyFromArray ),
            ...optT ( 'copyOnClose', copyOnCloseArray ),
            ...createEmptyString,
            ...optT ( 'setToLengthOnClose', actualSetToLengthOnClose ),
            ...restForButton ( parent, restOnCommit ) ] ), '/>' ]

      }
  }
}

export function makeModalButtons<G> (): MakeButton<G> {
  return { ModalButton: makeModalButtonInPage<G> (), }
}




