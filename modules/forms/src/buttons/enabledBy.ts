import { toArray } from "@focuson/utils";

export interface CustomButtonType {
  buttonType?: 'primary' | 'secondary' | 'button'
}

export interface EnabledBy extends CustomButtonType{
  enabledBy?: string | string[]
}

export function getButtonTypeText<B extends CustomButtonType> ( button: B ) {
  return button.buttonType ? `buttonType='${button.buttonType}' ` : '';
}
export function enabledByString ( e: EnabledBy ) {
  return e.enabledBy ? `enabledBy={[${e.enabledBy && toArray ( e.enabledBy ).map ( e => e + 'Guard' ).join ( ',' )}]} ` : ''
}