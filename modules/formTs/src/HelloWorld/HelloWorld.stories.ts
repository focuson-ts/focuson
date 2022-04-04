import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode, PageSelection } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { Lenses } from "@focuson/lens";
import { context, Context, emptyState, FState } from "../common";
import { pages } from "../pages";
import * as render  from "../HelloWorld/HelloWorld.render";
import * as domain  from "../HelloWorld/HelloWorld.domains";
import * as samples  from "../HelloWorld/HelloWorld.samples";
import * as empty from "../HelloWorld/HelloWorld.empty";
 
export default {
   component: render.HelloWorldPage,
   title: 'Forms/HelloWorld'
}
 
interface StoryState {
   domain: domain.HelloWorldDomain
   pageMode: PageMode
}
 
const initial = {"main":{"hello":"World"}}
function pageSelection ( pageMode: PageMode ): PageSelection { return { pageName: 'HelloWorld', pageMode}}
const Template: Story<StoryState> = ( args: StoryState ) =>{
  const pageDetails: any = pages[ 'HelloWorld' ];
  const initial = pageDetails.initialValue?pageDetails.initialValue:{}
  const rawState: FState = { ...emptyState, pageSelection: [ pageSelection ( args.pageMode ) ], HelloWorld: initial }
  const startState=Lenses.identity<FState>().focusQuery('HelloWorld').focusQuery('main').set(rawState, args.domain)
  return SBookProvider<FState, Context> (startState, context,
     s => findOneSelectedPageDetails ( s, pageDetails.lens) (pageSelection(args.pageMode)).element );}
 
 
export const View = Template.bind ( {} );
View.args = {
   domain: samples.sampleHelloWorld0,
   pageMode: 'view'
};
export const Edit = Template.bind ( {} );
 Edit.args = {
   domain: samples.sampleHelloWorld0,
   pageMode: 'edit'
};
 
export const Empty = Template.bind ( {} );
Empty.args = {
   domain: empty.emptyHelloWorld,
   pageMode: 'create'
};