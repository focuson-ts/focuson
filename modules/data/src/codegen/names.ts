import { DataD } from "../common/dataD";
import { PageD } from "../common/pageD";

export function domainName ( d: DataD ): string {
  return d.name + "Domain"
}

export function componentName ( d: DataD ): string {
  return d.name
}
export function pageComponentName ( d: PageD ): string {
  return d.name + "Page"
}