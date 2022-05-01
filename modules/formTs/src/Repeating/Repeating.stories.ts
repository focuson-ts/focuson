import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode, PageSelection } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { Lenses } from "@focuson/lens";
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
 
const initial = {"selectedItem":0}
function pageSelection ( pageMode: PageMode ): PageSelection { return { pageName: 'Repeating', pageMode}}
const Template: Story<StoryState> = ( args: StoryState ) =>{
  const pageDetails: any = pages[ 'Repeating' ];
  const initial = pageDetails.initialValue?pageDetails.initialValue:{}
  const rawState: FState = { ...emptyState, pageSelection: [ pageSelection ( args.pageMode ) ], Repeating: initial }
  const startState=Lenses.identity<FState>().focusQuery('Repeating').focusQuery('fromApi').set(rawState, args.domain)
  return SBookProvider<FState, Context> (startState, context,
     s => findOneSelectedPageDetails ( s, pageDetails.lens, 1) (pageSelection(args.pageMode), 0).element );}
 
 
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