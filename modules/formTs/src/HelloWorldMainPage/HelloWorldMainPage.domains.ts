export interface HasHelloWorldMainPagePageDomain {   HelloWorldMainPage?: HelloWorldMainPagePageDomain}

export interface HelloWorldMainPagePageDomain{
  fromApi?:HelloWorldDomainDataDomain;
}

export interface HelloWorldDomainDataDomain{
  message: string;
}
