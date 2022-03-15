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
const Template: Story<StoryState> = ( args: StoryState ) =>
   SBookProvider<FState, Context> ( { ...emptyState, ChequeCreditbooks: { ...initial, fromApi: args.domain } },//NOTE currently stories only work if the target depth is 1
     context,
     s => findOneSelectedPageDetails ( s ) ( { pageName: 'ChequeCreditbooks', pageMode:args.pageMode} ).element );
 
 
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