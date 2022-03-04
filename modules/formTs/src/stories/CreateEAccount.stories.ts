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
   component: render.CreateEAccountPage,
   title: 'Forms/CreateEAccount'
}
 
interface StoryState {
   domain: domain.CreateEAccountDataDDDomain
   pageMode: PageMode
}
 
const Template: Story<StoryState> = ( args: StoryState ) =>
   SBookProvider<FState, Context> ( { ...emptyState, CreateEAccount: { editing: args.domain } },//NOTE currently stories only work if the target depth is 1
     defaultPageSelectionAndRestCommandsContext<FState> ( pages ),
     s => findOneSelectedPageDetails ( s ) ( { pageName: 'CreateEAccount', pageMode:args.pageMode} ) );
 
 
export const View = Template.bind ( {} );
View.args = {
   domain: samples.sampleCreateEAccountDataDD0,
   pageMode: 'view'
};
export const Edit = Template.bind ( {} );
 Edit.args = {
   domain: samples.sampleCreateEAccountDataDD0,
   pageMode: 'edit'
};
 
export const Empty = Template.bind ( {} );
Empty.args = {
   domain: empty.emptyCreateEAccountDataDD,
   pageMode: 'create'
};