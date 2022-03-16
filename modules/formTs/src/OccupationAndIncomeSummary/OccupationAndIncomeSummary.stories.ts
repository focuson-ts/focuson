import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { defaultPageSelectionAndRestCommandsContext } from "@focuson/focuson";
import { context, Context, emptyState, FState } from "../common";
import { pages } from "../pages";
import * as render  from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.render";
import * as domain  from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains";
import * as samples  from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.samples";
import * as empty from "../OccupationAndIncomeSummary/OccupationAndIncomeSummary.empty";
 
export default {
   component: render.OccupationAndIncomeSummaryPage,
   title: 'Forms/OccupationAndIncomeSummary'
}
 
interface StoryState {
   domain: domain.OccupationAndIncomeDetailsDomain
   pageMode: PageMode
}
 
const initial = {"selectedItem":0}
function pageSelection ( pageMode: PageMode ): PageSelection { return { pageName: 'OccupationAndIncomeSummary', pageMode}}
const Template: Story<StoryState> = ( args: StoryState ) =>{
  const startState: FState = { ...emptyState, pageSelection: [ pageSelection ( args.pageMode ) ] }
  return SBookProvider<FState, Context> ( { ...startState, OccupationAndIncomeSummary: { ...initial, fromApi: args.domain } },//NOTE currently stories only work if the target depth is 1
     context,
     s => findOneSelectedPageDetails ( s ) ( pageSelection: pageSelection(args.pageMode) ).element );}
 
 
export const View = Template.bind ( {} );
View.args = {
   domain: samples.sampleOccupationAndIncomeDetails0,
   pageMode: 'view'
};
export const Edit = Template.bind ( {} );
 Edit.args = {
   domain: samples.sampleOccupationAndIncomeDetails0,
   pageMode: 'edit'
};
 
export const Empty = Template.bind ( {} );
Empty.args = {
   domain: empty.emptyOccupationAndIncomeDetails,
   pageMode: 'create'
};