import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { defaultPageSelectionAndRestCommandsContext } from "@focuson/focuson";
import { Context, emptyState, FState } from "../common";
import { pages } from "../pages";
import * as render  from "../render";
import * as domain  from "../domains";
import * as samples  from "../samples";
import * as empty from "../empty";
 
export default {
   component: render.ChequeCreditbooksPage,
   title: 'Forms/ChequeCreditbooks'
}
 
interface StoryState {
   domain: domain.ChequeCreditbooksDDDomain
   pageMode: PageMode
}
 
const Template: Story<StoryState> = ( args: StoryState ) =>
   SBookProvider<FState, Context> ( { ...emptyState, ChequeCreditbooks: { fromApi: args.domain } },//NOTE currently stories only work if the target depth is 1
     defaultPageSelectionAndRestCommandsContext<FState> ( pages ),
     s => findOneSelectedPageDetails ( s ) ( { pageName: 'ChequeCreditbooks', pageMode:args.pageMode} ) );
 
 
export const View = Template.bind ( {} );
View.args = {
   domain: samples.sampleChequeCreditbooksDD0,
   pageMode: 'view'
};
export const Edit = Template.bind ( {} );
 Edit.args = {
   domain: samples.sampleChequeCreditbooksDD0,
   pageMode: 'edit'
};
 
export const Empty = Template.bind ( {} );
Empty.args = {
   domain: empty.emptyChequeCreditbooksDD,
   pageMode: 'create'
};