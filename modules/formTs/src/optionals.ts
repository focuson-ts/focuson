import {FState, identityL } from './common';
import { Lenses, NameAndLensFn, Optional } from '@focuson/lens'

export const namedOptionals: NameAndLensFn<FState> = {
  currentOccupation: id => id.focusQuery ( 'OccupationAndIncomeSummary' ).focusQuery ( 'fromApi' ).focusQuery ( 'customerOccupationIncomeDetails' ),
  selected: id => id.focusQuery ( 'OccupationAndIncomeSummary' ).focusQuery ( 'selectedItem' )
}