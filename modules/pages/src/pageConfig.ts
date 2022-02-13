import { Optional } from "@focuson/lens";
import { LensProps, LensState } from "@focuson/state";
import { AllModalPageDetails, allModelPageDetails, HasSelectedModalPage, ModalPagesDetails } from "./modal/modalPages";
import { HasSimpleMessages, SimpleMessage, simpleMessagesLFn } from "./simpleMessage";
import { FocusedPage } from "./focusedPage";
import React from "react";
import { PageTemplateProps } from "./PageTemplate";

export interface MultiPageDetails<S, MD extends ModalPagesDetails<S>> {
  [ name: string ]: OnePageDetails<S, any, any, MD, any>
}

type DisplayFn<S, D> = ( props: LensProps<S, D> ) => JSX.Element
type PageFunctionType<S, D> = FocusedPage<S, D> | DisplayFn<S, D>

export interface OnePageDetails<S, D, Msgs, MD extends ModalPagesDetails<S>, Config extends PageConfig<S, D, Msgs, MD>> {
  config: Config,
  lens: Optional<S, D>,
  pageFunction: PageFunctionType<S, D>,
  clearAtStart?: boolean  // if set then the PageState is reset at the beginning,
  initialValue?: D //If set then this is injected at the beginning. Clear at start overrides this
}

/** In most applications this will be extended. For example it is quite likely to have a lens from S to the PostCommands added to it if
 * the application uses @focuson/posters.
 * If customer ids and application ids and other things are needed, this is a great way to inject them: Store the ids in the stage and extend this with lens to them
 *
 * Usually this will be put in a context at the top of the react render chain, and be available to pages underneath.
 * */
export interface PageConfig<S, D, Msgs, MD extends ModalPagesDetails<S>> {
  /** the messages might be anywhere... in the state, in the domain. Each page specifies where the data is*/
  messageLens?: ( s: LensState<S, S>, domainLens: Optional<S, D> ) => LensState<S, Msgs>,
  /** Not all messags are equal. This knows how to display the messages */
  displayMsgs?: ( msgProps: LensProps<S, Msgs> ) => JSX.Element | undefined,
  /** What is needed to display model pages */
  modalPageDetails?: AllModalPageDetails<S, MD>
  /** a component to display 'loading'. If undefined then */
  loading?: ( ls: LensState<S, any> ) => JSX.Element
  /** This template wraps the focused page. A template will hold things like navigation, branding, and 'the common stuff' around our page
   * If the template isn't present then the element in the focused page is shown directly
   *
   * A common used for the template is to handle 'loading' */
  template?:(p: PageTemplateProps<S, D>) => JSX.Element
}

/** If the state is using simple messages, and HasSelectedModalPage, this provides a default page config.ts that works in many situations
 * It doesn't have postCommand configuration in it, which is the most common 'add on' */
export function simpleMessagesPageConfig<S extends HasSimpleMessages & HasSelectedModalPage, D, MD extends ModalPagesDetails<S>> (
  md: MD, loading: ( s: LensState<S, any> ) => JSX.Element ): PageConfig<S, D, SimpleMessage[], MD> {
  return ({
    modalPageDetails: allModelPageDetails ( md ),
    messageLens: simpleMessagesLFn<S, D> (),
    loading
  })
}

/** The default context. This gives access to page goodness.
 * It is sadly not type safe (the problem with using contexts)
 * It is the job of the application to make this available
 */
export const PagesContext = React.createContext<PageConfig<any, any, SimpleMessage[], any>> ( {} )
