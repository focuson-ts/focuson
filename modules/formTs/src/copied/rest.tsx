import { CommonStateProps } from "./common";

export interface RestButtonProps<S,T, Context> extends CommonStateProps<S,T, Context>{
}

export function RestButton<S,T, Context>({id}: RestButtonProps<S, T, Context>){
  return <button>{id}</button>
}