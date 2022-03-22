import { OptionalProps } from './Optional.domain';
import { Label } from "../Label";
import { Radio } from "../Radio";
import { FocusOnContext } from "@focuson/focuson";

export enum yesNo {
  YES = 'Yes',
  NO  = 'No'
}

export function Optional<S, T, Context extends FocusOnContext<S>> ( { id, state, label, mode, ariaLabel, name }: OptionalProps<S, string, Context> ) {
  return (
    <div>
      <Label state={state} label={label} htmlFor={name}/>
      <div>
        <Radio id={id} state={state} mode={mode} ariaLabel={ariaLabel} enums={yesNo}/>
      </div>
    </div>
  );
}
