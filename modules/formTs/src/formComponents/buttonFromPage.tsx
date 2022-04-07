import { NameAnd, sortedEntries } from "@focuson/utils";

export function ButtonFromPage ( { button, buttons }: { button: string | undefined; buttons: NameAnd<JSX.Element> } ): JSX.Element {
  if ( button === undefined ) return <></>
  const disp = buttons[ button ]
  return disp ? disp : <button>Error: Button{button} is not in ${JSON.stringify ( sortedEntries ( buttons ).map ( t => t[ 0 ] ) )}</button>
}