import { ExampleRefD, ExampleRestD } from "../common";
import { holidayDataD } from "../initiial/initial.dateD";

export const dateinfoRestD: ExampleRestD = {
  actions: [ 'get' ],
  dataDD: holidayDataD,
  params: {},
  url: "/api/dateInfo"
}
export const dateInfoRefD: ExampleRefD = {
  name: "DateInfo",
  domain: {
    holidayData: { dataDD: holidayDataD }
  },
  rest: {
    holidayInfo: { rest: dateinfoRestD, targetFromPath: '~/holidayData', fetcher: true }
  },
}

