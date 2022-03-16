import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode, PageSelection } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { context, Context, emptyState, FState } from "../common";
import { pages } from "../pages";
import * as render  from "../EAccountsSummary/EAccountsSummary.render";
import * as domain  from "../EAccountsSummary/EAccountsSummary.domains";
import * as samples  from "../EAccountsSummary/EAccountsSummary.samples";
import * as empty from "../EAccountsSummary/EAccountsSummary.empty";
 
export default {
   component: render.EAccountsSummaryPage,
   title: 'Forms/EAccountsSummary'
}
 
interface StoryState {
   domain: domain.EAccountsSummaryDomain
   pageMode: PageMode
}
 
const initial = {}
function pageSelection ( pageMode: PageMode ): PageSelection { return { pageName: 'EAccountsSummary', pageMode}}
const Template: Story<StoryState> = ( args: StoryState ) =>{
  const startState: FState = { ...emptyState, pageSelection: [ pageSelection ( args.pageMode ) ] }
  return SBookProvider<FState, Context> ( { ...startState, EAccountsSummary: { ...initial, fromApi: args.domain } },//NOTE currently stories only work if the target depth is 1
     context,
     s => findOneSelectedPageDetails ( s ) (pageSelection(args.pageMode)).element );}
 
 
export const View = Template.bind ( {} );
View.args = {
   domain: samples.sampleEAccountsSummary0,
   pageMode: 'view'
};
export const Edit = Template.bind ( {} );
 Edit.args = {
   domain: samples.sampleEAccountsSummary0,
   pageMode: 'edit'
};
 
export const Empty = Template.bind ( {} );
Empty.args = {
   domain: empty.emptyEAccountsSummary,
   pageMode: 'create'
};