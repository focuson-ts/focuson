export interface TwoElementWithTitleProps {
  children: [ JSX.Element, JSX.Element ];
  title?: string;
}

export function TwoElementWithTitleLayout ( { title, children }: TwoElementWithTitleProps ) {
  return <div className='labelCheckboxButton'><label className="checkbox-container">{title}{children[ 0 ]}</label>{children[ 1 ]}</div>
}
