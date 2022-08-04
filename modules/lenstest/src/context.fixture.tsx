import { HasRestCommands } from "@focuson/rest";
import { HasPageSelection } from "@focuson/pages";
import { defaultPageSelectionAndRestCommandsContext, FocusOnContext } from "@focuson/focuson";
import { HasSimpleMessages } from "@focuson/utils";
import { HasTagHolder } from "@focuson/template";
import { MyCombined } from "@focuson/form_components";

export function context<S extends HasRestCommands & HasPageSelection & HasSimpleMessages & HasTagHolder> (): FocusOnContext<S> {
  return {
    ...defaultPageSelectionAndRestCommandsContext<S> ( {}, {}, {}, {} ),
    combine: MyCombined
  }
}