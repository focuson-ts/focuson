import { Optional, Transform } from "@focuson/lens";

export interface ChangeCommand {
  command: string
}
export interface ChangeCommandProcessor<S> {( c: ChangeCommand ): undefined | Transform<S, any>[]}

export interface DeleteCommand extends ChangeCommand {
  command: 'delete';
  path: string;
}
const isDeleteCommand = ( c: ChangeCommand ): c is DeleteCommand => c.command === 'delete';
export const deleteCommandProcessor = <S> ( pathToLens: ( path: string ) => Optional<S, any> ): ChangeCommandProcessor<S> =>
  ( c ) => isDeleteCommand ( c ) ? [ [ pathToLens ( c.path ), () => undefined ] ] : undefined;

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
  ( c ) => isStrictCopyCommand ( c ) ? [ [ toPathToLens ( c.to ), () => fromPathToLens ( c.from ).getOption ( s ) ] ] : undefined;

export interface MessageCommand extends ChangeCommand {
  command: 'message'
  msg: string;
}
const isMessageCommand = ( c: ChangeCommand ): c is MessageCommand => c.command === 'message';
export const messageCommandProcessor = <S, MSGs> ( msgL: Optional<S, MSGs[]>, stringToMsg: ( s: string ) => MSGs ): ChangeCommandProcessor<S> =>
  ( c ) => isMessageCommand ( c ) ? [ [ msgL, old => [ stringToMsg ( c.msg ), ...old ] ] ] : undefined

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
    ( c ) => isCopyResultCommand ( c ) ? [ [ toPathToLens ( c.to ), () => pathToResultL ( c.from ).getOption ( result ) ] ] : undefined

export const composeChangeCommandProcessors = <S> ( ...ps: ChangeCommandProcessor<S>[] ): ChangeCommandProcessor<S> =>
  ( c ) => { return ps.reduce<Transform<S, any>[] | undefined> ( ( acc, p ) => acc === undefined ? p ( c ) : acc, undefined ); };

export function processChangeCommandProcessor<S> ( errorPrefix: string, p: ChangeCommandProcessor<S>, cs: ChangeCommand[] ): Transform<S, any>[] {
  return cs.flatMap ( c => {
    const result = p ( c )
    if ( result === undefined ) throw Error ( `${errorPrefix}. Don't know how to process change command ${JSON.stringify(c)}` )
    return result
  } )
}

export type RestChangeCommands = DeleteCommand | MessageCommand | CopyResultCommand | SetChangeCommand
export type ModalChangeCommands = DeleteCommand | MessageCommand | CopyCommand | StrictCopyCommand | SetChangeCommand

export interface DeleteMessageStrictCopySetProcessorsConfig<S, MSGs> {
  toPathTolens: ( path: string ) => Optional<S, any>;
  messageL: Optional<S, MSGs[]>;
  stringToMsg: ( s: string ) => MSGs
}
export interface RestProcessorsConfig<S, Result, MSGs> extends DeleteMessageStrictCopySetProcessorsConfig<S, MSGs> {
  resultPathToLens: ( path: string ) => Optional<Result, any>,
}
export interface ModalProcessorsConfig<S, MSGs> extends DeleteMessageStrictCopySetProcessorsConfig<S, MSGs> {
  fromPathTolens: ( path: string ) => Optional<S, any>,
  defaultL: Optional<S, any>;
}

export function deleteMessageSetProcessors<S, MSGs> ( config: DeleteMessageStrictCopySetProcessorsConfig<S, MSGs> ): ChangeCommandProcessor<S> {
  const { toPathTolens, messageL, stringToMsg } = config
  return composeChangeCommandProcessors (
    deleteCommandProcessor ( toPathTolens ),
    setCommandProcessor ( toPathTolens ),
    messageCommandProcessor ( messageL, stringToMsg )
  )
}

export const restChangeCommandProcessors = <S, Result, MSGs> ( config: RestProcessorsConfig<S, Result, MSGs> ) =>
  ( result: Result ) =>
    composeChangeCommandProcessors (
      deleteMessageSetProcessors ( config ),
      copyResultCommandProcessor ( config.resultPathToLens, config.toPathTolens ) ( result ) );

export const modalCommandProcessors = <S, MSGs> ( config: ModalProcessorsConfig<S, MSGs> ) => ( s: S ) => {
  const { fromPathTolens, toPathTolens, defaultL } = config
  return composeChangeCommandProcessors (
    strictCopyCommandProcessor ( fromPathTolens, toPathTolens ) ( s ),
    deleteMessageSetProcessors ( config ),
    copyCommandProcessor ( fromPathTolens, toPathTolens, defaultL ) ( s ) );
};



