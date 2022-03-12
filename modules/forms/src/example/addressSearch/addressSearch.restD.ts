import { DataD, OneLineStringDD, RepeatingDataD } from "../../common/dataD";
import { AllGuards } from "../../buttons/guardButton";
import { TableCD } from "../../common/componentsD";
import { ExampleMainPage } from "../common";
import { postCodeSearchResponse, postCodeSearchDataD } from "./addressSearch.dataD";
import { Layout } from "@focuson/form_components";
import { RestD, RestParams } from "../../common/restD";
import { RepeatingWholeDataD } from "../repeating/repeating.dataD";
import { commonParams } from "../repeating/repeating.restD";
import { PostCodeMainPage } from "./addressSearch.pageD";

export const postcodeParams: RestParams = {
  postcode: { lens: [ 'postcode', 'search' ], testValue: 'LW12 4RG' }
}

/** This should fully define the api*/
export const postcodeRestD: RestD<AllGuards> = {
  params: postcodeParams,
  dataDD: postCodeSearchResponse,
  url: '/api/postCode?{query}',
  actions: [ 'get' ]
}
