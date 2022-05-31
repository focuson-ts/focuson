import { DataD } from "../common/dataD";
import { isMainPage, PageD, RestOnCommit } from "../common/pageD";
import { CopyDetails, CopyStringDetails, PageMode, PageParams, SetToLengthOnClose } from "@focuson/pages";
import { ButtonCreator, MakeButton, makeIdForButton } from "../codegen/makeButtons";
import { indentList, opt, optT } from "../codegen/codegen";
import { emptyName, modalName, restDetailsName } from "../codegen/names";
import { EnabledBy, enabledByString } from "./enabledBy";
import { decamelize } from "@focuson/utils";


export interface CommonModalButtonInPage<G> extends EnabledBy {
  control: string;
  text?: string;
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
  const { action, restName, messageOnSuccess } = rest
  return [ ` rest={${JSON.stringify ( { name: restDetailsName ( parent, restName, rd.rest ), restAction: action, messageOnSuccess, ...deleteOnSuccess } )}}` ]
}

export function isModalButtonInPage<G> ( m: any ): m is ModalButtonInPage<G> {
  return m.control === 'ModalButton'
}
export interface ModalButtonInPage<G> extends CommonModalButtonInPage<G> {
  control: 'ModalButton',
  createEmpty?: DataD<G>;
  createEmptyIfUndefined?: DataD<G>;
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
        const { modal, mode, restOnCommit, focusOn, copy, createEmpty, createEmptyIfUndefined, copyOnClose, copyJustString, setToLengthOnClose, text, pageParams, buttonType } = button
        const createEmptyString = createEmpty ? [ `createEmpty={${params.emptyFile}.${emptyName ( createEmpty )}}` ] : []
        const createEmptyIfUndefinedString = createEmptyIfUndefined ? [ `createEmptyIfUndefined={${params.emptyFile}.${emptyName ( createEmptyIfUndefined )}}` ] : []
        createEmptyIfUndefined

        const copyOnCloseArray: CopyDetails[] = copyOnClose ? singleToList ( copyOnClose ) : undefined
        const copyFromArray: CopyDetails[] = copy ? singleToList ( copy ) : undefined
        return [ `<${button.control} id=${makeIdForButton ( name )} ${enabledByString ( button )}text='${text ? text : decamelize ( name, ' ' )}'  state={state} modal = '${modalName ( parent, modal )}'  `,
          ...indentList ( [
            ...opt ( 'pageMode', mode ),
            ...opt ( 'focusOn', focusOn ),
            ...optT ( 'buttonType', buttonType ),
            ...optT ( 'copy', copyFromArray ),
            ...optT ( 'copyOnClose', copyOnCloseArray ),
            ...optT ( 'copyJustString', copyJustString ? singleToList ( copyJustString ) : undefined ),
            ...optT ( 'pageParams', pageParams ),
            ...createEmptyString,
            ...createEmptyIfUndefinedString,
            ...optT ( 'setToLengthOnClose', setToLengthOnClose ),
            ...restForButton ( parent, restOnCommit ) ] ), '/>' ]

      }
  }
}

export function makeModalButtons<G> (): MakeButton<G> {
  return { ModalButton: makeModalButtonInPage<G> (), }
}




