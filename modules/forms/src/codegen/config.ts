export interface JavaWiringParams {
  wiringPackage: string;
  thePackage: string;
  applicationName: string,
  fetcherPackage: string;
  controllerPackage: string;
  mockFetcherPackage: string;
  dbFetcherPackage: string;
  fetcherInterface: string;
  wiringClass: string;
  fetcherClass: string;
  sampleClass: string,
  queriesPackage: string,
  dbPackage: string,
  schema: string;
  mutatorPackage: string;
  resolversPackage: string;
  utilsPackage: string;
  defaultDbName: string;
  maxTuples: number;
  controllerAnnotations: string[],
  endpointAnnotations: string[],
  endpointImports?: string[],
  debugLevel: 'info' | 'debug' | 'none'
}

export interface TSParams {
  applicationName: string,
  focusOnVersion: string,
  stateName: string;
  commonParams: string;
  pageDomainsFile: string;
  domainsFile: string;
  fetchersFile: string;
  restsFile: string;
  pactsFile: string;
  samplesFile: string;
  emptyFile: string;
  renderFile: string;
  guardReportFile: string;
  guardFnsFile?: string;
  commonFile: string;
  urlparams: string;
  pagesFile: string;
  optionalsFile: string;
  loadRefsFile: string;
  theme: string;
  extractData: string;
  teamName: string;
  cssDirectory: string|undefined;
  mockUpJwtToken: boolean
}

export interface CombinedParams extends JavaWiringParams, TSParams {}

