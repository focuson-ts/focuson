import {Children} from "react";

export interface LayoutProps {
  details: string;
  children: JSX.Element | JSX.Element[];
  title?: string;
  defaultProps?: string;
}
// TODO LAYOUT TITLE ?
export function Layout<S, T, Context>({ details, children, title, defaultProps}: LayoutProps) {
  let elemIndex = 0
  const detailsAsMixedArr = JSON.parse(details)
  const defaultPropsL = defaultProps && JSON.parse(defaultProps)
  let numbersOnly = detailsAsMixedArr.map((d:any,i:number) => d.map((item:any) => typeof(item) === "object" ? item.count : item))
  let elemArr: number[] = numbersOnly.flat().map((val: any, i: any, arr: any) => arr[i] += arr[i - 1] ? arr[i - 1] : 0)
  const elementsRenderedCount = elemArr[elemArr.length - 1]
  const totalElementsToRenderCount = Array.isArray(children) ? children.length : 0

  return <>
    {detailsAsMixedArr.map((row: any, rowIndex: number) =>
      <div className="row my-1" key={rowIndex}>
        {row.map((col: any, colIndex: number) =>
              <div className="col" key={elemIndex}>
                {Children.map(Array.isArray(children) ? children.slice((elemIndex > 0 ? elemArr[elemIndex-1] : 0), elemArr[elemIndex++]) : children, child => {
                  const labelWidthPct = typeof (detailsAsMixedArr[rowIndex][colIndex]) === 'object' ? detailsAsMixedArr[rowIndex][colIndex].labelWidth : ''
                  const inputWidthPct = typeof (detailsAsMixedArr[rowIndex][colIndex]) === 'object' ? detailsAsMixedArr[rowIndex][colIndex].valueWidth : ''
                  return (labelWidthPct || inputWidthPct)
                      ? <div className={`${labelWidthPct ? `labelWidth${labelWidthPct}` : ''} ${inputWidthPct ? `inputWidth${inputWidthPct}`:''}`}>{child}</div>
                      : defaultPropsL ? <div className={`${defaultPropsL.labelWidth ? `labelWidth${defaultPropsL.labelWidth}` : ''} ${defaultPropsL.valueWidth ? `inputWidth${defaultPropsL.valueWidth}`:''}`}>{child}</div>: child
                })}
              </div>
        )}
      </div>
    )}
    {(totalElementsToRenderCount - elementsRenderedCount) > 0 &&
      Array.isArray(children) && children.slice(elementsRenderedCount, totalElementsToRenderCount).map((child, childIndex) =>
            defaultPropsL ? <div key={childIndex} className={`${defaultPropsL.labelWidth ? `labelWidth${defaultPropsL.labelWidth}` : ''} ${defaultPropsL.valueWidth ? `inputWidth${defaultPropsL.valueWidth}`:''}`}>{child}</div> : <div key={childIndex}>{child}</div>)
    }
  </>
}