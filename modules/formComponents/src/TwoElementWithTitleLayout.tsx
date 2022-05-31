export interface TwoElementWithTitleProps {
  children: [ JSX.Element, JSX.Element ];
  title?: string;
}

export function TwoElementWithTitleLayout ( { title, children }: TwoElementWithTitleProps ) {
  return <div className='labelValueButton'><label className="checkbox-container">{title}{children[ 0 ]}</label>{children[ 1 ]}</div>
}
