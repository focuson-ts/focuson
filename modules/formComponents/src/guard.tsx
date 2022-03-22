export interface GuardProps {
  value: any;
  cond: string[];
  children: JSX.Element;
  height?: string
}
export function Guard ( { value, cond, children, height }: GuardProps ) {
  return value && cond.indexOf ( value.toString () )>=0 ? children : <span style={{ height: height ? height : '20px', display: 'flex' }}/>
}