export interface HasRepeatingPageDomain {   Repeating?: RepeatingPageDomain}

export interface RepeatingPageDomain{
  fromApi?:RepeatingLineDomain[];
  selectedItem?:number;
  temp?:RepeatingLineDomain;
}

export interface RepeatingLineDomain{
  age: number;
  name: string;
}

export type RepeatingWholeDataDomain = RepeatingLineDomain[]
