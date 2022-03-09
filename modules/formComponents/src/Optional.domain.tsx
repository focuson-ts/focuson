import { CommonStateProps } from "./common";


export interface OptionalProps<S, T, Context> extends CommonStateProps<S, T, Context> {
  label?: string
}

export enum yesNo {
  YES = 'Yes',
  NO = 'No'
}
