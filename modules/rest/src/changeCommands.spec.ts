import { HasSimpleMessages, safeArray, SimpleMessage, stringToSimpleMsg, testDateFn } from "@focuson/utils";
import { CopyCommand, copyCommandProcessor, CopyResultCommand, copyResultCommandProcessor, DeleteCommand, deleteCommandProcessor, DeleteMessageStrictCopySetProcessorsConfig, MessageCommand, messageCommandProcessor, modalCommandProcessors, ModalProcessorsConfig, restChangeCommandProcessors, RestProcessorsConfig, SetChangeCommand, setCommandProcessor, StrictCopyCommand, strictCopyCommandProcessor } from "./changeCommands";
import { displayTransformsInState, lensBuilder, Lenses, parsePath } from "@focuson/lens";

interface abc {
  a: { b?: string, c?: string }
}
interface yz {
  y?: string,
  z?: abc
}
interface StateForChangeCommads extends HasSimpleMessages {
  fromA?: abc,
  toA?: abc,
  x?: yz,
}
const simpleMessagesL = <S extends HasSimpleMessages> () => Lenses.identity<S> ().focusQuery ( 'messages' );
const fromPathTolens = ( p: string ) => parsePath ( p, lensBuilder ( { '/': Lenses.identity<StateForChangeCommads> ().focusQuery ( 'fromA' ) }, {} ) )
const toPathTolens = ( p: string ) => parsePath ( p, lensBuilder ( { '/': Lenses.identity<StateForChangeCommads> ().focusQuery ( 'toA' ) }, {} ) )
const resultPathToLens = ( p: string ) => parsePath ( p, lensBuilder (
// @ts-ignore
  { '/': Lenses.identity<yz> ( 'resultPath' ) }, {} ) )
const defaultL = Lenses.identity<StateForChangeCommads> ( 'default' ).focusQuery ( 'x' ).focusQuery ( 'z' ).focusQuery ( 'a' )
const empty: StateForChangeCommads = { messages: [] }
const froma12: StateForChangeCommads = { messages: [], fromA: { a: { b: "one", c: "two" } } }
const froma12Withz: StateForChangeCommads = { messages: [], fromA: { a: { b: "one", c: "two" } }, x: { z: { a: { b: 'from', c: 'default' } } } }

const froma12WithAMessage: StateForChangeCommads = { messages: [ { level: 'error', msg: 'a', time: 'someTime' } ], fromA: { a: { b: "one", c: "two" } } }
const config: DeleteMessageStrictCopySetProcessorsConfig<StateForChangeCommads, SimpleMessage> = {
  toPathTolens, messageL: simpleMessagesL (), stringToMsg: stringToSimpleMsg ( testDateFn, 'info' )
}
const restConfig: RestProcessorsConfig<StateForChangeCommads, any, SimpleMessage> = {
  ...config, resultPathToLens
}
const modalConfig: ModalProcessorsConfig<StateForChangeCommads, SimpleMessage> = {
  ...config, fromPathTolens, defaultL
}
const result = { y: 'y', z: { a: { b: 'from', c: 'res' } } }
const restProcessor = restChangeCommandProcessors ( restConfig )
const modalProcessor = modalCommandProcessors ( modalConfig )

describe ( "delete command", () => {
  const processor = deleteCommandProcessor ( toPathTolens );
  let expected = [ [ "I.focus?(toA).focus?(a).focus?(b)", undefined ] ];
  it ( "should ignore none deletes", () => {
    expect ( processor ( { command: 'something' } ) ).toEqual ( undefined )
  } )
  it ( "should place a undefined at the target", () => {
    const deleteCommand: DeleteCommand = { command: 'delete', path: '/a/b' };
    expect ( displayTransformsInState ( froma12, safeArray ( processor ( deleteCommand ) ) ) ).toEqual ( expected )
  } )
  it ( "should place a undefined at the target - modal", () => {
    const deleteCommand: DeleteCommand = { command: 'delete', path: '/a/b' };
    expect ( displayTransformsInState ( froma12, safeArray ( modalProcessor ( froma12 ) ( deleteCommand ) ) ) ).toEqual ( expected )
  } )
  it ( "should place a undefined at the target - rest", () => {
    const deleteCommand: DeleteCommand = { command: 'delete', path: '/a/b' };
    expect ( displayTransformsInState ( froma12, safeArray ( restProcessor ( result ) ( deleteCommand ) ) ) ).toEqual ( expected )
  } )
} )

describe ( "strict copy command", () => {
  const command: StrictCopyCommand = { command: 'copy', from: '/a', to: '/b' };
  const processor = strictCopyCommandProcessor ( fromPathTolens, toPathTolens );
  const expected = [ [ "I.focus?(toA).focus?(b)", { "b": "one", "c": "two" } ] ];
  it ( "should ignore none strict commands", () => {
    expect ( processor ( froma12 ) ( { command: 'something' } ) ).toEqual ( undefined )
    expect ( processor ( froma12 ) ( { command: 'copy' } ) ).toEqual ( undefined )
    const commandWithJustFrom = { command: 'copy', from: '' };
    const commandWithJustTo = { command: 'copy', to: '' };
    expect ( processor ( froma12 ) ( commandWithJustFrom ) ).toEqual ( undefined )
    expect ( processor ( froma12 ) ( commandWithJustTo ) ).toEqual ( undefined )
  } )
  it ( "should copy the from to the to", () => {
    expect ( displayTransformsInState ( froma12, safeArray ( processor ( froma12 ) ( command ) ) ) ).toEqual ( expected )
  } )
  it ( "should cnot be in the rest commands", () => {
    expect ( restProcessor ( result ) ( command ) ).toEqual ( undefined )
  } )
  it ( "should copy the from to the to -modal", () => {
    expect ( displayTransformsInState ( froma12, safeArray ( modalProcessor ( froma12 ) ( command ) ) ) ).toEqual ( expected )
  } )
} )

describe ( " copy command", () => {
  const processor = copyCommandProcessor ( fromPathTolens, toPathTolens, defaultL );
  function command ( from: string | undefined, to: string | undefined ): CopyCommand {return { command: 'copy', from, to }}
  it ( "should ignore none  copy", () => {
    expect ( processor ( froma12 ) ( { command: 'something' } ) ).toEqual ( undefined )

  } )
  describe ( 'copy with default from & to - which is a silly combination', () => {
    it ( "should copy the from to the to", () => {
      expect ( displayTransformsInState ( froma12Withz, safeArray ( processor ( froma12Withz ) ( command ( undefined, undefined ) ) ) ) ).toEqual ( [
        [ "default.focus?(x).focus?(z).focus?(a)", { "b": "from", "c": "default" } ] ] )
    } )
    it ( "should copy the from to the to - modal", () => {
      expect ( displayTransformsInState ( froma12Withz, safeArray ( modalProcessor ( froma12Withz ) ( command ( undefined, undefined ) ) ) ) ).toEqual ( [
        [ "default.focus?(x).focus?(z).focus?(a)", { "b": "from", "c": "default" } ] ] )
    } )
  } )
  describe ( 'copy with default from ', () => {
    it ( "should copy the from to the to", () => {
      expect ( displayTransformsInState ( froma12Withz, safeArray ( processor ( froma12Withz ) ( command ( undefined, '/a' ) ) ) ) ).toEqual ( [
        [ "I.focus?(toA).focus?(a)", { "b": "from", "c": "default" } ] ] )
    } )
    it ( "should copy the from to the to - modal", () => {
      expect ( displayTransformsInState ( froma12Withz, safeArray ( modalProcessor ( froma12Withz ) ( command ( undefined, '/a' ) ) ) ) ).toEqual ( [
        [ "I.focus?(toA).focus?(a)", { "b": "from", "c": "default" } ] ] )
    } )
  } )
  describe ( 'copy with default to ', () => {
    it ( "should copy the from to the to", () => {
      expect ( displayTransformsInState ( froma12Withz, safeArray ( processor ( froma12Withz ) ( command ( '/a', undefined ) ) ) ) ).toEqual ( [
        [ "default.focus?(x).focus?(z).focus?(a)", { "b": "one", "c": "two" } ]
      ] )
    } )
    it ( "should copy the from to the to - modal", () => {
      expect ( displayTransformsInState ( froma12Withz, safeArray ( modalProcessor ( froma12Withz ) ( command ( '/a', undefined ) ) ) ) ).toEqual ( [
        [ "default.focus?(x).focus?(z).focus?(a)", { "b": "one", "c": "two" } ]
      ] )
    } )
  } )
} )
describe ( "messageCommandProcessor", () => {

  const processor = messageCommandProcessor<StateForChangeCommads, SimpleMessage> ( simpleMessagesL (), config.stringToMsg );
  const command: MessageCommand = { command: 'message', msg: 'someMessage' };
  const expected = [
    [
      "I.focus?(messages)",
      [ { "level": "info", "msg": "someMessage", "time": "timeForTest" },
        { "level": "error", "msg": "a", "time": "someTime" } ] ] ];
  it ( "should ignore none messageCommands", () => {
    expect ( processor ( { command: 'something' } ) ).toEqual ( undefined )
  } )
  it ( "should copy the from to the to", () => {
    expect ( displayTransformsInState ( froma12WithAMessage, safeArray ( processor ( command ) ) ) ).toEqual ( expected )
  } )
  it ( "should copy the from to the to - modal", () => {
    expect ( displayTransformsInState ( froma12WithAMessage, safeArray ( modalProcessor ( froma12WithAMessage ) ( command ) ) ) ).toEqual ( expected )
  } )
  it ( "should copy the from to the to -rest", () => {
    expect ( displayTransformsInState ( froma12WithAMessage, safeArray ( restProcessor ( result ) ( command ) ) ) ).toEqual ( expected )
  } )


} )

describe ( "setCommandProcessor", () => {
  const processor = setCommandProcessor ( toPathTolens );
  const command: SetChangeCommand = { command: 'set', path: '/a', value: { b: 'the', c: 'value' } };
  const expected = [ [ "I.focus?(toA).focus?(a)", { "b": "the", "c": "value" } ] ];
  it ( "should ignore none setCommands", () => {
    expect ( processor ( { command: 'something' } ) ).toEqual ( undefined )
  } )
  it ( "should copy the value to the to", () => {
    expect ( displayTransformsInState ( froma12WithAMessage, safeArray ( processor ( command ) ) ) ).toEqual ( expected )
  } )
  it ( "should copy the value to the to -modal", () => {
    expect ( displayTransformsInState ( froma12WithAMessage, safeArray ( modalProcessor ( froma12WithAMessage ) ( command ) ) ) ).toEqual ( expected )
  } )
  it ( "should copy the value to the to -rest", () => {
    expect ( displayTransformsInState ( froma12WithAMessage, safeArray ( restProcessor ( result ) ( command ) ) ) ).toEqual ( expected )
  } )
} )

describe ( "copyResultCommandProcessor", () => {
  const processor = copyResultCommandProcessor<StateForChangeCommads, yz> ( resultPathToLens, toPathTolens )
  const command: CopyResultCommand = { command: 'copyResult', from: '/z/a', to: '/a' };
  it ( "should ignore none copyResultCommands", () => {
    expect ( processor ( result ) ( { command: 'something' } ) ).toEqual ( undefined )
  } )
  it ( "should copy the result + path to the to + path", () => {
    expect ( displayTransformsInState ( froma12WithAMessage, safeArray ( processor ( result ) ( command ) ) ) ).toEqual ( [
      [ "I.focus?(toA).focus?(a)", { "b": "from", "c": "res" } ] ] )
  } )
  it ( "should copy the result + path to the to + path - rest", () => {
    expect ( displayTransformsInState ( froma12WithAMessage, safeArray ( restProcessor ( result ) ( command ) ) ) ).toEqual ( [
      [ "I.focus?(toA).focus?(a)", { "b": "from", "c": "res" } ] ] )
  } )
} )

describe ( 'rest/modal processors with other commands', () => {
  it ( "should ignore none copyResultCommands", () => {
    expect ( restProcessor ( result ) ( { command: 'something' } ) ).toEqual ( undefined )
    expect ( modalProcessor ( froma12WithAMessage ) ( { command: 'something' } ) ).toEqual ( undefined )
  } )
} )