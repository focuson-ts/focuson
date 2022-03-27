import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode, PageSelection } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { Lenses } from "@focuson/lens";
import { context, Context, emptyState, FState } from "../common";
import { pages } from "../pages";
import * as render  from "../JointAccount/JointAccount.render";
import * as domain  from "../JointAccount/JointAccount.domains";
import * as samples  from "../JointAccount/JointAccount.samples";
import * as empty from "../JointAccount/JointAccount.empty";
 
export default {
   component: render.JointAccountPage,
   title: 'Forms/JointAccount'
}
 
interface StoryState {
   domain: domain.JointAccountDomain
   pageMode: PageMode
}
 
const initial = {"joint":false}
function pageSelection ( pageMode: PageMode ): PageSelection { return { pageName: 'JointAccount', pageMode}}
const Template: Story<StoryState> = ( args: StoryState ) =>{
  const rawState: FState = { ...emptyState, pageSelection: [ pageSelection ( args.pageMode ) ], JointAccount: initial }
  const startState=Lenses.identity<FState>().focusQuery('JointAccount').focusQuery('fromApi').set(rawState, args.domain)
  return SBookProvider<FState, Context> (startState, context,
     s => findOneSelectedPageDetails ( s ) (pageSelection(args.pageMode)).element );}
 
 
export const View = Template.bind ( {} );
View.args = {
   domain: samples.sampleJointAccount0,
   pageMode: 'view'
};
export const Edit = Template.bind ( {} );
 Edit.args = {
   domain: samples.sampleJointAccount0,
   pageMode: 'edit'
};
 
export const Empty = Template.bind ( {} );
Empty.args = {
   domain: empty.emptyJointAccount,
   pageMode: 'create'
};