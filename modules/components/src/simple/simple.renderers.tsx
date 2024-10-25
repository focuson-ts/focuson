import React from "react";
import {useStateOps} from "@focuson/state";
import {lensFromPath} from "@focuson/lens";
import {appendPath} from "@focuson/utils";
import {RenderFieldDefn} from "../interfaces/field.components";


export type FieldRendererProps<T> = {
    path: string
    id: string
}

export type FieldRenderer = <T, >(fieldInputs: FieldRendererProps<T>) => JSX.Element


export const RenderStringInput: FieldRenderer = <T, >
(
    fieldInputs: FieldRendererProps<T>
) => {
    const {path, id} = fieldInputs
    const [state, setValue] = useStateOps<T>()
    const lens = lensFromPath<T>(appendPath(path,id))
    let initialState = lens.get(state);
    const [text, setText] = React.useState(initialState);

    return (
        <input
            type="text"
            id={id as string}
            name={id as string}
            value={text}
            onChange={e => setText(e.target.value)}
            onBlur={() => setValue(path, id, text)}
            onKeyDown={e => {
                if (e.key === 'Enter') setValue(path, id, text)
            }}
        />
    );
};

export const renderDropDown = (options: string[]): FieldRenderer => <T, >(
    fieldInputs: FieldRendererProps<T>
) => {
    const [state, setValue] = useStateOps<T>()
    const {path, id} = fieldInputs
    const lens = lensFromPath<T>(appendPath(path,id));
    return (
        <select
            id={id as string}
            name={id as string}
            value={lens.get(state)}
            onChange={e => setValue(path, id, e.target.value)}
        >
            <option value="">Select {id as string}</option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}





