import { CommonComponentProps, CommonStateProps } from "./common";


export interface TableProps<S, T> extends CommonStateProps<S, T[]> {
  order: (keyof T)[]
}

export function Table<S, T> ( { id, order }: TableProps<S, T> ) {
  return <p>Table with order {order}</p>
}