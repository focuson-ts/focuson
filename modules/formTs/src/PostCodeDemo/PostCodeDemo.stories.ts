import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { defaultPageSelectionAndRestCommandsContext } from "@focuson/focuson";
import { Context, emptyState, FState } from "../common";
import { pages } from "../pages";
import * as render  from "../PostCodeDemo/PostCodeDemo.render";
import * as domain  from "../PostCodeDemo/PostCodeDemo.domains";
import * as samples  from "../PostCodeDemo/PostCodeDemo.samples";
import * as empty from "../PostCodeDemo/PostCodeDemo.empty";
 
export default {
   component: render.PostCodeDemoPage,
   title: 'Forms/PostCodeDemo'
}
 
interface StoryState {
   domain: domain.PostCodeMainPageDomain
   pageMode: PageMode
}
 
const initial = {"main":{},"postcode":{}}
const Template: Story<StoryState> = ( args: StoryState ) =>
   SBookProvider<FState, Context> ( { ...emptyState, PostCodeDemo: { ...initial, main: args.domain } },//NOTE currently stories only work if the target depth is 1
     defaultPageSelectionAndRestCommandsContext<FState> ( pages ),
     s => findOneSelectedPageDetails ( s ) ( { pageName: 'PostCodeDemo', pageMode:args.pageMode} ) );
 
 
export const View = Template.bind ( {} );
View.args = {
   domain: samples.samplePostCodeMainPage0,
   pageMode: 'view'
};
export const Edit = Template.bind ( {} );
 Edit.args = {
   domain: samples.samplePostCodeMainPage0,
   pageMode: 'edit'
};
 
export const Empty = Template.bind ( {} );
Empty.args = {
   domain: empty.emptyPostCodeMainPage,
   pageMode: 'create'
};