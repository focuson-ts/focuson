import { JavaWiringParams } from "./config";
import { MainPageD } from "../common/pageD";
import { RestD } from "../common/restD";
import { RestAction } from "@focuson/utils";


export function makeUseStoredProcedure<B, G> ( params: JavaWiringParams, pageD: MainPageD<B, G>, restD: RestD<G>, action: RestAction ): string[] {
  return []

}