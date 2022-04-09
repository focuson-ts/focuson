import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode, PageSelection } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { Lenses } from "@focuson/lens";
import { context, Context, emptyState, FState } from "../common";
import { pages } from "../pages";
import * as render  from "../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.render";
import * as domain  from "../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.domains";
import * as samples  from "../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.samples";
import * as empty from "../MainOccupationDetailsPageSummary/MainOccupationDetailsPageSummary.empty";
 
export default {
   component: render.MainOccupationDetailsPageSummaryPage,
   title: 'Forms/MainOccupationDetailsPageSummary'
}
 
interface StoryState {
   domain: domain.OccupationAndIncomeFullDomainDomain
   pageMode: PageMode
}
 
const initial = {"occupation":{"search":"","selectedOccupationName":"","searchResults":[]}}
function pageSelection ( pageMode: PageMode ): PageSelection { return { pageName: 'MainOccupationDetailsPageSummary', pageMode}}
const Template: Story<StoryState> = ( args: StoryState ) =>{
  const pageDetails: any = pages[ 'MainOccupationDetailsPageSummary' ];
  const initial = pageDetails.initialValue?pageDetails.initialValue:{}
  const rawState: FState = { ...emptyState, pageSelection: [ pageSelection ( args.pageMode ) ], MainOccupationDetailsPageSummary: initial }
  const startState=Lenses.identity<FState>().focusQuery('MainOccupationDetailsPageSummary').focusQuery('fromApi').focusQuery('occupationAndIncome').set(rawState, args.domain)
  return SBookProvider<FState, Context> (startState, context,
     s => findOneSelectedPageDetails ( s, pageDetails.lens) (pageSelection(args.pageMode), 0).element );}
 
 
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