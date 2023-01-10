import { LensProps, reasonFor } from '@focuson-nw/state';
import { PageSelectionContext } from "@focuson-nw/pages";

export interface AccordionProps<S, T, Context> extends LensProps<S, string[], Context> {
    id: string;
    buttonText: string;
    list: string[];
    count?: number;
}

export function Accordion<S, T, Context extends PageSelectionContext<S>> ( props: AccordionProps<S, string[], Context> ) {
    const { buttonText, ...restProps } = props
    const { id, state } = restProps
    const buttonTextL = buttonText.split('|')
    const accordionsOpen: string[] = state.optJsonOr([])
    const text = accordionsOpen.includes(id) ? buttonTextL[0] : buttonTextL[1]
    return (<button {...restProps} onClick={() => state.setJson ( accordionsOpen.includes(id) ? accordionsOpen.filter(item => item != id) : [...accordionsOpen, id], reasonFor ( 'Accordion', 'onClick', id ) )}>{text}</button>)
}

export interface AccordionWithInfoProps<S, T, Context> extends AccordionProps<S, string[], Context> {
    count: number;
}

export function AccordionWithInfo<S, T, Context extends PageSelectionContext<S>> ( { id, state, buttonText, list, count }: AccordionWithInfoProps<S, string[], Context> ) {
    return (<>
        <Accordion id={id} buttonText={buttonText} state={state} list={list}/>
        <span className="json-key">
            <span>{'"'}{id}{'":'}</span>
            <span className="extra-info">{count} items</span>
        </span>
    </>)
}

export function AccordionExpandAll<S, T, Context extends PageSelectionContext<S>> ( props: AccordionProps<S, string[], Context> ) {
    const { buttonText, ...restProps} = props
    const { id, state, list } = restProps
    const accordionsOpen: string[] = state.optJsonOr([])
    return (<button {...restProps} onClick={() => (accordionsOpen.length !== list.length) ? state.setJson (list, reasonFor ( 'Accordion', 'onClick', id )  ): undefined}>{buttonText}</button>)
}

export function AccordionCollapseAll<S, T, Context extends PageSelectionContext<S>> ( props: AccordionProps<S, string[], Context> ) {
    const { buttonText, ...restProps} = props
    const { id, state, list } = restProps
    const accordionsOpen: string[] = state.optJsonOr([])
    return (<button {...restProps} onClick={() => (accordionsOpen.length > 0 && accordionsOpen.length <= list.length) ? state.setJson ([], reasonFor ( 'Accordion', 'onClick', id )  ): undefined}>{buttonText}</button>)
}
