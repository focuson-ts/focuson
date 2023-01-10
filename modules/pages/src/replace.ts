import { LensState } from "@focuson-nw/state";
import { fromPathGivenState, PageSelectionContext } from "./pageSelection";
import { replaceTextFn } from "@focuson-nw/lens";


export const replaceTextUsingPath = <S, Context extends PageSelectionContext<S>> ( state: LensState<S, any, Context>, label: string ) =>
  label.replace ( /{[^}]*}/g, str => replaceTextFn ( `Label is ${label}`, state.main, fromPathGivenState ( state ), str ) );

