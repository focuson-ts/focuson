import { DataD } from "../common/dataD";
import { isMainPage, PageD, RestOnCommit } from "../common/pageD";
import { CopyDetails, CopyStringDetails, PageMode, PageParams, SetToLengthOnClose } from "@focuson/pages";
import { ButtonCreator, MakeButton, makeIdForButton } from "../codegen/makeButtons";
import { indentList, opt, optT } from "../codegen/codegen";
import { emptyName, modalName, restDetailsName } from "../codegen/names";
import { EnabledBy, enabledByString } from "./enabledBy";


export interface CommonModalButtonInPage<G> extends EnabledBy {
  control: string;
  text?: string;
  enabledBy?: string;
  modal: PageD<any, G>,
  mode: PageMode,
  pageParams?: PageParams,
  restOnCommit?: RestOnCommit,
  copy?: CopyDetails | CopyDetails[],
  copyOnClose?: CopyDetails | CopyDetails[];
  copyJustString?: CopyStringDetails | CopyStringDetails[],
  focusOn: string,
  setToLengthOnClose?: SetToLengthOnClose
}

export function restForButton<B, G> ( parent: PageD<B, G>, rest?: RestOnCommit ): string[] {
  if ( !rest ) return []
  if ( !isMainPage ( parent ) ) throw new Error ( `Cannot have a rest for button on a page that isn't a main page at the moment. Page is ${parent.name}. Rest is ${JSON.stringify ( rest )}` )
  const rd = parent.rest[ rest.restName ]
  if ( !rd ) throw new Error ( `Illegal rest name ${rest.restName} on page ${parent.name}. Legal values are ${Object.values ( parent.rest )}` )
  const deleteOnSuccess = rest.result === 'refresh' ? { deleteOnSuccess: rest.pathToDelete } : {}
  return [ ` rest={${JSON.stringify ( { name: restDetailsName ( parent, rest.restName, rd.rest ), restAction: rest.action,...deleteOnSuccess } ) }}` ]
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
        const { modal, mode, restOnCommit, focusOn, copy, createEmpty, copyOnClose, copyJustString, setToLengthOnClose, text, pageParams, enabledBy } = button
        const createEmptyString = createEmpty ? [ `createEmpty={${params.emptyFile}.${emptyName ( createEmpty )}}` ] : []


        const copyOnCloseArray: CopyDetails[] = copyOnClose ? singleToList ( copyOnClose ) : undefined
        const copyFromArray: CopyDetails[] = copy ? singleToList ( copy ) : undefined
        return [ `<${button.control} id=${makeIdForButton ( name )} ${enabledByString ( button )}text='${text ? text : name}'  state={state} modal = '${modalName ( parent, modal )}'  `,
          ...indentList ( [
            ...opt ( 'pageMode', mode ),
            ...opt ( 'focusOn', focusOn ),
            ...optT ( 'copy', copyFromArray ),
            ...optT ( 'copyOnClose', copyOnCloseArray ),
            ...optT ( 'copyJustString', copyJustString ? singleToList ( copyJustString ) : undefined ),
            ...optT ( 'pageParams', pageParams ),
            ...createEmptyString,
            ...optT ( 'setToLengthOnClose', setToLengthOnClose ),
            ...restForButton ( parent, restOnCommit ) ] ), '/>' ]

      }
  }
}

export function makeModalButtons<G> (): MakeButton<G> {
  return { ModalButton: makeModalButtonInPage<G> (), }
}




