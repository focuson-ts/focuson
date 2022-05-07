import * as domains from '../PostCodeMainPage/PostCodeMainPage.domains'

export const emptyPostCodeDataLine:domains.PostCodeDataLineDomain =
  {
    "line1": "",
    "line2": "",
    "line3": "",
    "line4": "",
    "postcode": ""
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
        "line4": "",
        "postcode": ""
      }
    ],
    "addressResults": {
      "line1": "",
      "line2": "",
      "line3": "",
      "line4": "",
      "postcode": ""
    }
  }
export const emptyPostCodeSearchResponse:domains.PostCodeSearchResponseDomain =
  [
    {
      "line1": "",
      "line2": "",
      "line3": "",
      "line4": "",
      "postcode": ""
    }
  ]