export interface TwoElementWithTitleProps {
  children: [ JSX.Element, JSX.Element ];
  label?: string;
}

export function TwoElementWithLabelLayout ( { label, children }: TwoElementWithTitleProps ) {
  return <span>{label}{children[ 0 ]}{children[ 1 ]}</span>
}
