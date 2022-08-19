import { ExampleRefD, ExampleRestD } from "../common";
import { holidayDataD, holidayListD } from "../initiial/initial.dateD";

export const dateinfoRestD: ExampleRestD = {
  actions: [ 'get' ],
  dataDD: holidayListD,
  params: {},
  url: "/api/ref/dateInfo"
}
export const dateInfoRefD: ExampleRefD = {
  name: "DateInfo",
  refGroups: 'once',
  domain: {
    holidayData: { dataDD: holidayListD }
  },
  rest: {
    holidayInfo: { rest: dateinfoRestD, targetFromPath: '~/holidayData', fetcher: true }
  },
}

