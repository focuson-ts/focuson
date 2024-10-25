import React from "react";
import {SetFn} from "@focuson/state";


export type EditFieldMaker = (path: string, formData: any, setValue: SetFn) => FieldComponents

export type FieldComponents = {
    FieldContainer: React.FC<FormFieldContainerProps>
    EditField: React.FC<FieldComponentsProp>
}

export interface FormFieldContainerProps {
    children: React.ReactNode;
}

export type FieldComponentsProp = {
    path: string
    id: string,
    renderer?: RenderFieldDefn
};

export type RenderFieldDefn = "text" | { type: "dropdown"; options: string[] }
