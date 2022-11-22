import { ExampleMainPage } from "../common";
import { TableDisplayDD } from "./table.dataD";
import { tableRestD } from "./table.restD";

export const tablePageD: ExampleMainPage = {
  domain: { display: { dataDD: TableDisplayDD } },
  display: { target: '~/display', dataDD: TableDisplayDD },
  modals: [],
  modes: [ 'edit' ],
  initialValue: 'empty',
  name: "TablePage",
  pageType: 'MainPage',
  rest: {
    default: { rest: tableRestD, targetFromPath: '~/display', fetcher: true }
  },
  buttons: {}

}