import { LensProps } from '@focuson/state';

interface GroupProps {
  groupName: string;
  disabled?: boolean;
}

export interface LabelValue<Value> {
  label: string;
  value: Value;
}

export interface RadioButtonProps {
  disabled?: boolean;
  checked: boolean;
  label: string;
  name: string;
  onChange: (selectedLabel: string) => void;
}

export interface RadioGroupProps<S, Value,C> extends LensProps<S, Value,C>, GroupProps {
  labelValues: LabelValue<Value>[];
}

export interface TwoRadioGroupProps<S, Value,C> extends LensProps<S, Value,C>, GroupProps {
  labelValues: [LabelValue<Value>, LabelValue<Value>];
}

export interface ThreeRadioGroupProps<S,C> extends LensProps<S, string,C>, GroupProps {
  labelValues: [LabelValue<string>, LabelValue<string>, LabelValue<string>];
}

export interface FourRadioGroupProps<S,C> extends LensProps<S, string,C>, GroupProps {
  labelValues: [LabelValue<string>, LabelValue<string>, LabelValue<string>, LabelValue<string>];
}
