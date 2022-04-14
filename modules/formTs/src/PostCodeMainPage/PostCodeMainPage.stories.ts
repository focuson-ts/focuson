import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode, PageSelection } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { Lenses } from "@focuson/lens";
import { context, Context, emptyState, FState } from "../common";
import { pages } from "../pages";
import * as render  from "../PostCodeMainPage/PostCodeMainPage.render";
import * as domain  from "../PostCodeMainPage/PostCodeMainPage.domains";
import * as samples  from "../PostCodeMainPage/PostCodeMainPage.samples";
import * as empty from "../PostCodeMainPage/PostCodeMainPage.empty";
 
export default {
   component: render.PostCodeMainPagePage,
   title: 'Forms/PostCodeMainPage'
}
 
interface StoryState {
   domain: domain.PostCodeNameAndAddressDomain
   pageMode: PageMode
}
 
const initial = {"main":{},"postcode":{"search":"","searchResults":[],"addressResults":{"line1":"","line2":"","line3":"","line4":""}}}
function pageSelection ( pageMode: PageMode ): PageSelection { return { pageName: 'PostCodeMainPage', pageMode}}
const Template: Story<StoryState> = ( args: StoryState ) =>{
  const pageDetails: any = pages[ 'PostCodeMainPage' ];
  const initial = pageDetails.initialValue?pageDetails.initialValue:{}
  const rawState: FState = { ...emptyState, pageSelection: [ pageSelection ( args.pageMode ) ], PostCodeMainPage: initial }
  const startState=Lenses.identity<FState>().focusQuery('PostCodeMainPage').focusQuery('main').set(rawState, args.domain)
  return SBookProvider<FState, Context> (startState, context,
     s => findOneSelectedPageDetails ( s, pageDetails.lens) (pageSelection(args.pageMode), 0).element );}
 
 
export const View = Template.bind ( {} );
View.args = {
   domain: samples.samplePostCodeNameAndAddress0,
   pageMode: 'view'
};
export const Edit = Template.bind ( {} );
 Edit.args = {
   domain: samples.samplePostCodeNameAndAddress0,
   pageMode: 'edit'
};
 
export const Empty = Template.bind ( {} );
Empty.args = {
   domain: empty.emptyPostCodeNameAndAddress,
   pageMode: 'create'
};