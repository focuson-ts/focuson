/* ---------------- ADDITIONAL INFORMATION START ---------------- */

import { ExampleDataD } from "../../common";
import {additionalInformationSample} from "./additionalInformation.sample";
import { StringDD } from "../../../common/dataD";

export const additionalInformationDD: ExampleDataD = {
    name: 'AdditionalInformation',
    description: 'This is a summary about employed additional information data',
    structure: {
        applicantName: { dataDD: StringDD, sample: [ additionalInformationSample.applicantName ] },
        employerName: { dataDD: StringDD, sample: [ additionalInformationSample.employerName ] },
        addressLine1: { dataDD: StringDD, sample: [ additionalInformationSample.addressLine1 ] },
        addressLine2: { dataDD: StringDD, sample: [ additionalInformationSample.addressLine2 ] },
        addressLine3: { dataDD: StringDD, sample: [ additionalInformationSample.addressLine3 ] },
        addressLine4: { dataDD: StringDD, sample: [ additionalInformationSample.addressLine4 ] },
        postcode: { dataDD: StringDD, sample: [ additionalInformationSample.postcode ] },
    }
}
/* ---------------- ADDITIONAL INFORMATION END ---------------- */
