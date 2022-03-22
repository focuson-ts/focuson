import { LensProps } from "@focuson/state";

export interface LayoutProps{
  details: string;
  children: JSX.Element | JSX.Element[];
  title?: string;
}
// TODO LAYOUT TITLE ?
export function Layout<S, T, Context> ( { details, children, title }: LayoutProps ) {
  // return <div className='layout' id={details}>{children}</div>
  let elemIndex = 0
  const detailsAsNumberArr = JSON.parse ( details )
  let elemArr: number[] = detailsAsNumberArr.flat ().map ( ( val: any, i: any, arr: any ) => arr[ i ] += arr[ i - 1 ] ? arr[ i - 1 ] : 0 )
  return <>
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {/*<h6>{state.focusOn('mainCustomerName') + 'and' + state.focusOn('jointCustomerName')}</h6>*/}
    </div>
    <div style={{ display: 'flex' }}>
      {/*<h6>{title}{state.focusOn('mainCustomerName')}</h6>*/}
    </div>
    {detailsAsNumberArr.map ( ( row: any, rowIndex: number, arr: number[][] ) =>
      <div className="row border my-1" key={rowIndex}>
        {row.map ( ( col: any, colIndex: number ) =>
          <div className="col border" key={elemIndex}>
            {Array.isArray ( children ) ? children.slice ( elemIndex > 0 ? elemArr[ elemIndex - 1 ] : 0, elemArr[ elemIndex++ ] ) : children}
          </div>
        )}
      </div>
    )} </>
}