import { HasPageSelection, IndexPage, PageSelectionContext, SelectedPage } from "@focuson/pages";
import { LensState, lensState } from "@focuson/state";
import { HasRestCommands } from "@focuson/rest";
import { mount } from "enzyme";

export function mountTheState<S extends HasPageSelection & HasRestCommands, Context extends PageSelectionContext<S>> ( context: Context, state: S, setMain: ( s: S, reason: any ) => void ) {
  // const context = defaultPageSelectionAndRestCommandsContext<S> ( pageDetails )
  const s: LensState<S, S, Context> = lensState ( state, setMain, '', context )
  return mount ( <div>
    <IndexPage state={s}>
      <SelectedPage state={s}/>
    </IndexPage></div> )
}