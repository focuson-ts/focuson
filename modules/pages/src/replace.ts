import { LensState } from "@focuson/state";
import { fromPathGivenState, PageSelectionContext } from "./pageSelection";
import { replaceTextFn } from "@focuson/lens";


export const replaceTextUsingPath = <S, Context extends PageSelectionContext<S>> ( state: LensState<S, any, Context>, label: string ) =>
  label.replace ( /{[^}]*}/g, replaceTextFn ( `Label is ${label}`, state.main, fromPathGivenState ( state ) ) );

