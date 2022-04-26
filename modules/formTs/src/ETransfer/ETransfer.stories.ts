import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode, PageSelection } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { Lenses } from "@focuson/lens";
import { context, Context, emptyState, FState } from "../common";
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
function pageSelection ( pageMode: PageMode ): PageSelection { return { pageName: 'ETransfer', pageMode}}
const Template: Story<StoryState> = ( args: StoryState ) =>{
  const pageDetails: any = pages[ 'ETransfer' ];
  const initial = pageDetails.initialValue?pageDetails.initialValue:{}
  const rawState: FState = { ...emptyState, pageSelection: [ pageSelection ( args.pageMode ) ], ETransfer: initial }
  const startState=Lenses.identity<FState>().focusQuery('ETransfer').focusQuery('fromApi').set(rawState, args.domain)
  return SBookProvider<FState, Context> (startState, context,
     s => findOneSelectedPageDetails ( s, pageDetails.len) (pageSelection(args.pageMode), 0).element );}
 
 
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