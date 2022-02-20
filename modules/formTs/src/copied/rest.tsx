import { CommonStateProps } from "./common";

export interface RestButtonProps<S,T> extends CommonStateProps<S,T>{
}

export function RestButton<S,T>({id}: RestButtonProps<S, T>){
  return <button>{id}</button>
}