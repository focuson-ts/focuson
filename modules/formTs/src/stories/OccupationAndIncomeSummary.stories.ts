import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { defaultPageSelectionAndRestCommandsContext } from "@focuson/focuson";
import { Context, emptyState, FState } from "../common";
import { pages } from "../pages";
import * as render  from "../render";
import * as domain  from "../domains";
import * as samples  from "../samples";
import * as empty from "../empty";
 
export default {
   component: render.OccupationAndIncomeSummaryPage,
   title: 'Forms/OccupationAndIncomeSummary'
}
 
interface StoryState {
   domain: domain.OccupationAndIncomeDetailsDDDomain
   pageMode: PageMode
}
 
const Template: Story<StoryState> = ( args: StoryState ) =>
   SBookProvider<FState, Context> ( { ...emptyState, OccupationAndIncomeSummary: { fromApi: args.domain } },//NOTE currently stories only work if the target depth is 1
     defaultPageSelectionAndRestCommandsContext<FState> ( pages ),
     s => findOneSelectedPageDetails ( s ) ( { pageName: 'OccupationAndIncomeSummary', pageMode:args.pageMode} ) );
 
 
export const View = Template.bind ( {} );
View.args = {
   domain: samples.sampleOccupationAndIncomeDetailsDD0,
   pageMode: 'view'
};
export const Edit = Template.bind ( {} );
 Edit.args = {
   domain: samples.sampleOccupationAndIncomeDetailsDD0,
   pageMode: 'edit'
};
 
export const Empty = Template.bind ( {} );
Empty.args = {
   domain: empty.emptyOccupationAndIncomeDetailsDD,
   pageMode: 'create'
};