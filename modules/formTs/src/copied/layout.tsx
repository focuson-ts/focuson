export interface LayoutProps {
  details: string;
  children: JSX.Element | JSX.Element[]
}

export function Layout ( { details, children }: LayoutProps ) {
  let elemIndex = 0
  let realDetails: any = JSON.parse ( details )
  if ( !Array.isArray ( realDetails ) ) throw new Error ( `Details needs to be a number [][]. Was ${details}` )

  let elemArr: number[] = realDetails.flat ().map ( ( val, i, arr ) => arr[ i ] += arr[ i - 1 ] ? arr[ i - 1 ] : 0 )

  return <>
    {realDetails.map ( ( row: any, rowIndex: number, arr: number[][] ) =>
      <div className="row border my-1" key={rowIndex}>
        {row.map ( ( col: any, colIndex: number ) =>
          <div className="col border" key={elemIndex}>
            {Array.isArray ( children ) ? children.slice ( elemIndex > 0 ? elemArr[ elemIndex - 1 ] : 0, elemArr[ elemIndex++ ] ) : children}
          </div>
        )}
      </div>
    )}
  </>
}