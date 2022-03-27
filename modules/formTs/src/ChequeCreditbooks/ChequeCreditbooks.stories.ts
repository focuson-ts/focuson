import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode, PageSelection } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { Lenses } from "@focuson/lens";
import { context, Context, emptyState, FState } from "../common";
import { pages } from "../pages";
import * as render  from "../ChequeCreditbooks/ChequeCreditbooks.render";
import * as domain  from "../ChequeCreditbooks/ChequeCreditbooks.domains";
import * as samples  from "../ChequeCreditbooks/ChequeCreditbooks.samples";
import * as empty from "../ChequeCreditbooks/ChequeCreditbooks.empty";
 
export default {
   component: render.ChequeCreditbooksPage,
   title: 'Forms/ChequeCreditbooks'
}
 
interface StoryState {
   domain: domain.ChequeCreditbooksDomain
   pageMode: PageMode
}
 
const initial = {}
function pageSelection ( pageMode: PageMode ): PageSelection { return { pageName: 'ChequeCreditbooks', pageMode}}
const Template: Story<StoryState> = ( args: StoryState ) =>{
  const rawState: FState = { ...emptyState, pageSelection: [ pageSelection ( args.pageMode ) ], ChequeCreditbooks: initial }
  const startState=Lenses.identity<FState>().focusQuery('ChequeCreditbooks').focusQuery('fromApi').set(rawState, args.domain)
  return SBookProvider<FState, Context> (startState, context,
     s => findOneSelectedPageDetails ( s ) (pageSelection(args.pageMode)).element );}
 
 
export const View = Template.bind ( {} );
View.args = {
   domain: samples.sampleChequeCreditbooks0,
   pageMode: 'view'
};
export const Edit = Template.bind ( {} );
 Edit.args = {
   domain: samples.sampleChequeCreditbooks0,
   pageMode: 'edit'
};
 
export const Empty = Template.bind ( {} );
Empty.args = {
   domain: empty.emptyChequeCreditbooks,
   pageMode: 'create'
};