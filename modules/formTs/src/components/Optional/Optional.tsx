import {OptionalProps, yesNo} from './Optional.domain';
import {Label} from "../../copied/Label";
import {Radio} from "../../copied/Radio";

export function Optional<S, T, Context>({ state, label, mode, ariaLabel, name }: OptionalProps<S, string, Context>) {
  return (
    <div>
      <Label label={label} htmlFor={name}/>
        <div>
            <Radio id={name} state={state} mode={mode} ariaLabel={ariaLabel} enums={yesNo}/>
        </div>
    </div>
  );
}
