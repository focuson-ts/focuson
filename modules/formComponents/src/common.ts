import { LensState } from "@focuson/state";
import { PageMode } from "@focuson/pages";
import { NameAnd, toArray } from "@focuson/utils";
import { InputChangeCommands, ModalChangeCommands } from "@focuson/rest";


export interface CommonComponentProps {
  id: string;
  name?: string;
  ariaLabel?: string;
  mode?: PageMode;
  required?: boolean;
}

export interface CommonStateProps<S, T, Context> extends CommonComponentProps {
  state: LensState<S, T, Context>;
}

export interface InputEnabledProps {
  enabledBy?: string[][]
}


export interface DropDownOnChangeProps<S, Context> extends InputOnChangeProps<S, Context> {
  parentState?: LensState<S, any, Context>;
  specificOnChange?: NameAnd<InputChangeCommands | InputChangeCommands[]>
}

export interface InputOnChangeProps<S, Context> {
  parentState?: LensState<S, any, Context>;
  onChange?: InputChangeCommands | InputChangeCommands[]
}
export enum ContactTitle {
  X         = '',
  MR        = 'Mr',
  MRS       = 'Mrs',
  MISS      = 'Miss',
  MS        = 'Ms',
  DR        = 'Dr',
  REV       = 'Rev',
  PROF      = 'Prof',
  SIR       = 'Sir',
  CAPTAIN   = 'Captain',
  LADY      = 'Lady',
  MAJOR     = 'Major',
  MASTER    = 'Master',
  LORD      = 'Lord',
  COLONEL   = 'Colonel',
  BARON     = 'Baron',
  VISCOUNT  = 'Viscount',
  BRIGADIER = 'Brigadier',
  LIEUT_COL = 'Lieut Col',
  FRAU      = 'Frau',
  HERR      = 'Herr',
  FATHER    = 'Father',
  MESSRS    = 'Messrs',
  MADAM     = 'Madam'
}
export const CustomerStatus = {
  X: '',
  E: 'Employed',
  S: 'Self Employed',
  C: 'Currently not earning',
  R: 'Retired',
  T: 'Student',
  U: 'Unknown',
  H: 'Home Family Responsibilities'
}
export const YesNo = {
  X: '',
  N: 'No',
  Y: 'Yes'
}
export const EmploymentType = {
  0: '',
  1: 'Permanent',
  2: 'Temporary',
  3: 'Contract'
}
export const HowOften = {
  0: '',
  1: 'Annual',
  2: 'Monthly',
  3: 'Quarterly',
  4: 'Half-Yearly',
  5: 'Fortnightly',
  6: 'Weekly'
}

export interface CustomButtonType {
  buttonType?: 'primary' | 'secondary' | 'default'
}

export const getButtonClassName = ( buttonType: string | undefined ) => (buttonType == 'primary' ? 'primary-btn' : (buttonType == 'secondary' ? 'secondary-btn' : 'button'))

export interface LabelAlignment {
  labelPosition?: 'Horizontal' | 'Vertical'
}

export function lastIndexOf<T> ( ts: T[], fn: ( t: T ) => boolean ): number {
  const copy: T[] = [ ...ts ].reverse ()
  const index = copy.findIndex ( fn )
  return ts.length - index - 1
}

export function trimDownText ( s: string, trimDownToSize: number ): string {
  const size = trimDownToSize ? trimDownToSize : 300;
  return s.length > size ? s.slice ( 0, size ) + " ..." : s
}
