import { NameAnd, sortedEntries } from "@focuson/utils";

export function ButtonFromPage ( { button, buttons }: { button: string | undefined; buttons: NameAnd<JSX.Element> } ): JSX.Element {
  if ( button === undefined ) return <></>
  const disp = buttons[ button ]
  return disp ? disp : <></>
}