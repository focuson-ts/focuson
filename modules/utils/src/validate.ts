

export interface StringValidations {
    minlength?: number;
    maxlength?: number;
    pattern?: string;
    required?: boolean;
}

export interface NumberValidations {
    min?: number;
    max?: number;
    step?: number;
    required?: boolean;
}

export interface BooleanValidations {
    required?: boolean;
}

export type Validations = StringValidations | NumberValidations | BooleanValidations;

