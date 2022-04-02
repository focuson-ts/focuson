import {FState, identityL } from './common';
import { Lenses, NameAndLens, Optional } from '@focuson/lens'

export const namedOptionals: NameAndLens<FState> = {
  currentOccupation: Lenses.identity<FState>().focusQuery ( 'OccupationAndIncomeSummary' ).focusQuery ( 'fromApi' ).focusQuery ( 'customerOccupationIncomeDetails' ),
  selected: Lenses.identity<FState>().focusQuery ( 'OccupationAndIncomeSummary' ).focusQuery ( 'selectedItem' )
}