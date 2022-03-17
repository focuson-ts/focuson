import { RestD } from "../../common/restD";
import { AllGuards } from "../../buttons/guardButton";
import { ETransferDataD } from "../eTransfers/eTransfers.dataD";
import { commonParams } from "../eTransfers/eTransfers.restD";




export const jointAccountRestD: RestD<AllGuards> = {
  params: { ...commonParams },
  dataDD: ETransferDataD,
  url: '/api/jointAccount?{query}',
  actions: [ 'get' ]
}


