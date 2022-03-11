export interface HasPostCodeDemoPageDomain {   PostCodeDemo?: PostCodeDemoPageDomain}

export interface PostCodeDemoPageDomain{
  main?:PostCodeMainPageDomain;
  postcode?:PostCodeSearchDomain;
}

export type PostCodeDataDomain = postCodeDataLineDomain[]

export interface postCodeDataLineDomain{
  line1: string;
  line2: string;
  line3: string;
  line4: string;
}

export interface PostCodeMainPageDomain{
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  name: string;
  postcode: string;
}

export interface PostCodeSearchDomain{
  search: string;
  searchResults: postCodeDataLineDomain[];
}
