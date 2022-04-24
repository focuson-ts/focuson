export interface JavaWiringParams {
  thePackage: string;
  applicationName: string,
  fetcherPackage: string;
  controllerPackage: string;
  mockFetcherPackage: string;
  h2FetcherPackage: string;
  fetcherInterface: string;
  wiringClass: string;
  fetcherClass: string;
  sampleClass: string,
  queriesPackage: string,
  dbPackage: string,
  schema: string;
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
  commonFile: string;
  urlparams: string;
  pagesFile: string;
  optionalsFile: string;
  }

export interface CombinedParams extends JavaWiringParams, TSParams {}

