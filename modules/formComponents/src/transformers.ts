import {TransformerProps} from "./LabelAndInput";

export const StringTransformer: TransformerProps<string> = { transformer: s => s, type: 'text' }
export const NumberTransformer: TransformerProps<number> = { transformer: s => Number ( s ), type: 'number' }
export const BooleanTransformer: TransformerProps<boolean> = { transformer: s => s === 'true', type: 'checkbox' }
