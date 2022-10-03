export interface LabelAndFixedStringProps {
  id: string
  label: string;
  string: string;
  className?: string
}
export function LabelAndFixedString ( { id, label, string, className }: LabelAndFixedStringProps ) {
  const clazz = className ? className : 'input-label'
  return <div className='labelValueButton'><label className={clazz} htmlFor={id} dangerouslySetInnerHTML={{ __html: label }}/><input id={id} className='input' readOnly type='text' value={string}/></div>
}