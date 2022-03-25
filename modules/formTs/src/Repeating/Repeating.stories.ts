import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode, PageSelection } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { context, Context, emptyState, FState } from "../common";
import { pages } from "../pages";
import * as render  from "../Repeating/Repeating.render";
import * as domain  from "../Repeating/Repeating.domains";
import * as samples  from "../Repeating/Repeating.samples";
import * as empty from "../Repeating/Repeating.empty";
 
export default {
   component: render.RepeatingPage,
   title: 'Forms/Repeating'
}
 
interface StoryState {
   domain: domain.RepeatingWholeDataDomain
   pageMode: PageMode
}
 
const initial = {}
function pageSelection ( pageMode: PageMode ): PageSelection { return { pageName: 'Repeating', pageMode}}
const Template: Story<StoryState> = ( args: StoryState ) =>{
  const startState: FState = { ...emptyState, pageSelection: [ pageSelection ( args.pageMode ) ] }
  return SBookProvider<FState, Context> ( { ...startState, Repeating: { ...initial, ~: args.domain } },//NOTE currently stories only work if the target depth is 1
     context,
     s => findOneSelectedPageDetails ( s ) (pageSelection(args.pageMode)).element );}
 
 
export const View = Template.bind ( {} );
View.args = {
   domain: samples.sampleRepeatingWholeData0,
   pageMode: 'view'
};
export const Edit = Template.bind ( {} );
 Edit.args = {
   domain: samples.sampleRepeatingWholeData0,
   pageMode: 'edit'
};
 
export const Empty = Template.bind ( {} );
Empty.args = {
   domain: empty.emptyRepeatingWholeData,
   pageMode: 'create'
};