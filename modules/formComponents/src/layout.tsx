export interface LayoutProps{
  details: string;
  children: JSX.Element | JSX.Element[]
}
export function Layout ( { details, children }: LayoutProps ) {
  return <div className='layout' id={details}>{children}</div>
}