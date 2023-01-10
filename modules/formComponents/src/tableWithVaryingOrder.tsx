import { LensProps, LensState } from "@focuson-nw/state";
import { CommonTableProps, Table } from "./table";
import { NameAnd } from "@focuson-nw/utils";
import { PageSelectionContext } from "@focuson-nw/pages";


export interface TableWithVaryingOrderProps<S, T, C> extends CommonTableProps<S, T, C> {
  order: NameAnd<string[]>;
  select: LensState<S, string, C>
}

export function TableWithVaryingOrder<S, T, C extends PageSelectionContext<S>> ( props: TableWithVaryingOrderProps<S, T, C> ) {
  const { select, order } = props
  const cleanedProps: any = { ...props }
  delete cleanedProps.order
  const keyValue = select.optJson ()
  if ( keyValue === undefined ) return <></>
  const actualOrder:any= order[ keyValue ]
  if (actualOrder ===undefined)return <></>
  return <Table {...cleanedProps} order={actualOrder}/>
}