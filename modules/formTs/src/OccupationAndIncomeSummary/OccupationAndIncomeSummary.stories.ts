import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode, PageSelection } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { Lenses } from "@focuson/lens";
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
   domain: domain.OccupationAndIncomeFullDomainDomain
   pageMode: PageMode
}
 
const initial = {"selectedItem":0,"occupation":{"search":"","selectedOccupationName":"","searchResults":[]},"mainOrJoint":false}
function pageSelection ( pageMode: PageMode ): PageSelection { return { pageName: 'OccupationAndIncomeSummary', pageMode}}
const Template: Story<StoryState> = ( args: StoryState ) =>{
  const pageDetails: any = pages[ 'OccupationAndIncomeSummary' ];
  const initial = pageDetails.initialValue?pageDetails.initialValue:{}
  const rawState: FState = { ...emptyState, pageSelection: [ pageSelection ( args.pageMode ) ], OccupationAndIncomeSummary: initial }
  const startState=Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary').focusQuery('fromApi').set(rawState, args.domain)
  return SBookProvider<FState, Context> (startState, context,
     s => findOneSelectedPageDetails ( s, pageDetails.len) (pageSelection(args.pageMode), 0).element );}
 
 
export const View = Template.bind ( {} );
View.args = {
   domain: samples.sampleOccupationAndIncomeFullDomain0,
   pageMode: 'view'
};
export const Edit = Template.bind ( {} );
 Edit.args = {
   domain: samples.sampleOccupationAndIncomeFullDomain0,
   pageMode: 'edit'
};
 
export const Empty = Template.bind ( {} );
Empty.args = {
   domain: empty.emptyOccupationAndIncomeFullDomain,
   pageMode: 'create'
};