import { Optional, replaceTextFn, Transform } from "@focuson/lens";
import { TagHolder } from "@focuson/template";
import { DateFn, filterObject, PageMode, RestAction, SimpleMessageLevel, toArray } from "@focuson/utils";



export interface ChangeCommand {
  command: string
}
export interface ChangeCommandProcessor<S> {( c: ChangeCommand ): undefined | Transform<S, any>[]}

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
  const a: any = c;
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

export const messageCommandProcessor = <S, MSGs> ( config: DeleteMessageStrictCopySetProcessorsConfig<S, MSGs> ): ChangeCommandProcessor<S> => {
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
export const processDeleteRestWindowCommand = <S, MSGs> ( pageL: Optional<S, PageSelectionForDeleteRestWindowCommand[]> ): ChangeCommandProcessor<S> =>
  ( c: ChangeCommand ) => isDeleteRestWindowCommand ( c ) ? [ [ pageL, old => deleteRestWindowIfNeeded ( c.rest, c.action, old ) ] ] : undefined;


export const composeChangeCommandProcessors = <S> ( ...ps: ChangeCommandProcessor<S>[] ): ChangeCommandProcessor<S> =>
  ( c ) => { return ps.reduce<Transform<S, any>[] | undefined> ( ( acc, p ) => acc === undefined ? p ( c ) : acc, undefined ); };

export function processChangeCommandProcessor<S> ( errorPrefix: string, p: ChangeCommandProcessor<S>, cs: ChangeCommand[] ): Transform<S, any>[] {
  return cs.flatMap ( c => {
    const result = p ( c )
    if ( result === undefined ) throw Error ( `${errorPrefix}. Don't know how to process change command ${JSON.stringify ( c )}` )
    return result
  } )
}
export interface MinimalPageSelection {
  pageName: string;
  firstTime?: boolean;
  time: string;
  pageMode: PageMode;
  focusOn?: string;
}
type CommonCommands = DeleteCommand | MessageCommand | SetChangeCommand | DeleteAllMessages | TimeStampCommand
export type RestChangeCommands = CommonCommands | CopyResultCommand | DeleteRestWindowCommand
export type ModalChangeCommands = CommonCommands | CopyCommand
export type NewPageChangeCommands = CommonCommands | CopyCommand | DeletePageTagsCommand
export type InputChangeCommands = CommonCommands | StrictCopyCommand
export type CommandButtonChangeCommands = CommonCommands | StrictCopyCommand
export type ConfirmWindowChangeCommands = CommonCommands | StrictCopyCommand


export interface DeleteMessageStrictCopySetProcessorsConfig<S, MSGs> {
  toPathTolens: ( path: string ) => Optional<S, any>;
  messageL: Optional<S, MSGs[]>;
  stringToMsg: ( s: string, level?: SimpleMessageLevel ) => MSGs;
  dateFn: DateFn;
  s: S
}
export interface DeleteMessageStrictCopySetProcessorsDeleteTagsConfig<S, MSGs> extends DeleteMessageStrictCopySetProcessorsConfig<S, MSGs> {
  tagHolderL: Optional<S, TagHolder>,
  pageNameFn: ( s: S ) => string,
}
export interface RestAndInputProcessorsConfig<S, Result, MSGs> extends DeleteMessageStrictCopySetProcessorsConfig<S, MSGs> {
  resultPathToLens: ( path: string ) => Optional<Result, any>
  pageL: Optional<S, PageSelectionForDeleteRestWindowCommand[]>
}
export interface HasModalProcessorsConfig<S, MSGS> {
  processorsConfig: ModalProcessorsConfig<S, MSGS>
}
export interface ModalProcessorsConfig<S, MSGs> extends DeleteMessageStrictCopySetProcessorsDeleteTagsConfig<S, MSGs> {
  fromPathTolens: ( path: string ) => Optional<S, any>,
  defaultL: Optional<S, any>;
}
export type  InputProcessorsConfig<S, MSGs> = DeleteMessageStrictCopySetProcessorsConfig<S, MSGs>

export function deleteMessageSetProcessors<S, MSGs> ( config: DeleteMessageStrictCopySetProcessorsConfig<S, MSGs> ): ChangeCommandProcessor<S> {
  const { toPathTolens, messageL, dateFn } = config
  return composeChangeCommandProcessors (
    processDeleteAllMessagesCommand ( messageL ),
    deleteCommandProcessor ( toPathTolens ),
    setCommandProcessor ( toPathTolens ),
    timeStampCommandProcessor ( toPathTolens, dateFn ),
    messageCommandProcessor ( config )
  )
}

export const restChangeCommandProcessors = <S, Result, MSGs> ( config: RestAndInputProcessorsConfig<S, Result, MSGs> ) =>
  ( result: Result ) =>
    composeChangeCommandProcessors (
      deleteMessageSetProcessors ( config ),
      processDeleteRestWindowCommand ( config.pageL ),
      copyResultCommandProcessor ( config.resultPathToLens, config.toPathTolens ) ( result ) );

export const modalCommandProcessors = <S, MSGs> ( config: ModalProcessorsConfig<S, MSGs> ) => ( s: S ) => {
  const { fromPathTolens, toPathTolens, tagHolderL, pageNameFn, defaultL } = config
  return composeChangeCommandProcessors (
    deletePageTagsCommandProcessor ( tagHolderL, pageNameFn, s ),
    deleteMessageSetProcessors ( config ),
    copyCommandProcessor ( fromPathTolens, toPathTolens, defaultL ) ( s ) );
};

export const newPageCommandProcessors = <S, MSGs> ( config: ModalProcessorsConfig<S, MSGs> ) => ( s: S ): ChangeCommandProcessor<S> => {
  const { fromPathTolens, toPathTolens, defaultL } = config
  return composeChangeCommandProcessors (
    deletePageTagsCommandProcessor ( config.tagHolderL, config.pageNameFn, s ),
    deleteMessageSetProcessors ( config ),
    copyCommandProcessor ( fromPathTolens, toPathTolens, defaultL ) ( s ) );
};


export const inputCommandProcessors = <S, MSGs> ( config: InputProcessorsConfig<S, MSGs> ) => ( s: S ) => {
  const { toPathTolens } = config
  return composeChangeCommandProcessors (
    deleteMessageSetProcessors ( config ),
    strictCopyCommandProcessor ( toPathTolens, toPathTolens ) ( s ) );
};
export const commandButtonCommandProcessors = <S, MSGs> ( config: InputProcessorsConfig<S, MSGs> ) => ( s: S ) => {
  const { toPathTolens } = config
  return composeChangeCommandProcessors (
    deleteMessageSetProcessors ( config ),
    strictCopyCommandProcessor ( toPathTolens, toPathTolens ) ( s ) );
};

export const confirmWindowCommandProcessors = <S, MSGs> ( config: InputProcessorsConfig<S, MSGs> ) => ( s: S ) => {
  const { toPathTolens } = config
  return composeChangeCommandProcessors (
    deleteMessageSetProcessors ( config ),
    strictCopyCommandProcessor ( toPathTolens, toPathTolens ) ( s ) );
};



