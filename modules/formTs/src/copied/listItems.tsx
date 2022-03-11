import {CommonStateProps} from "./common";

export interface ListItemsCDProps<S, T, Context> extends CommonStateProps<S, T[], Context> {

}

export function ListItemsCD<S, T, Context> ( { state }: ListItemsCDProps<S, T, Context> ) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '5px', border: '2px solid black' }}>
            {
                state.optJson()?.map((item, key) => {
                    return <div>
                        {item}
                    </div>
                })
            }
        </div>
    )

}