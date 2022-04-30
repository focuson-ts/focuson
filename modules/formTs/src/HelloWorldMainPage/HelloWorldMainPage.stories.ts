import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode, PageSelection } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { Lenses } from "@focuson/lens";
import { context, Context, emptyState, FState } from "../common";
import { pages } from "../pages";
import * as render  from "../HelloWorldMainPage/HelloWorldMainPage.render";
import * as domain  from "../HelloWorldMainPage/HelloWorldMainPage.domains";
import * as samples  from "../HelloWorldMainPage/HelloWorldMainPage.samples";
import * as empty from "../HelloWorldMainPage/HelloWorldMainPage.empty";
 
export default {
   component: render.HelloWorldMainPagePage,
   title: 'Forms/HelloWorldMainPage'
}
 
interface StoryState {
   domain: domain.HelloWorldDomainDataDomain
   pageMode: PageMode
}
 
const initial = undefined
function pageSelection ( pageMode: PageMode ): PageSelection { return { pageName: 'HelloWorldMainPage', pageMode}}
const Template: Story<StoryState> = ( args: StoryState ) =>{
  const pageDetails: any = pages[ 'HelloWorldMainPage' ];
  const initial = pageDetails.initialValue?pageDetails.initialValue:{}
  const rawState: FState = { ...emptyState, pageSelection: [ pageSelection ( args.pageMode ) ], HelloWorldMainPage: initial }
  const startState=Lenses.identity<FState>().focusQuery('HelloWorldMainPage').focusQuery('fromApi').set(rawState, args.domain)
  return SBookProvider<FState, Context> (startState, context,
     s => findOneSelectedPageDetails ( s, pageDetails.lens, 1) (pageSelection(args.pageMode), 0).element );}
 
 
export const View = Template.bind ( {} );
View.args = {
   domain: samples.sampleHelloWorldDomainData0,
   pageMode: 'view'
};
export const Edit = Template.bind ( {} );
 Edit.args = {
   domain: samples.sampleHelloWorldDomainData0,
   pageMode: 'edit'
};
 
export const Empty = Template.bind ( {} );
Empty.args = {
   domain: empty.emptyHelloWorldDomainData,
   pageMode: 'create'
};