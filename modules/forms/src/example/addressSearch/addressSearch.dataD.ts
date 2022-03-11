import { DataD, OneLineStringDD, RepeatingDataD } from "../../common/dataD";
import { AllGuards } from "../../buttons/guardButton";
import { TableCD } from "../../common/componentsD";

export const postCodeDataLineD: DataD<AllGuards> = {
  name: "postCodeDataLine",
  description: "",
  structure: {
    line1: { dataDD: OneLineStringDD },
    line2: { dataDD: OneLineStringDD },
    line3: { dataDD: OneLineStringDD },
    line4: { dataDD: OneLineStringDD }
  }
}


export const postCodeSearchResponse: RepeatingDataD<AllGuards> = {
  name: "PostCodeData",
  description: "The array of all the data",
  dataDD: postCodeDataLineD,
  paged: false,
  display: TableCD,
  displayParams: { order: { value: [ 'line1', 'line2', 'line3', 'line4' ] } }
}

export const postCodeSearchDataD: DataD<AllGuards> = {
  name: "PostCodeSearch",
  description: "The post code search example: type postcode get results",
  structure: {
    search: { dataDD: OneLineStringDD, sample: [ 'LS21 3EY' ] },
    searchResults: { dataDD: postCodeSearchResponse }
  }
}

export const nameAndAddressDataD: DataD<AllGuards> = {
  name: "PostCodeMainPage",
  description: "An address that the Postcode data needs to be copied to",
  structure: {
    name: { dataDD: OneLineStringDD },
    ...postCodeDataLineD.structure,
    postcode: { dataDD: OneLineStringDD }
  }
}