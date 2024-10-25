import {renderDropDown, RenderStringInput} from "./simple.renderers";
import React from "react";
import {EditFieldMaker, FieldComponentsProp, FormFieldContainerProps, RenderFieldDefn} from "../interfaces/field.components";

export const getRender = (renderDef: RenderFieldDefn) => {
    if (renderDef === "text") return RenderStringInput;
    if (typeof renderDef === "object" && renderDef.type === "dropdown") return renderDropDown(renderDef.options);
    throw new Error("Unsupported RenderDef type");
}

export const SimpleEditField = () =>
    (props: FieldComponentsProp) => {
        const {id, path, renderer = 'text'} = props;
        return <div><label htmlFor={id}>{id}</label>{getRender(renderer)({path, id})}</div>
    };
export const SimpleEditFieldFormContainer = ({children}: FormFieldContainerProps) => {
    return <form>{children}</form>
}

export const SimpleEditFieldComponents: EditFieldMaker = <T, >() => {
    return {
        FieldContainer: SimpleEditFieldFormContainer,
        EditField: SimpleEditField(),
    }
}