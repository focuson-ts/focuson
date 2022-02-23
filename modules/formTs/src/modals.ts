import { Lenses } from "@focuson/lens";
import { ModalPagesDetails } from "@focuson/pages";
import { CreatePlanPage } from "./render";
import { Context, FState } from "./common";


export type Modals = typeof modals
const identity = Lenses.identity<FState> ( 'allModalPages' );
export const modals: ModalPagesDetails<FState,Context> = {
      EAccountsSummary_CreatePlan: { displayModalFn: CreatePlanPage, mode: 'edit', lens: identity.focusQuery('EAccountsSummary').focusQuery('fromApi').focusQuery('createPlan')}
}