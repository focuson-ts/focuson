export interface LabelAndFixedNumberProps {
  id: string
  label: string;
  number: string;
}
export function LabelAndFixedNumber ( { id, label, number }: LabelAndFixedNumberProps ) {
  return <div className='labelValueButton'><label className='input-label' htmlFor={id}>{label}</label><input id={id} className='input' readOnly type='number' value={number}/></div>
}