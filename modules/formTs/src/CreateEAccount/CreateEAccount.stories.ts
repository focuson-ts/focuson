import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode, PageSelection } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { Lenses } from "@focuson/lens";
import { context, Context, emptyState, FState } from "../common";
import { pages } from "../pages";
import * as render  from "../CreateEAccount/CreateEAccount.render";
import * as domain  from "../CreateEAccount/CreateEAccount.domains";
import * as samples  from "../CreateEAccount/CreateEAccount.samples";
import * as empty from "../CreateEAccount/CreateEAccount.empty";
 
export default {
   component: render.CreateEAccountPage,
   title: 'Forms/CreateEAccount'
}
 
interface StoryState {
   domain: domain.CreateEAccountDataDomain
   pageMode: PageMode
}
 
const initial = empty.emptyCreateEAccountData
function pageSelection ( pageMode: PageMode ): PageSelection { return { pageName: 'CreateEAccount', pageMode}}
const Template: Story<StoryState> = ( args: StoryState ) =>{
  const pageDetails: any = pages[ 'CreateEAccount' ];
  const initial = pageDetails.initialValue?pageDetails.initialValue:{}
  const rawState: FState = { ...emptyState, pageSelection: [ pageSelection ( args.pageMode ) ], CreateEAccount: initial }
  const startState=Lenses.identity<FState>().focusQuery('CreateEAccount').focusQuery('editing').set(rawState, args.domain)
  return SBookProvider<FState, Context> (startState, context,
     s => findOneSelectedPageDetails ( s, pageDetails.lens) (pageSelection(args.pageMode), 0).element );}
 
 
export const View = Template.bind ( {} );
View.args = {
   domain: samples.sampleCreateEAccountData0,
   pageMode: 'view'
};
export const Edit = Template.bind ( {} );
 Edit.args = {
   domain: samples.sampleCreateEAccountData0,
   pageMode: 'edit'
};
 
export const Empty = Template.bind ( {} );
Empty.args = {
   domain: empty.emptyCreateEAccountData,
   pageMode: 'create'
};