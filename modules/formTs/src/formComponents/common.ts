import { LensState } from "@focuson/state";
import { PageMode } from "@focuson/pages";


export interface CommonComponentProps {
  id: string;
  name?: string;
  ariaLabel?: string;
  mode?: PageMode;
  required?: boolean;
}
export interface StringValidations {
  minlength?: number;
  maxlength?: number;
}
export interface NumberValidations {
  min?: number;
  max?: number;
}
export interface BooleanValidations {}


export interface CommonStateProps<S, T, Context> extends CommonComponentProps {
  state: LensState<S, T, Context>;
}

export enum ContactTitle {
  X = '',
  MR = 'Mr',
  MRS = 'Mrs',
  MISS = 'Miss',
  MS = 'Ms',
  DR = 'Dr',
  REV = 'Rev',
  PROF = 'Prof',
  SIR = 'Sir',
  CAPTAIN = 'Captain',
  LADY = 'Lady',
  MAJOR = 'Major',
  MASTER = 'Master',
  LORD = 'Lord',
  COLONEL = 'Colonel',
  BARON = 'Baron',
  VISCOUNT = 'Viscount',
  BRIGADIER = 'Brigadier',
  LIEUT_COL = 'Lieut Col',
  FRAU = 'Frau',
  HERR = 'Herr',
  FATHER = 'Father',
  MESSRS = 'Messrs',
  MADAM = 'Madam'
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