import { TwoRadioGroup } from '../RadioButtons/RadioButtons';
import { OptionalProps } from './Optional.domain';

export function Optional<S,C>({ state, label }: OptionalProps<S,C>) {
  return (
    <div>
      <label>{label}</label>
      <TwoRadioGroup
        groupName="reducedPayment"
        labelValues={[
          { label: 'YES', value: true },
          { label: 'NO', value: false }
        ]}
        state={state}
      />
    </div>
  );
}
