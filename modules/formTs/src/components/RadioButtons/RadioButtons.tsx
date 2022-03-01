import { LensState } from '@focuson/state';
import { FourRadioGroupProps, LabelValue, RadioButtonProps, RadioGroupProps, ThreeRadioGroupProps, TwoRadioGroupProps } from './RadioButtons.domain';

function setJson<S, Value,C>(state: LensState<S, Value,C>, labelValues: LabelValue<Value>[], selectedLabel: string) {
  const newValue = labelValues.find((lv) => lv.label === selectedLabel)?.value;
  if (newValue !== undefined) state.setJson(newValue);
}

function Radio({ label, name, checked, disabled, onChange }: RadioButtonProps) {
  return (
    <>
      <input disabled={disabled} type="radio" name={name} value={label} checked={checked} onChange={({ target: { value: selectedLabel } }) => onChange(selectedLabel)} />
      <label htmlFor="label">{label}</label>
    </>
  );
}

function RadioGroup<S, Value,C>({ state, labelValues, groupName, disabled }: RadioGroupProps<S, Value,C>) {
  return (
    <>
      {labelValues.map(({ label, value }) => (
        <Radio disabled={disabled} key={label} label={label} name={groupName} checked={state.optJson() === value} onChange={(selectedlabel) => setJson<S, Value,C>(state, labelValues, selectedlabel)} />
      ))}
    </>
  );
}

export function TwoRadioGroup<S, Value,C>({ labelValues, state, groupName , disabled}: TwoRadioGroupProps<S, Value,C>) {
  return <RadioGroup state={state} labelValues={labelValues} groupName={groupName} disabled={disabled} />;
}

export function ThreeRadioGroup<S,C>({ labelValues, state, groupName, disabled }: ThreeRadioGroupProps<S,C>) {
  return <RadioGroup state={state} labelValues={labelValues} groupName={groupName} disabled={disabled} />;
}

export function FourRadioGroup<S,C>({ labelValues, state, groupName, disabled }: FourRadioGroupProps<S,C>) {
  return <RadioGroup state={state} labelValues={labelValues} groupName={groupName} disabled={disabled} />;
}