import { Optional, Transform } from "@focuson/lens";

export interface ChangeCommand {
  command: string
}
export interface ChangeCommandProcessor<S> {( s: S, c: ChangeCommand ): undefined | Transform<S, any>[]}

export interface DeleteCommand extends ChangeCommand {
  command: 'delete';
  path: string;
}
const isDeleteCommand = ( c: ChangeCommand ): c is DeleteCommand => c.command === 'delete';
export const deleteCommandProcessor = <S> ( pathToLens: ( path: string ) => Optional<S, any> ): ChangeCommandProcessor<S> =>
  ( s, c ) => isDeleteCommand ( c ) ? [ [ pathToLens ( c.path ), () => undefined ] ] : undefined;

export interface SetChangeCommand extends ChangeCommand {
  command: 'set'
  path: string;
  value: any;
}
const isSetCommand = ( c: ChangeCommand ): c is SetChangeCommand => c.command === 'set';
export const setCommandProcessor = <S> ( pathToLens: ( path: string ) => Optional<S, any> ): ChangeCommandProcessor<S> =>
  ( s, c ) => isSetCommand ( c ) ? [ [ pathToLens ( c.path ), () => c.value ] ] : undefined;

export interface CopyCommand extends ChangeCommand {
  command: 'copy',
  from?: string;
  to?: string;
  joiner?: string
}
const isCopyCommand = ( c: ChangeCommand ): c is CopyCommand => c.command === 'copy';

export const copyCommandProcessor = <S> ( fromPathToLens: ( path: string ) => Optional<S, any>, toPathToLens: ( path: string ) => Optional<S, any>, defaultLens: Optional<S, any> ): ChangeCommandProcessor<S> =>
  ( s, c ) => isCopyCommand ( c ) ? [ [ c.to ? toPathToLens ( c.to ) : defaultLens, () => (c.from ? fromPathToLens ( c.from ) : defaultLens).getOption ( s ) ] ] : undefined;

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

export const strictCopyCommandProcessor = <S> ( fromPathToLens: ( path: string ) => Optional<S, any>, toPathToLens: ( path: string ) => Optional<S, any> ): ChangeCommandProcessor<S> =>
  ( s, c ) => isStrictCopyCommand ( c ) ? [ [ toPathToLens ( c.to ), () => fromPathToLens ( c.from ).getOption ( s ) ] ] : undefined;

export interface MessageCommand extends ChangeCommand {
  command: 'message'
  msg: string;
}
const isMessageCommand = ( c: ChangeCommand ): c is MessageCommand => c.command === 'message';
export const messageCommandProcessor = <S, MSGs> ( msgL: Optional<S, MSGs[]>, stringToMsg: ( s: string ) => MSGs ): ChangeCommandProcessor<S> =>
  ( s, c ) => isMessageCommand ( c ) ? [ [ msgL, old => [ stringToMsg ( c.msg ), ...old ] ] ] : undefined

export interface CopyResultCommand extends ChangeCommand {
  command: 'copyResult',
  from: string;
  to: string;
}
function isCopyResultCommand ( c: ChangeCommand ): c is CopyResultCommand {
  return c.command === 'copyResult'
}
export const copyResultCommandProcessor = <S, Result> ( result: Result, pathToResultL: ( path: string ) => Optional<Result, any>, toPathToLens: ( path: string ) => Optional<S, any> ): ChangeCommandProcessor<S> =>
  ( s, c ) => isCopyResultCommand ( c ) ? [ [ toPathToLens ( c.to ), () => pathToResultL ( c.from ).getOption ( result ) ] ] : undefined

export const composeChangeCommandProcessors = <S> ( ...ps: ChangeCommandProcessor<S>[] ): ChangeCommandProcessor<S> =>
  ( s, c ) => { return ps.reduce<Transform<S, any>[] | undefined> ( ( acc, p ) => acc === undefined ? p ( s, c ) : acc, undefined ); };

export function processChangeCommandProcessor<S> ( errorPrefix: string, s: S, p: ChangeCommandProcessor<S>, cs: ChangeCommand[] ): Transform<S, any>[] {
  return cs.flatMap ( c => {
    const result = p ( s, c )
    if ( result === undefined ) throw Error ( `${errorPrefix}. Don't know how to process change command ${c}` )
    return result
  } )
}

export type SimpleChangeCommands = DeleteCommand | MessageCommand | CopyCommand | SetChangeCommand

export interface DeleteMessageStrictCopySetProcessorsConfig<S, MSGs> {
  fromPathTolens: ( path: string ) => Optional<S, any>,
  toPathTolens: ( path: string ) => Optional<S, any>,
  msgL: Optional<S, MSGs[]>,
  stringToMsg: ( s: string ) => MSGs
}

export function deleteMessageStrictCopySetProcessors<S, MSGs> ( config: DeleteMessageStrictCopySetProcessorsConfig<S, MSGs> ): ChangeCommandProcessor<S> {
  const { fromPathTolens, toPathTolens, msgL, stringToMsg } = config
  return composeChangeCommandProcessors (
    strictCopyCommandProcessor ( fromPathTolens, toPathTolens ),
    deleteCommandProcessor ( toPathTolens ),
    setCommandProcessor ( toPathTolens ),
    messageCommandProcessor ( msgL, stringToMsg )
  )
}

export const restChangeCommandProcessors = <S, MSGs> ( config: DeleteMessageStrictCopySetProcessorsConfig<S, MSGs> ) =>
  <Result> ( resultPathToLens: ( path: string ) => Optional<Result, any>, result: Result ) =>
    composeChangeCommandProcessors (
      deleteMessageStrictCopySetProcessors ( config ),
      copyResultCommandProcessor ( result, resultPathToLens, config.toPathTolens ) );

export const modalCommandProcessors = <S, MSGs> ( config: DeleteMessageStrictCopySetProcessorsConfig<S, MSGs>, defaultL: Optional<S, any> ) => {
  const { fromPathTolens, toPathTolens } = config
  return composeChangeCommandProcessors (
    deleteMessageStrictCopySetProcessors ( config ),
    copyCommandProcessor ( fromPathTolens, toPathTolens, defaultL ) );
};



