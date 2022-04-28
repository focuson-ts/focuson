export interface SortCodeProps {
  label: string
  children: [ JSX.Element, JSX.Element, JSX.Element ];
}
export function SortCodeLayout<S, T, Context> ( { label, children }: SortCodeProps ) {
  const [ c1, c2, c3 ] = children
  return <span>{label}{c1}{c2}{c3}</span>
}

