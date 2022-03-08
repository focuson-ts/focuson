export interface LabelProps<S, T, Context> {
    label?: string,
    htmlFor?: string
}
export function Label<S, Context> ( { label, htmlFor }: LabelProps<S, string, Context> ) {
    return <label htmlFor={htmlFor}>{label}</label>
}
