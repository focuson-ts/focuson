import { ExampleMainPage, ExampleRestD } from "../common";
import { TableDisplayDD } from "./table.dataD";

export const tableRestD: ExampleRestD = {
  actions: [ 'get' ],
  dataDD: TableDisplayDD, params: {},
  url: "/api/tables"

}