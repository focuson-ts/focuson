export function GuardButton ( { cond, children }: { cond: boolean, children: JSX.Element } ) {
  return cond ? children : <span/>
}