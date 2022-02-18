export interface JavaWiringParams {
  thePackage: string;
  applicationName: string,
  fetcherInterface: string;
  wiringClass: string;
  fetcherClass: string;
  sampleClass: string,
  schema: string;
}

export interface TSParams {
  pageDomainsFile: string;
  domainsFile: string;
  fetchersFile: string;
  pactsFile: string;
  samplesFile: string;
  renderFile: string;
  commonFile: string;
  urlparams: string;
}

export interface CombinedParams extends JavaWiringParams, TSParams {}

