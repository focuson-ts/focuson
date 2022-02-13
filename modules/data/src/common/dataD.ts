//Common Data Definitions


import { DisplayCompD, LabelAndInputCD } from "./componentsD";
import { ComponentDisplayParams } from "./makeComponents";

export interface OneDataDD {
  dataDD: AllDataDD;
  displayParams?: ComponentDisplayParams,
  graphQl?: string, // might be possible to default this which would be cool
}
export interface ManyDataDD {
  [ name: string ]: OneDataDD
}
export interface OneDisplayParamDD {
  value: string | string[]
}
export interface DisplayParamDD{
  [name: string]:  OneDisplayParamDD
}

export interface CommonDataDD {
  name: string;
  display?: DisplayCompD;
  displayParams?: DisplayParamDD
  description: string;
  comments?: string;
  meta?: any;
  graphQl?: string;

}
export interface DataD extends CommonDataDD {
  structure: ManyDataDD;
}
export interface PrimitiveDD extends CommonDataDD {
  label?: string;
  validation: SingleFieldValidationDD;
  samples?: string[];
  enum?: EnumDD;
}
export interface RepeatingDataD extends CommonDataDD {
  paged: boolean;
  display: DisplayCompD; // mandatory for a repeating
  dataDD: DataD;
}
export function isRepeatingDd ( d: any ): d is RepeatingDataD {
  return d.paged !== undefined
}

export type AllDataDD = PrimitiveDD | DataD | RepeatingDataD

export function isDataDd ( d: any ): d is DataD {
  return !!d.structure
}

export interface SingleFieldValidationDD {
  regex?: string,
  minLength?: number;
  maxLength?: number;
  enum?: boolean,
}
export interface EnumDD {
  [ name: string ]: string
}

export const AccountIdDD: PrimitiveDD = {
  name: 'AccountIdDD',
  description: "An account id",
  display: LabelAndInputCD,
  validation: { regex: "\d+", maxLength: 7 },
  samples: [ "1233450", "3233450", "4333450" ]
}
export const StringDD: PrimitiveDD = {
  name: 'StringDD',
  description: "The primitive 'string'. A reasonably short list of characters",
  display: LabelAndInputCD,
  validation: { maxLength: 255 }, //Note no regex
  samples: [ "someString", "anotherString" ]
}
export const OneLineStringDD: PrimitiveDD = {
  name: 'OneLineStringDD',
  description: "A string that fits on a line of text. Probably reasonably long",
  display: LabelAndInputCD,
  validation: { maxLength: 255 }, //Note no regex
  samples: [ "This is a one line string", "another one line string" ]
}
export const IntegerDD: PrimitiveDD = {
  name: 'IntegerDD',
  description: "The primitive 'Integer'",
  display: LabelAndInputCD,
  validation: { regex: "\d+", maxLength: 255 },
  samples: [ "This is a one line string", "another one line string" ]
}
export const MoneyDD: any = {
  ...IntegerDD,
  description: "The primitive representing an amount of the local currency",
  name: 'IntegerDD'
}

export const DateDD: PrimitiveDD = {
  name: 'DateDD',
  description: "The primitive representing a date (w/o time)",
  display: LabelAndInputCD, //or maybe a date picker
  validation: { regex: "\d+", maxLength: 8 },
  samples: [ "2020-10-01", '2022-14-01' ]
}

