import { Children } from "react";

interface CustomLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export function CustomLayout ( { children }: CustomLayoutProps ) {
  return <div style={{clear: 'left', display: 'flow-root'}}>
    <div>{Children.map(children, child => <div>{child}</div>)}</div>
  </div>
}


