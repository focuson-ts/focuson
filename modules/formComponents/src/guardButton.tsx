export function GuardButton ( { cond, children }: { cond: string[], children: JSX.Element } ) {
  return cond.length === 0 ? children : <span/>
}