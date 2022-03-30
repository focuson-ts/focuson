import {FState, identityL } from '../common';
import { Lenses, Optional } from '@focuson/lens'

const currentOccupation: Optional<FState, number> = identityL.focusOn('something');
const selected: Optional<FState, number> = Lenses.identity<FState>...copy;