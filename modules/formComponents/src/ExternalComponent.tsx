import { HasDependencies } from "@focuson-nw/focuson";
import { LensProps } from "@focuson-nw/state";

interface ExternalComponentProps<S,C> extends LensProps<S, any, C>{
  id: string
  nameOfComponentFn: string
}


export function ExternalComponent<S,C extends HasDependencies>( {id,  state, nameOfComponentFn}: ExternalComponentProps<S, C>){
  const componentFn = state.context.dependencies?.[nameOfComponentFn]
  console.log('ExternalComponent', state.context, nameOfComponentFn )
  return componentFn?componentFn(id, state): <div id={id}><p>The External Component {nameOfComponentFn} will be displayed here</p></div>
}