import { HasRestCommands } from "@focuson-nw/rest";
import { HasPageSelection } from "@focuson-nw/pages";
import { defaultPageSelectionAndRestCommandsContext, FocusOnContext } from "@focuson-nw/focuson";
import { HasSimpleMessages, testDateFn } from "@focuson-nw/utils";
import { HasTagHolder } from "@focuson-nw/template";
import { MyCombined } from "@focuson-nw/form_components";

export function context<S extends HasRestCommands & HasPageSelection & HasSimpleMessages & HasTagHolder> ( mockJwt?: boolean ): FocusOnContext<S> {
  return {
    ...defaultPageSelectionAndRestCommandsContext<S> ( {}, {}, {}, {}, testDateFn, mockJwt !== false ),
    combine: MyCombined
  }
}