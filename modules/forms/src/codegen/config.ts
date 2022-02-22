export interface JavaWiringParams {
  thePackage: string;
  applicationName: string,
  fetcherInterface: string;
  wiringClass: string;
  fetcherClass: string;
  sampleClass: string,
  queriesClass: string,
  schema: string;
}

export interface TSParams {
  focusOnVersion: string,
  stateName: string;
  commonParams: string;
  pageDomainsFile: string;
  domainsFile: string;
  fetchersFile: string;
  pactsFile: string;
  samplesFile: string;
  renderFile: string;
  commonFile: string;
  urlparams: string;
  pagesFile: string;
  modalsFile: string;
}

export interface CombinedParams extends JavaWiringParams, TSParams {}

