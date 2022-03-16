import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { defaultPageSelectionAndRestCommandsContext } from "@focuson/focuson";
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
  const startState: FState = { ...emptyState, pageSelection: [ pageSelection ( args.pageMode ) ] }
  return SBookProvider<FState, Context> ( { ...startState, ChequeCreditbooks: { ...initial, fromApi: args.domain } },//NOTE currently stories only work if the target depth is 1
     context,
     s => findOneSelectedPageDetails ( s ) ( pageSelection: pageSelection(args.pageMode) ).element );}
 
 
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