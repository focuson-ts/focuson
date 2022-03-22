import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode, PageSelection } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { context, Context, emptyState, FState } from "../common";
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
 
const initial = {"main":{},"postcode":{"search":"","searchResults":[],"addressResults":{"line1":"","line2":"","line3":"","line4":""}}}
function pageSelection ( pageMode: PageMode ): PageSelection { return { pageName: 'PostCodeDemo', pageMode}}
const Template: Story<StoryState> = ( args: StoryState ) =>{
  const startState: FState = { ...emptyState, pageSelection: [ pageSelection ( args.pageMode ) ] }
  return SBookProvider<FState, Context> ( { ...startState, PostCodeDemo: { ...initial, main: args.domain } },//NOTE currently stories only work if the target depth is 1
     context,
     s => findOneSelectedPageDetails ( s ) (pageSelection(args.pageMode)).element );}
 
 
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