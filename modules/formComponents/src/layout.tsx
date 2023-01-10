import { Children, CSSProperties, MutableRefObject } from "react";
import { FocusOnContext, makeModalProcessorsConfig } from "@focuson-nw/focuson";
import { LensProps } from "@focuson-nw/state";
import { inputCommandProcessors, processChangeCommandProcessor } from "@focuson-nw/rest";
import { replaceTextUsingPath } from "@focuson-nw/pages";
import { NameAnd, safeArray, safeObject, safeString } from "@focuson-nw/utils";

export type LayoutButtons = NameAnd<string[]>


export interface LayoutProps<S, C> extends LensProps<S, any, C> {
  details: string;
  divRef?: MutableRefObject<HTMLDivElement>,
  children: JSX.Element | JSX.Element[];
  title?: string;
  titleClassName?: string;
  rightHandTitle?: string
  rightHandClassName?: string
  defaultProps?: string;
  displayAsCards?: boolean;
  scrollAfter?: string;
  buttons?: LayoutButtons;
  allButtons?: NameAnd<JSX.Element>
}

function getLayoutAsArray ( details: string ) {
  try {
    return JSON.parse ( details )
  } catch ( e: any ) {
    return undefined
  }
}
export function Layout<S, C extends FocusOnContext<S>> ( { state, details, children, title, titleClassName, rightHandTitle, rightHandClassName, defaultProps, displayAsCards, scrollAfter, divRef, buttons, allButtons }: LayoutProps<S, C> ) {
  let elemIndex = 0
  const maxHeightString: CSSProperties | undefined = scrollAfter ? { maxHeight: scrollAfter, overflowY: 'scroll', scrollbarWidth: 'thin', overflowX: 'hidden' } : undefined
  const parsedDetails = getLayoutAsArray ( details )
  if ( parsedDetails === undefined ) return <span><span className='validity-false'>Cannot parse layout {details}</span><br/><span>It should be an array of arrays.Most often like this [[1,1],[3],[5]] </span></span>
  const defaultPropsL = defaultProps && JSON.parse ( defaultProps )
  let numbersOnly = parsedDetails.map ( ( d: any, i: number ) => d.map ( ( item: any ) => typeof (item) === "object" ? item.count : item ) )
  let elemArr: number[] = numbersOnly.flat ().map ( ( val: any, i: any, arr: any ) => arr[ i ] += arr[ i - 1 ] ? arr[ i - 1 ] : 0 )
  const elementsRenderedCount = elemArr[ elemArr.length - 1 ]
  const totalElementsToRenderCount = Array.isArray ( children ) ? children.length : 0
  const hrBetweenRows = true

  const buttonFor = ( allButtons: NameAnd<JSX.Element> ) => ( name: string ) => {
    const button = allButtons [ name ];
    return <span className='button-span' key={name}>{button ? button : `Button ${name} not in ${Object.keys ( allButtons )}`}</span>
  };
  const buttonsForTheCard = ( initialValue: number ) => {
    var colIndex = initialValue
    return (): JSX.Element => {
      if ( buttons === undefined || allButtons === undefined ) return <></>
      const names = safeArray<string> ( buttons [ colIndex++ ] )
      const displayButtons = names.map ( buttonFor ( allButtons ) );
      if ( displayButtons.length === 0 ) return <></>
      return <div className='buttons-in-card'>{displayButtons}</div>
    };
  }
  const realButtonsForCard = buttonsForTheCard ( 0 )
  return <div ref={divRef} style={maxHeightString}>
    {(title || rightHandTitle) && <div className="layout-title-holder">{title && <div className={titleClassName ? titleClassName : 'layout-title'} dangerouslySetInnerHTML={{ __html: replaceTextUsingPath ( state, safeString ( title ) ) }}/>}
      {rightHandTitle && <div className={rightHandClassName ? rightHandClassName : 'layout-right-title'}>{replaceTextUsingPath ( state, safeString ( rightHandTitle ) )}</div>}</div>}
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
              {realButtonsForCard ()}
            </div>
          </div>
        )}</>
      </div>
    )}
    {(totalElementsToRenderCount - elementsRenderedCount) > 0 &&
    Array.isArray ( children ) && children.slice ( elementsRenderedCount, totalElementsToRenderCount ).map ( ( child, childIndex ) =>
      defaultPropsL ? <div key={childIndex} className={`${defaultPropsL.labelWidth ? `labelWidth${defaultPropsL.labelWidth}` : ''} ${defaultPropsL.valueWidth ? `inputWidth${defaultPropsL.valueWidth}` : ''}`}>{child}</div> : <div key={childIndex} className="labelWidth100 inputWidth49">{child}</div> )
    }
  </div>
}
