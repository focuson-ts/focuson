
export interface PrimitiveValidation<T>{}

export interface StringValidations extends PrimitiveValidation<string>{
    minlength?: number;
    maxlength?: number;
    pattern?: string;
    required?: boolean;
}

export interface NumberValidations extends PrimitiveValidation<number>{
    min?: number;
    max?: number;
    step?: number;
    required?: boolean;
}

export interface BooleanValidations extends PrimitiveValidation<boolean>{
    required?: boolean;
}

export type Validations = StringValidations | NumberValidations | BooleanValidations;

