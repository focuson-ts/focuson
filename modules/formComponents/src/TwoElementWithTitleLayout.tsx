export interface TwoElementWithTitleProps {
  children: [ JSX.Element, JSX.Element ];
  title?: string;
}

export function TwoElementWithTitleLayout ( { title, children }: TwoElementWithTitleProps ) {
  return <span className='labelValueButton'><label>{title}</label>{children[ 0 ]}{children[ 1 ]}</span>
}
