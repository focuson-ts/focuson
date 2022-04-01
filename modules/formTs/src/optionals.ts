import {FState, identityL } from './common';
import { Lenses, NameAndLens, Optional } from '@focuson/lens'

export const optionals: NameAndLens<FState> = {
  currentOccupation: identityL.focusQuery ( 'OccupationAndIncomeSummary' ).focusQuery ( 'fromApi' ).focusQuery ( 'customerOccupationIncomeDetails' ),
  selected: identityL.focusQuery ( 'OccupationAndIncomeSummary' ).focusQuery ( 'selectedItem' )
}