import { SimpleDisplayComp } from "./common/componentsD";

export interface AppConfig {
  fetch: string;
  combine: SimpleDisplayComp;
  debug: any;
  versionNumber: string;
  tsPort: number;
  javaPort: number
}