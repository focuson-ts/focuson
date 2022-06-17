export interface LabelAndFixedNumberProps {
  id: string
  label: string;
  number: string;
}
export function LabelAndFixedNumber ( { id, label, number }: LabelAndFixedNumberProps ) {
  return <div className='labelValueButton'><label className='input-label'>{label}</label><input className='input' readOnly type='number' value={number}/></div>
}