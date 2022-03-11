import {CommonStateProps} from "./common";

export interface SearchListProps<S, T, Context> extends CommonStateProps<S, T, Context> {

}

export function SearchList<S, T, Context> ( { state }: SearchListProps<S, T, Context> ) {
    console.log(state.optJson())
    return (
        <>
            This gets rendered ... I will need in the state the list of occupations also .. or not ?
        </>
    )
}