import { DataD, OneLineStringDD, RepeatingDataD } from "../../common/dataD";
import { AllGuards } from "../../buttons/guardButton";
import { StringInputCD, TableCD } from "../../common/componentsD";
import { addT, postCodeSearchTable } from "../database/tableNames";


export const postCodeDataLineD: DataD<AllGuards> = {
  name: "PostCodeDataLine",
  description: "",
  table: postCodeSearchTable,
  structure: {
  ...({
    line1: { dataDD: OneLineStringDD, db: 'zzline1', sample: [ '4 Privet drive', '27 Throughput Lane' ] },
    line2: { dataDD: OneLineStringDD, db: 'zzline2', sample: [ 'Little Whinging', 'Woodfield' ] },
    line3: { dataDD: OneLineStringDD, db: 'zzline3', sample: [ 'Surrey', '' ], displayParams: { required: false } },
    line4: { dataDD: OneLineStringDD, db: 'zzline4', sample: [ 'England', 'Ireland' ] },
    postcode: { dataDD: OneLineStringDD, db: 'PC_POSTCODE', sample: [ 'LW12 5f', 'IR45 3GT' ] }
  })
  }
}

export const postCodeSearchResponseDD: RepeatingDataD<AllGuards> = {
  name: "PostCodeSearchResponse",
  description: "The array of all the data",
  dataDD: postCodeDataLineD,
  paged: false,
  display: TableCD,
  displayParams: {
    order: [ 'postcode', 'line1', 'line2', 'line3', 'line4' ],
    copySelectedItemTo: [ 'postcode', 'addressResults' ]
  }
}

export const postCodeSearchDataD: DataD<AllGuards> = {
  name: "PostCodeSearch",
  description: "The post code search example: type postcode get results",
  structure: {
    search: { dataDD: {...OneLineStringDD, display: StringInputCD}, sample: [ 'LS21 3EY' ], displayParams: {required: false} },
    searchResults: { dataDD: postCodeSearchResponseDD },
    addressResults: { dataDD: postCodeDataLineD }
  }
}

export const nameAndAddressDataD: DataD<AllGuards> = {
  name: "PostCodeNameAndAddress",
  description: "An address that the Postcode data needs to be copied to",
  table: addT,
  structure: {
    name: { dataDD: OneLineStringDD },
    ...postCodeDataLineD.structure,
    postcode: { dataDD: OneLineStringDD, displayParams: { buttons: [ 'search' ] } }
  }
}