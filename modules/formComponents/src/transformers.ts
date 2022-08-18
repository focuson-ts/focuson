import { CheckboxProps, StringProps, TransformerProps } from "./labelAndInput";

export const StringTransformer: StringProps<string> = { transformer: s => s, type: 'text', default: '' }
export const NumberTransformer: StringProps<number> = { transformer: s => Number ( s ), type: 'number', default: undefined }
export const BooleanTransformer: CheckboxProps<boolean> = { transformer: s => s === true, default: false, checkbox: b => !!b }
export const BooleanYNTransformer: CheckboxProps<string> = { transformer: s => s ? 'Y' : 'N', default: 'N', checkbox: b => b === 'Y' }
