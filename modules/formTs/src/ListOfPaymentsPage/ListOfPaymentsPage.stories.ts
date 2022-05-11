import { Story } from "@storybook/react";
import { findOneSelectedPageDetails, PageMode, PageSelection } from "@focuson/pages";
import { SBookProvider } from "@focuson/stories";
import { Lenses } from "@focuson/lens";
import { context, Context, emptyState, FState } from "../common";
import { pages } from "../pages";
import * as render  from "../ListOfPaymentsPage/ListOfPaymentsPage.render";
import * as domain  from "../ListOfPaymentsPage/ListOfPaymentsPage.domains";
import * as samples  from "../ListOfPaymentsPage/ListOfPaymentsPage.samples";
import * as empty from "../ListOfPaymentsPage/ListOfPaymentsPage.empty";
 
export default {
   component: render.ListOfPaymentsPagePage,
   title: 'Forms/ListOfPaymentsPage'
}
 
interface StoryState {
   domain: domain.PrintRecordHistoryDomain
   pageMode: PageMode
}
 
const initial = {"selected":0}
function pageSelection ( pageMode: PageMode ): PageSelection { return { pageName: 'ListOfPaymentsPage', pageMode}}
const Template: Story<StoryState> = ( args: StoryState ) =>{
  const pageDetails: any = pages[ 'ListOfPaymentsPage' ];
  const initial = pageDetails.initialValue?pageDetails.initialValue:{}
  const rawState: FState = { ...emptyState, pageSelection: [ pageSelection ( args.pageMode ) ], ListOfPaymentsPage: initial }
  const startState=Lenses.identity<FState>().focusQuery('ListOfPaymentsPage').focusQuery('display').set(rawState, args.domain)
  return SBookProvider<FState, Context> (startState, context,
     s => findOneSelectedPageDetails ( s, pageDetails.lens, 1) (pageSelection(args.pageMode), 0).element );}
 
 
export const View = Template.bind ( {} );
View.args = {
   domain: samples.samplePrintRecordHistory0,
   pageMode: 'view'
};
export const Edit = Template.bind ( {} );
 Edit.args = {
   domain: samples.samplePrintRecordHistory0,
   pageMode: 'edit'
};
 
export const Empty = Template.bind ( {} );
Empty.args = {
   domain: empty.emptyPrintRecordHistory,
   pageMode: 'create'
};