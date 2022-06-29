import { ExampleDataD, ExampleRepeatingD } from "../common";
import { StringDD } from "../../common/dataD";
import { TableCD } from "../../common/componentsD";
import { fourOhFourTable } from "../database/tableNames";


export const FourOhFourDataD: ExampleDataD = {
  name: 'FourOhFour',
  description: '',
  table: fourOhFourTable,
  structure: {
    some: { dataDD: StringDD, db: 'somex' },
    data: { dataDD: StringDD, db: 'datax' },
  }
}
export const FourOhFourDataTableD: ExampleRepeatingD = {
  name: 'FourOhFourTable',
  description: '',
  dataDD: FourOhFourDataD,
  display: TableCD,
  displayParams: { order: [ 'some', 'data' ] },
  paged: false
}

export const FourOhFourSearchDD: ExampleDataD = {
  name: 'FourOhFourSearch',
  description: '',
  structure: {
    id: { dataDD: StringDD },
    singleResult: { dataDD: FourOhFourDataD },
    multipleResult: { dataDD: FourOhFourDataTableD },
  }
}
