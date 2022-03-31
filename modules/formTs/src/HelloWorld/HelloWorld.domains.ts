export interface HasHelloWorldPageDomain {   HelloWorld?: HelloWorldPageDomain}

export interface HelloWorldPageDomain{
  main?:HelloWorldDomain;
}

export interface HelloWorldDomain{
  hello: string;
}
