export interface LabelAndFixedNumberProps {
  id: string
  label: string;
  number: string;
  className?: string
}
export function LabelAndFixedNumber ( { id, label, number, className }: LabelAndFixedNumberProps ) {
  const clazz = className ? className : 'input-label'
  return <div className='labelValueButton'><label className={clazz} htmlFor={id}>{label}</label><input id={id} className='input' readOnly type='number' value={number}/></div>
}