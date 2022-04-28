import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode, PageSelection } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { Lenses } from "@focuson/lens";
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
  const pageDetails: any = pages[ 'AccountOverview' ];
  const initial = pageDetails.initialValue?pageDetails.initialValue:{}
  const rawState: FState = { ...emptyState, pageSelection: [ pageSelection ( args.pageMode ) ], AccountOverview: initial }
  const startState=Lenses.identity<FState>().focusQuery('AccountOverview').focusQuery('main').set(rawState, args.domain)
  return SBookProvider<FState, Context> (startState, context,
     s => findOneSelectedPageDetails ( s, pageDetails.lens, 1) (pageSelection(args.pageMode), 0).element );}
 
 
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