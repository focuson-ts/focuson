import {FState, identityL } from './common';
import { Lenses, NameAndLensFn, Optional } from '@focuson/lens'

export const namedOptionals: NameAndLensFn<FState> = {
  selectedAccount:  id => {
    return Lenses.chainNthFromOptionalFn ( id, state => {
      if ( state.JointAccount?.joint )
        return id.focusQuery ( 'JointAccount' ).focusQuery ( 'fromApi' ).focusQuery ( 'joint' )
      else
        return id.focusQuery ( 'JointAccount' ).focusQuery ( 'fromApi' ).focusQuery ( 'main' )
    }, '#currentOccupation' )
  },
  currentOccupation: id => id.focusQuery ( 'OccupationAndIncomeSummary' ).focusQuery ( 'fromApi' ).focusQuery ( 'customerOccupationIncomeDetails' ),
  selected: id => id.focusQuery ( 'OccupationAndIncomeSummary' ).focusQuery ( 'selectedItem' )
}