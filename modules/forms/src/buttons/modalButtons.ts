import { DataD } from "../common/dataD";
import { safeArray, sortedEntries } from "@focuson/utils";
import { isMainPage, PageD, RestOnCommit } from "../common/pageD";
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
  focusOn: string,
  setToLengthOnClose?: SetToLengthOnClose
}

export function restForButton<B, G> ( parent: PageD<B, G>, rest?: RestOnCommit ): string[] {
  if ( !rest ) return []
  if ( !isMainPage ( parent ) ) throw new Error ( `Cannot have a rest for button on a page that isn't a main page at the moment. Page is ${parent.name}. Rest is ${JSON.stringify ( rest )}` )
  const rd = parent.rest[ rest.restName ]
  if ( !rd ) throw new Error ( `Illegal rest name ${rest.restName} on page ${parent.name}. Legal values are ${Object.values ( parent.rest )}` )
  return [ ` rest={${JSON.stringify ( { name: restDetailsName ( parent, rest.restName, rd.rest ), restAction: rest.action } )}}` ]
}

export function isModalButtonInPage<G> ( m: any ): m is ModalButtonInPage<G> {
  return m.control === 'ModalButton'
}
export interface ModalButtonInPage<G> extends CommonModalButtonInPage<G> {
  control: 'ModalButton',
  createEmpty?: DataD<G>
}

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

        const focusOnArray = [ '{basePage}', ...focusOn ]
        const copyOnCloseArray = copyOnClose ? singleToList ( copyOnClose ) : undefined
        const copyFromArray = copy ? singleToList ( copy ) : undefined
        const actualSetToLengthOnClose = setToLengthOnClose ? { array: [ ...setToLengthOnClose.array ], variable: [ ...setToLengthOnClose.variable ] } : undefined
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




