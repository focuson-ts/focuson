export interface GuardProps {
  value: any;
  cond: string[] | boolean;
  children: JSX.Element;
  height?: string
}
export function Guard ( { value, cond, children, height }: GuardProps ) {
  const display = value && (typeof cond === 'boolean' ? (value.length===0) === cond : cond.indexOf ( value.toString () ) >= 0)
  return display ? children : <span style={{ height: height ? height : '20px', display: 'flex' }}/>
}