import * as domains from '../PostCodeDemo/PostCodeDemo.domains'

export const emptyPostCodeData:domains.PostCodeDataDomain =
  [
    {
      "line1": "",
      "line2": "",
      "line3": "",
      "line4": ""
    }
  ]
export const emptyPostCodeDataLine:domains.PostCodeDataLineDomain =
  {
    "line1": "",
    "line2": "",
    "line3": "",
    "line4": ""
  }
export const emptyPostCodeNameAndAddress:domains.PostCodeNameAndAddressDomain =
  {
    "name": "",
    "line1": "",
    "line2": "",
    "line3": "",
    "line4": "",
    "postcode": ""
  }
export const emptyPostCodeSearch:domains.PostCodeSearchDomain =
  {
    "search": "",
    "searchResults": [
      {
        "line1": "",
        "line2": "",
        "line3": "",
        "line4": ""
      }
    ],
    "addressResults": {
      "line1": "",
      "line2": "",
      "line3": "",
      "line4": ""
    }
  }