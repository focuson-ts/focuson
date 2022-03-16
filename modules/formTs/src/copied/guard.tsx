export interface GuardProps {
  value: any;
  cond: string[];
  children: JSX.Element
}
export function Guard ( { value, cond, children }: GuardProps ) {
  return value && cond.indexOf ( value.toString () )>=0 ? children : <span/>
}