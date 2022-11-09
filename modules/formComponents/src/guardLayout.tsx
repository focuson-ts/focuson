import { PageSelectionContext, replaceTextUsingPath } from "@focuson/pages";
import { safeString } from "@focuson/utils";
import { LensState } from "@focuson/state";

export interface GuardLayoutProps <S,C>{
  state: LensState<S, any, C>
  children: JSX.Element | JSX.Element[]
  guard: string[][]
  displayGuardMessages?: boolean
  message: string
  className: string
}
export const GuardLayout =  <S, C extends PageSelectionContext<S>> ( { guard, children, message, className, displayGuardMessages, state }: GuardLayoutProps<S,C> ): JSX.Element =>
  guard.flat ().length === 0 ? <>{children}</> : <div className={className}>{replaceTextUsingPath ( state, message )}{displayGuardMessages ? guard : ''}</div>;