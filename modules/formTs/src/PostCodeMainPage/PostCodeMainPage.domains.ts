export interface HasPostCodeMainPagePageDomain {   PostCodeMainPage?: PostCodeMainPagePageDomain}

export interface PostCodeMainPagePageDomain{
  main?:PostCodeNameAndAddressDomain;
  postcode?:PostCodeSearchDomain;
  selectedPostcodeIndex?:number;
}

export interface PostCodeDataLineDomain{
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  postcode: string;
}

export interface PostCodeNameAndAddressDomain{
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  name: string;
  postcode: string;
}

export interface PostCodeSearchDomain{
  addressResults: PostCodeDataLineDomain;
  search: string;
  searchResults: PostCodeDataLineDomain[];
}

export type PostCodeSearchResponseDomain = PostCodeDataLineDomain[]
