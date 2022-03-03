import { LensProps } from '@focuson/state';
import { PageMode } from "@focuson/pages";
import {CommonStateProps} from "../../copied/common";

export interface OptionalProps<S, T, Context> extends CommonStateProps<S, T, Context> {
  label?: string
}

export enum yesNo {
  YES = 'Yes',
  NO = 'No'
}
