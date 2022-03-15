import { focusPageClassName, PageDetailsForCombine } from "@focuson/pages";
import { PageType } from "@focuson/forms";

interface FocusedPageData{
    type: PageType;
    page: JSX.Element;
    mouseCorrds?: [number,number]
}

export function MyCombined (pages: PageDetailsForCombine[] ): JSX.Element {
    return <div id='container' className='combine'>
        {pages.map((p, i)=>
            <div id='pageContainer' className={ focusPageClassName} style={{ zIndex: i, position: "absolute", width: '1024px' }} key={i}>
                <div id='contentWrapper'>{p.element}</div>
            </div>
        )  }
    </div>
}