import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode, PageSelection } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { context, Context, emptyState, FState } from "../common";
import { pages } from "../pages";
import * as render  from "../AccountOverview/AccountOverview.render";
import * as domain  from "../AccountOverview/AccountOverview.domains";
import * as samples  from "../AccountOverview/AccountOverview.samples";
import * as empty from "../AccountOverview/AccountOverview.empty";
 
export default {
   component: render.AccountOverviewPage,
   title: 'Forms/AccountOverview'
}
 
interface StoryState {
   domain: domain.AccountOverviewDomain
   pageMode: PageMode
}
 
const initial = {}
function pageSelection ( pageMode: PageMode ): PageSelection { return { pageName: 'AccountOverview', pageMode}}
const Template: Story<StoryState> = ( args: StoryState ) =>{
  const startState: FState = { ...emptyState, pageSelection: [ pageSelection ( args.pageMode ) ] }
  return SBookProvider<FState, Context> ( { ...startState, AccountOverview: { ...initial, ~: args.domain } },//NOTE currently stories only work if the target depth is 1
     context,
     s => findOneSelectedPageDetails ( s ) (pageSelection(args.pageMode)).element );}
 
 
export const View = Template.bind ( {} );
View.args = {
   domain: samples.sampleAccountOverview0,
   pageMode: 'view'
};
export const Edit = Template.bind ( {} );
 Edit.args = {
   domain: samples.sampleAccountOverview0,
   pageMode: 'edit'
};
 
export const Empty = Template.bind ( {} );
Empty.args = {
   domain: empty.emptyAccountOverview,
   pageMode: 'create'
};