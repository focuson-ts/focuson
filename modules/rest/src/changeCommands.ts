import { Optional, replaceTextFn, Transform } from "@focuson/lens";
import { TagHolder } from "@focuson/template";
import { anyIntoPrimitive, CopyDetails, DateFn, filterObject, PageMode, RestAction, SimpleMessageLevel, toArray } from "@focuson/utils";


export interface ChangeCommand {
  command: string
}
export interface ChangeCommandProcessor<S> {( c: ChangeCommand ): undefined | Transform<S, any>[]}

export interface CopyJustStringsCommands {
  command: 'copyJustStrings',
  from: string,
  to: string,
  joiner: string
}

export function isCopyJustStringsCommand ( c: ChangeCommand ): c is CopyJustStringsCommands {
  return c.command === 'copyJustStrings'
}

export function copyJustStringsCommandProcessor<S> ( fromPathToLens: ( path: string ) => Optional<S, any>, toPathToLens: ( path: string ) => Optional<S, any>, s: S ): ChangeCommandProcessor<S> {
  return c => isCopyJustStringsCommand ( c ) ? [ [ toPathToLens ( c.to ), () => {
    const fromL = fromPathToLens ( c.from );
    const from = fromL.getOption ( s );
    return anyIntoPrimitive ( from, c.joiner ); } ] ] : undefined
}


export interface DeleteCommand extends ChangeCommand {
  command: 'delete';
  path: string | string[];
}
const isDeleteCommand = ( c: ChangeCommand ): c is DeleteCommand => c.command === 'delete';
export const deleteCommandProcessor = <S> ( pathToLens: ( path: string ) => Optional<S, any> ): ChangeCommandProcessor<S> =>
  ( c ) => isDeleteCommand ( c ) ? toArray ( c.path ).map ( p => [ pathToLens ( p ), () => undefined ] ) : undefined;


export interface DeletePageTagsCommand extends ChangeCommand {
  command: 'deletePageTags';
}
const isDeletePageTagsCommand = ( c: ChangeCommand ): c is DeletePageTagsCommand => c.command === 'deletePageTags';
export const deletePageTagsCommandProcessor = <S> ( tagHolderL: Optional<S, TagHolder>, pageNameFn: ( s: S ) => string, s: S ): ChangeCommandProcessor<S> =>
  ( c ) => {
    if ( isDeletePageTagsCommand ( c ) ) {
      const marker = pageNameFn ( s ) + "_"
      return [ [ tagHolderL, tags => filterObject ( tags, ( [ name, v ] ) => !name.startsWith ( marker ) ) ] ]
    }
  }


export interface SetChangeCommand extends ChangeCommand {
  command: 'set'
  path: string;
  value: any;
}
const isSetCommand = ( c: ChangeCommand ): c is SetChangeCommand => c.command === 'set';
export const setCommandProcessor = <S> ( pathToLens: ( path: string ) => Optional<S, any> ): ChangeCommandProcessor<S> =>
  ( c ) => isSetCommand ( c ) ? [ [ pathToLens ( c.path ), () => c.value ] ] : undefined;

export interface CopyCommand extends ChangeCommand {
  command: 'copy',
  from?: string;
  to?: string;
  joiner?: string
}
const isCopyCommand = ( c: ChangeCommand ): c is CopyCommand => c.command === 'copy';

export const copyCommandProcessor = <S> ( fromPathToLens: ( path: string ) => Optional<S, any>, toPathToLens: ( path: string ) => Optional<S, any>, defaultLens: Optional<S, any> ) => ( s: S ): ChangeCommandProcessor<S> =>
  ( c ) => isCopyCommand ( c ) ? [ [ c.to ? toPathToLens ( c.to ) : defaultLens, () => (c.from ? fromPathToLens ( c.from ) : defaultLens).getOption ( s ) ] ] : undefined;

export interface StrictCopyCommand extends ChangeCommand {
  command: 'copy',
  from: string;
  to: string;
  joiner?: string
}
const isStrictCopyCommand = ( c: ChangeCommand ): c is StrictCopyCommand => {
  const a: any = c;
  return a.from && a.to && c.command === 'copy';
}

export const strictCopyCommandProcessor = <S> ( fromPathToLens: ( path: string ) => Optional<S, any>, toPathToLens: ( path: string ) => Optional<S, any> ) => ( s: S ): ChangeCommandProcessor<S> =>
  ( c ) => isStrictCopyCommand ( c ) ? [ [ toPathToLens ( c.to ), () => {
    // console.log ( 'strictCommandProcessor', s,c, fromPathToLens ( c.from ).description, fromPathToLens(c.from).getOption(s) )
    return fromPathToLens ( c.from ).getOption ( s );
  } ] ] : undefined;

export interface TimeStampCommand extends ChangeCommand {
  command: 'timestamp',
  path: string;
}
export function isTimeStampCommand ( c: ChangeCommand ): c is TimeStampCommand {
    return c && c.command === 'timestamp'
}
export const timeStampCommandProcessor = <S> ( pathToLens: ( path: string ) => Optional<S, any>, dateFn: DateFn ): ChangeCommandProcessor<S> =>
  c => isTimeStampCommand ( c ) ? [ [ pathToLens ( c.path ), () => dateFn () ] ] : undefined


export interface MessageCommand extends ChangeCommand {
  command: 'message'
  msg: string;
  level?: SimpleMessageLevel
}
const isMessageCommand = ( c: ChangeCommand ): c is MessageCommand => c.command === 'message';

export const messageCommandProcessor = <S, MSGs, PS extends MinimalPageSelection> ( config: DeleteMessageStrictCopySetProcessorsConfig<S, MSGs, PS> ): ChangeCommandProcessor<S> => {
  const { messageL, stringToMsg, toPathTolens, s } = config
  return c => {
    if ( isMessageCommand ( c ) ) {
      //@ts-ignore
      const replacer: ( str: string ) => string = str => replaceTextFn<S> ( '', s, toPathTolens, str );
      const res = c.msg.replace ( /{[^}]*}/g, replacer )
      return [ [ messageL, old => [ stringToMsg ( res, c.level ), ...old ] ] ];
    }
  }
}

export interface CopyResultCommand extends ChangeCommand {
  command: 'copyResult',
  from: string;
  to: string;
}
function isCopyResultCommand ( c: ChangeCommand ): c is CopyResultCommand {
  return c.command === 'copyResult'
}
export const copyResultCommandProcessor = <S, Result> ( pathToResultL: ( path: string ) => Optional<Result, any>, toPathToLens: ( path: string ) => Optional<S, any> ) =>
  ( result: Result ): ChangeCommandProcessor<S> =>
    ( c ) => isCopyResultCommand ( c ) ? [ [ toPathToLens ( c.to ), () => c.from === '' ? result : pathToResultL ( c.from ).getOption ( result ) ] ] : undefined

export interface DeleteAllMessages extends ChangeCommand {
  command: 'deleteAllMessages'
}
export const processDeleteAllMessagesCommand = <S, MSGs> ( messageL: Optional<S, MSGs[]> ): ChangeCommandProcessor<S> =>
  ( c: ChangeCommand ) => c.command === 'deleteAllMessages' ? [ [ messageL, old => [] ] ] : undefined;

interface RestAndAction {
  rest: string,
  action: RestAction
}
export interface PageSelectionForDeleteRestWindowCommand {
  pageName: string
  arbitraryParams?: RestAndAction
}
export interface DeleteRestWindowCommand extends RestAndAction {
  command: 'deleteRestWindow',
  rest: string,
  action: RestAction
}
export function isDeleteRestWindowCommand ( c: ChangeCommand ): c is DeleteRestWindowCommand {
  return c.command === 'deleteRestWindow'
}
function deleteRestWindowIfNeeded ( rest: string, action: RestAction, ps: PageSelectionForDeleteRestWindowCommand[] ) {
  console.log ( 'deleteRestWindowIfNeeded', rest, action, ps )
  const shouldDelete = ( p: PageSelectionForDeleteRestWindowCommand ) => (p.pageName === 'restLoader' && p.arbitraryParams?.rest === rest && p.arbitraryParams?.action.toString () === action.toString ());
  return ps.filter ( p => !shouldDelete ( p ) )
}
export const processDeleteRestWindowCommand = <S, MSGs, PS extends MinimalPageSelection> ( pageSelectionL: Optional<S, PS[]> ): ChangeCommandProcessor<S> =>
  ( c: ChangeCommand ) => isDeleteRestWindowCommand ( c ) ? [ [ pageSelectionL, old => deleteRestWindowIfNeeded ( c.rest, c.action, old ) ] ] : undefined;


export const composeChangeCommandProcessors = <S> ( ...ps: ChangeCommandProcessor<S>[] ): ChangeCommandProcessor<S> =>
  ( c ) => { return ps.reduce<Transform<S, any>[] | undefined> ( ( acc, p ) => acc === undefined ? p ( c ) : acc, undefined ); };

export function processChangeCommandProcessor<S> ( errorPrefix: string, p: ChangeCommandProcessor<S>, cs: ChangeCommand[] ): Transform<S, any>[] {
  return cs.flatMap ( c => {
    const result = p ( c )
    if ( result === undefined ) throw Error ( `${errorPrefix}. Don't know how to process change command ${JSON.stringify ( c )}` )
    return result
  } )
}
export interface MinimalPageSelection extends PageSelectionForDeleteRestWindowCommand {
  pageName: string;
  firstTime?: boolean;
  time: string;
  pageMode: PageMode;
  focusOn?: string;
}
export interface MinimalModalPageSelectionForCommand {
  type: 'modal'
  pageName: string;
  pageMode: PageMode;
  focusOn: string;
  copyOnClose?: CopyDetails[],
  changeOnClose?: ModalChangeCommands | ModalChangeCommands[]
}
export interface MinimalMainPageSelectionForCommand {
  type: 'main'
  pageName: string;
  pageMode: PageMode;
}
export type MinimalPageSelectionForCommand = MinimalModalPageSelectionForCommand | MinimalMainPageSelectionForCommand

export interface OpenModalPageCommand extends ChangeCommand {
  command: 'openPage'
  page: MinimalModalPageSelectionForCommand
}
export interface OpenMainPageCommand extends ChangeCommand {
  command: 'openPage'
  page: MinimalMainPageSelectionForCommand
}

export function isOpenMainPageCommand ( c: ChangeCommand ): c is OpenMainPageCommand {
  const a: any = c
  return c.command === 'openPage' && a.page.type === 'main'
}
export function isOpenModalPageCommand ( c: ChangeCommand ): c is OpenModalPageCommand {
  const a: any = c
  return c.command === 'openPage' && a.page.type === 'modal'

}

export function processOpenModalPageCommandProcessor<S, PS extends MinimalPageSelection> ( pageSelectionL: Optional<S, PS[]>, dateFn: DateFn ): ChangeCommandProcessor<S> {
  function makePageSelection ( ps: MinimalPageSelectionForCommand[], m: MinimalPageSelectionForCommand ): MinimalPageSelection {
    if ( ps.length === 0 ) throw Error ( `Trying to open modal window, but there are no open pages` )
    const last = ps[ ps.length - 1 ]
    const copy = { ...m }
    // @ts-ignore
    delete copy.type
    if ( m.type === 'modal' ) return { ...copy, pageName: `${last.pageName}_${m.pageName}`, time: dateFn (), firstTime: true }
    throw new Error ( `Cannot work out type of window in ${JSON.stringify ( m )}` )
  }
  return c => isOpenModalPageCommand ( c ) ? [ [ pageSelectionL, ps => [ ...ps, makePageSelection ( ps, c.page ) ] ] ] : undefined
}
export function processOpenMainPageCommandProcessor<S, PS extends MinimalPageSelection> ( pageSelectionL: Optional<S, PS[]>, dateFn: DateFn ): ChangeCommandProcessor<S> {
  function makePageSelection ( ps: MinimalPageSelectionForCommand[], m: MinimalPageSelectionForCommand ): MinimalPageSelection {
    const copy = { ...m }
    // @ts-ignore
    delete copy.type
    if ( m.type === 'main' ) return { ...copy, time: dateFn (), firstTime: true }
    throw new Error ( `Cannot work out type of window in ${JSON.stringify ( m )}` )
  }
  return c => isOpenMainPageCommand ( c ) ? [ [ pageSelectionL, ps => [ ...ps, makePageSelection ( ps, c.page ) ] ] ] : undefined
}


type CommonCommands = DeleteCommand | MessageCommand | SetChangeCommand | DeleteAllMessages | TimeStampCommand | CopyJustStringsCommands
export type RestChangeCommands = CommonCommands | CopyResultCommand | DeleteRestWindowCommand | OpenModalPageCommand
export type ModalChangeCommands = CommonCommands | CopyCommand | OpenModalPageCommand | OpenMainPageCommand
export type NewPageChangeCommands = CommonCommands | CopyCommand | DeletePageTagsCommand
export type InputChangeCommands = CommonCommands | StrictCopyCommand | OpenModalPageCommand | OpenMainPageCommand
export type CommandButtonChangeCommands = CommonCommands | StrictCopyCommand | OpenModalPageCommand | OpenMainPageCommand
export type ConfirmWindowChangeCommands = CommonCommands | StrictCopyCommand | OpenModalPageCommand | OpenMainPageCommand


export interface DeleteMessageStrictCopySetProcessorsConfig<S, MSGs, PS extends MinimalPageSelection> {
  toPathTolens: ( path: string ) => Optional<S, any>;
  messageL: Optional<S, MSGs[]>;
  stringToMsg: ( s: string, level?: SimpleMessageLevel ) => MSGs;
  dateFn: DateFn;
  s: S
  pageSelectionL: Optional<S, PS[]>
}
export interface DeleteMessageStrictCopySetProcessorsDeleteTagsConfig<S, MSGs, PS extends MinimalPageSelection> extends DeleteMessageStrictCopySetProcessorsConfig<S, MSGs, PS> {
  tagHolderL: Optional<S, TagHolder>,
  pageNameFn: ( s: S ) => string,
}
export interface RestAndInputProcessorsConfig<S, Result, MSGs, PS extends MinimalPageSelection> extends DeleteMessageStrictCopySetProcessorsConfig<S, MSGs, PS> {
  resultPathToLens: ( path: string ) => Optional<Result, any>
  pageSelectionL: Optional<S, PS[]>
}
export interface HasModalProcessorsConfig<S, MSGS, PS extends MinimalPageSelection> {
  processorsConfig: ModalProcessorsConfig<S, MSGS, PS>
}
export interface ModalProcessorsConfig<S, MSGs, PS extends MinimalPageSelection> extends DeleteMessageStrictCopySetProcessorsDeleteTagsConfig<S, MSGs, PS> {
  fromPathTolens: ( path: string ) => Optional<S, any>,
  defaultL: Optional<S, any>;
}
export type  InputProcessorsConfig<S, MSGs, PS extends MinimalPageSelection> = DeleteMessageStrictCopySetProcessorsConfig<S, MSGs, PS>

export function commonProcessors<S, MSGs, PS extends MinimalPageSelection> ( config: DeleteMessageStrictCopySetProcessorsConfig<S, MSGs, PS> ): ChangeCommandProcessor<S> {
  const { toPathTolens, messageL, dateFn } = config
  return composeChangeCommandProcessors (
    processDeleteAllMessagesCommand ( messageL ),
    deleteCommandProcessor ( toPathTolens ),
    setCommandProcessor ( toPathTolens ),
    timeStampCommandProcessor ( toPathTolens, dateFn ),
    messageCommandProcessor ( config )
  )
}

export const restChangeCommandProcessors = <S, Result, MSGs, PS extends MinimalPageSelection> ( config: RestAndInputProcessorsConfig<S, Result, MSGs, PS> ) =>
  ( result: Result ) =>
    composeChangeCommandProcessors (
      commonProcessors ( config ),
      copyJustStringsCommandProcessor ( config.toPathTolens, config.toPathTolens, config.s ),
      processOpenModalPageCommandProcessor ( config.pageSelectionL, config.dateFn ),
      processDeleteRestWindowCommand ( config.pageSelectionL ),
      copyResultCommandProcessor ( config.resultPathToLens, config.toPathTolens ) ( result ) );

export const modalCommandProcessors = <S, MSGs, PS extends MinimalPageSelection> ( config: ModalProcessorsConfig<S, MSGs, PS> ) => ( s: S ) => {
  const { fromPathTolens, toPathTolens, tagHolderL, pageNameFn, defaultL } = config
  return composeChangeCommandProcessors (
    deletePageTagsCommandProcessor ( tagHolderL, pageNameFn, s ),
    copyJustStringsCommandProcessor ( config.fromPathTolens, config.toPathTolens, config.s ),
    commonProcessors ( config ),
    processOpenModalPageCommandProcessor ( config.pageSelectionL, config.dateFn ),
    processOpenMainPageCommandProcessor ( config.pageSelectionL, config.dateFn ),
    copyCommandProcessor ( fromPathTolens, toPathTolens, defaultL ) ( s ) );
};

export const newPageCommandProcessors = <S, MSGs, PS extends MinimalPageSelection> ( config: ModalProcessorsConfig<S, MSGs, PS> ) => ( s: S ): ChangeCommandProcessor<S> => {
  const { fromPathTolens, toPathTolens, defaultL } = config
  return composeChangeCommandProcessors (
    deletePageTagsCommandProcessor ( config.tagHolderL, config.pageNameFn, s ),
    copyJustStringsCommandProcessor ( config.toPathTolens, config.toPathTolens, config.s ),
    commonProcessors ( config ),
    copyCommandProcessor ( fromPathTolens, toPathTolens, defaultL ) ( s ) );
};


export const inputCommandProcessors = <S, MSGs, PS extends MinimalPageSelection> ( config: InputProcessorsConfig<S, MSGs, PS> ) => ( s: S ) => {
  const { toPathTolens } = config
  return composeChangeCommandProcessors (
    commonProcessors ( config ),
    copyJustStringsCommandProcessor ( config.toPathTolens, config.toPathTolens, config.s ),
    processOpenModalPageCommandProcessor ( config.pageSelectionL, config.dateFn ),
    processOpenMainPageCommandProcessor ( config.pageSelectionL, config.dateFn ),
    strictCopyCommandProcessor ( toPathTolens, toPathTolens ) ( s ) );
};
export const commandButtonCommandProcessors = <S, MSGs, PS extends MinimalPageSelection> ( config: InputProcessorsConfig<S, MSGs, PS> ) => ( s: S ) => {
  const { toPathTolens } = config
  return composeChangeCommandProcessors (
    commonProcessors ( config ),
    copyJustStringsCommandProcessor ( config.toPathTolens, config.toPathTolens, config.s ),
    processOpenModalPageCommandProcessor ( config.pageSelectionL, config.dateFn ),
    processOpenMainPageCommandProcessor ( config.pageSelectionL, config.dateFn ),
    strictCopyCommandProcessor ( toPathTolens, toPathTolens ) ( s ) );
};

export const confirmWindowCommandProcessors = <S, MSGs, PS extends MinimalPageSelection> ( config: InputProcessorsConfig<S, MSGs, PS> ) => ( s: S ) => {
  const { toPathTolens } = config
  return composeChangeCommandProcessors (
    commonProcessors ( config ),
    copyJustStringsCommandProcessor ( config.toPathTolens, config.toPathTolens, config.s ),
    processOpenModalPageCommandProcessor ( config.pageSelectionL, config.dateFn ),
    processOpenMainPageCommandProcessor ( config.pageSelectionL, config.dateFn ),
    strictCopyCommandProcessor ( toPathTolens, toPathTolens ) ( s ) );
};



