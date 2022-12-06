import { Fn, FnWithError } from "./functions";

export type Validate<T, Errors> = Fn<T, Errors[]>
export type StringValidate<T> = Validate<T, string>

export const validateCompose = <T, Error> ( ...vs: Validate<T, Error>[] ): Validate<T, Error> => t => vs.flatMap ( v => v ( t ) );

export const validateAnd = <From, To, Error> ( v: Validate<From, Error> ) => ( fn: Fn<From, To> ): FnWithError<From, To, Error> => {
  return from => {
    const errors = v ( from )
    return errors.length === 0 ? fn ( from ) : errors
  }
};
export const validateAndFnOrError = <From, To, Error> ( v: Validate<From, Error> ) => ( fn: Fn<From, To> ): FnWithError<From, To, Error> => {
  return from => {
    const errors = v ( from )
    if ( errors.length === 0 ) return fn ( from )
    throw Error ( errors.join ( "," ) )
  }
};

