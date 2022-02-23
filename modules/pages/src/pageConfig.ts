import { Optional } from "@focuson/lens";
import { LensProps, LensState } from "@focuson/state";
import { HasSimpleMessages, SimpleMessage, simpleMessagesLFn } from "./simpleMessage";
import { FocusedPage } from "./focusedPage";
import { PageTemplateProps } from "./PageTemplate";

export interface MultiPageDetails<S, Context> {
  [ name: string ]: OnePageDetails<S, any, any, any, Context>
}
export interface HasMultiPageDetails<S, Context> {
  pages: MultiPageDetails<S, Context>
}
type DisplayFn<S, D, Context> = ( props: LensProps<S, D, Context> ) => JSX.Element
type PageFunctionType<S, D, Context> = FocusedPage<S, D, Context> | DisplayFn<S, D, Context>

export interface OnePageDetails<S, D, Msgs, Config extends PageConfig<S, D, Msgs, Context>, Context> {
  config: Config,
  lens: Optional<S, D>,
  pageFunction: PageFunctionType<S, D, Context>,
  clearAtStart?: boolean  // if set then the PageState is reset at the beginning,
  initialValue?: D //If set then this is injected at the beginning. Clear at start overrides this
}

/** In most applications this will be extended. For example it is quite likely to have a lens from S to the PostCommands added to it if
 * the application uses @focuson/posters.
 * If customer ids and application ids and other things are needed, this is a great way to inject them: Store the ids in the stage and extend this with lens to them
 *
 * Usually this will be put in a context at the top of the react render chain, and be available to pages underneath.
 * */
export interface PageConfig<S, D, Msgs, Context> {
  /** the messages might be anywhere... in the state, in the domain. Each page specifies where the data is*/
  messageLens?: ( s: LensState<S, S, Context>, domainLens: Optional<S, D> ) => LensState<S, Msgs, Context>,
  /** Not all messags are equal. This knows how to display the messages */
  displayMsgs?: ( msgProps: LensProps<S, Msgs, Context> ) => JSX.Element | undefined,

  /** a component to display 'loading'. If undefined then */
  loading?: ( ls: LensState<S, any, Context> ) => JSX.Element
  /** This template wraps the focused page. A template will hold things like navigation, branding, and 'the common stuff' around our page
   * If the template isn't present then the element in the focused page is shown directly
   *
   * A common used for the template is to handle 'loading' */
  template?: ( p: PageTemplateProps<S, D, Context> ) => JSX.Element
}

/** If the state is using simple messages, and HasSelectedModalPage, this provides a default page config.ts that works in many situations
 * It doesn't have postCommand configuration in it, which is the most common 'add on' */
export function simpleMessagesPageConfig<S extends HasSimpleMessages, D, Context> ( loading: ( s: LensState<S, any, Context> ) => JSX.Element ): PageConfig<S, D, SimpleMessage[], Context> {
  return ({
    messageLens: simpleMessagesLFn<S, D, Context> (),
    loading
  })
}
