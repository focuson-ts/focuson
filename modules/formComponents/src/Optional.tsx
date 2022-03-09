import { OptionalProps, yesNo } from './Optional.domain';
import { Label } from "./Label";
import { Radio } from "./Radio";


export function Optional<S, T, Context> ( { id, state, label, mode, ariaLabel, name }: OptionalProps<S, string, Context> ) {
  return (
    <div>
      <Label label={label} htmlFor={name}/>
      <div>
        <Radio id={id} state={state} mode={mode} ariaLabel={ariaLabel} enums={yesNo}/>
      </div>
    </div>
  );
}
