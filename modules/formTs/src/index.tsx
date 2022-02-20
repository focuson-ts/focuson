import { getElement, LensState, setJsonForFlux } from "@focuson/state";
import ReactDOM from "react-dom";
import { FState } from "./common";
import { EAccountsSummaryDD, EAccountsSummaryPage } from "./render";


const emptyState: FState = {
  CommonIds: { "accountId": "accId", "customerId": "custId" },
  tags: {},
  messages: [],
  pageSelection: { pageName: 'eAccountsSummary' },
  eAccountsSummary: {}
}

let rootElement = getElement ( "root" );

let setJson = setJsonForFlux<FState, void> ( 'setJson', ( s: LensState<FState, FState> ): void =>
  ReactDOM.render ( <EAccountsSummaryPage state={s.focusOn ( 'eAccountsSummary' )}/>, rootElement ) )

setJson ( emptyState )


