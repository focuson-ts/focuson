import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { defaultPageSelectionAndRestCommandsContext } from "@focuson/focuson";
import { Context, emptyState, FState } from "../common";
import { pages } from "../pages";
import * as render  from "../ETransfer/ETransfer.render";
import * as domain  from "../ETransfer/ETransfer.domains";
import * as samples  from "../ETransfer/ETransfer.samples";
import * as empty from "../ETransfer/ETransfer.empty";
 
export default {
   component: render.ETransferPage,
   title: 'Forms/ETransfer'
}
 
interface StoryState {
   domain: domain.ETransferDataDDomain
   pageMode: PageMode
}
 
const initial = {"fromApi":{}}
const Template: Story<StoryState> = ( args: StoryState ) =>
   SBookProvider<FState, Context> ( { ...emptyState, ETransfer: { ...initial, fromApi: args.domain } },//NOTE currently stories only work if the target depth is 1
     defaultPageSelectionAndRestCommandsContext<FState> ( pages ),
     s => findOneSelectedPageDetails ( s ) ( { pageName: 'ETransfer', pageMode:args.pageMode} ) );
 
 
export const View = Template.bind ( {} );
View.args = {
   domain: samples.sampleETransferDataD0,
   pageMode: 'view'
};
export const Edit = Template.bind ( {} );
 Edit.args = {
   domain: samples.sampleETransferDataD0,
   pageMode: 'edit'
};
 
export const Empty = Template.bind ( {} );
Empty.args = {
   domain: empty.emptyETransferDataD,
   pageMode: 'create'
};