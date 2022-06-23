import { Children } from "react";

export interface LayoutProps {
  details: string;
  children: JSX.Element | JSX.Element[];
  title?: string;
  defaultProps?: string;
  displayAsCards?: boolean;
}

function getLayoutAsArray ( details: string ) {
  try {
    return JSON.parse ( details )
  } catch ( e: any ) {
    return undefined
  }
}
export function Layout<S, T, Context> ( { details, children, title, defaultProps, displayAsCards }: LayoutProps ) {
  let elemIndex = 0
  const parsedDetails = getLayoutAsArray ( details )
  if ( parsedDetails === undefined ) return <span><span className='validity-false'>Cannot parse layout {details}</span><br/><span>It should be an array of arrays.Most often like this [[1,1],[3],[5]] </span></span>
  const defaultPropsL = defaultProps && JSON.parse ( defaultProps )
  let numbersOnly = parsedDetails.map ( ( d: any, i: number ) => d.map ( ( item: any ) => typeof (item) === "object" ? item.count : item ) )
  let elemArr: number[] = numbersOnly.flat ().map ( ( val: any, i: any, arr: any ) => arr[ i ] += arr[ i - 1 ] ? arr[ i - 1 ] : 0 )
  const elementsRenderedCount = elemArr[ elemArr.length - 1 ]
  const totalElementsToRenderCount = Array.isArray ( children ) ? children.length : 0
  const hrBetweenRows = true

  return <>
    {parsedDetails.map ( ( row: any, rowIndex: number ) =>
      <div className="row" key={rowIndex}><>
        {row.map ( ( col: any, colIndex: number ) =>
          <div className="col" key={elemIndex}>
            <div className={displayAsCards ? "card" : ""}>
              <div className={displayAsCards ? "card-body" : ""}>
                {Children.map ( Array.isArray ( children ) ? children.slice ( (elemIndex > 0 ? elemArr[ elemIndex - 1 ] : 0), elemArr[ elemIndex++ ] ) : children, child => {
                  const labelWidthPct = (typeof (parsedDetails[ rowIndex ][ colIndex ]) === 'object' ? parsedDetails[ rowIndex ][ colIndex ].labelWidth : '')
                  const inputWidthPct = typeof (parsedDetails[ rowIndex ][ colIndex ]) === 'object' ? parsedDetails[ rowIndex ][ colIndex ].valueWidth : ''
                  const initialLabelWidthPct = 100
                  const initialInputWidthPct = row.length === 1 ? 49 : 100 // 49 and not 50 due to padding                  
                  return (labelWidthPct || inputWidthPct)
                    ? <div className={`${labelWidthPct ? `labelWidth${labelWidthPct}` : ''} ${inputWidthPct ? `inputWidth${inputWidthPct}` : ''}`}>{child}</div>
                    : defaultPropsL ? <div className={`${defaultPropsL.labelWidth ? `labelWidth${defaultPropsL.labelWidth}` : ''} ${defaultPropsL.valueWidth ? `inputWidth${defaultPropsL.valueWidth}` : ''}`}>{child}</div> : <div className={`labelWidth${initialLabelWidthPct} inputWidth${initialInputWidthPct}`}>{child}</div>
                } )}
              </div>
            </div>
          </div>
        )}</>
      </div>
    )}
    {(totalElementsToRenderCount - elementsRenderedCount) > 0 &&
    Array.isArray ( children ) && children.slice ( elementsRenderedCount, totalElementsToRenderCount ).map ( ( child, childIndex ) =>
      defaultPropsL ? <div key={childIndex} className={`${defaultPropsL.labelWidth ? `labelWidth${defaultPropsL.labelWidth}` : ''} ${defaultPropsL.valueWidth ? `inputWidth${defaultPropsL.valueWidth}` : ''}`}>{child}</div> : <div key={childIndex} className="labelWidth100 inputWidth49">{child}</div> )
    }
  </>
}