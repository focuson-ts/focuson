import { TransformerProps } from "./labelAndInput";

export const StringTransformer: TransformerProps<string> = { transformer: s => s, type: 'text', default: '' }
export const NumberTransformer: TransformerProps<number> = { transformer: s => Number ( s ), type: 'number', default: 0 }
export const BooleanTransformer: TransformerProps<boolean> = { transformer: s => s === 'true', type: 'checkbox', default: false }
