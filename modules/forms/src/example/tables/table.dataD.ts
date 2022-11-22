import { ExampleDataD, ExampleRepeatingD } from "../common";
import { IntegerDD, MoneyStringDD, StringDD } from "../../common/dataD";
import { TableCD, TableWithHighLightIfOverCD, TableWithHighLightIfOverDataDependantCD } from "../../common/componentsD";

export const TableRowDD: ExampleDataD = {
  name: 'TableRow',
  description: 'A table of data to show how they can be displayed',
  structure: {
    name: { dataDD: StringDD },
    balance: { dataDD: MoneyStringDD },
    someNumber: { dataDD: IntegerDD }
  }
}

export const TableRepDD: ExampleRepeatingD = {
  name: "TableData",
  dataDD: TableRowDD,
  description: "The Table itself",
  display: TableCD,
  sampleCount: 4,
  paged: false
}

export const TableDisplayDD: ExampleDataD = {
  name: 'TableDisplay',
  description: "A few table variants",
  structure: {
    simpleTable: {
      dataDD: { ...TableRepDD, name: "Table1", displayParams: { order: [ 'name', 'balance', 'someNumber' ] } },
    },
    tableWithMinBalance: {
      dataDD: {
        ...TableRepDD,
        name: 'Table2',
        display: TableWithHighLightIfOverCD,
        displayParams: {
          order: [ 'name', 'balance', 'someNumber' ],
          nameOfCellForMinimum: 'balance',
          minimumValue: 200,
          classNameOfHighlight: 'highlight'
        }
      }
    },
    tableWithMinSomeNumber: {
      dataDD: {
        ...TableRepDD,
        name: 'Table3',
        display: TableWithHighLightIfOverCD,
        displayParams: {
          order: [ 'name', 'balance', 'someNumber' ],
          nameOfCellForMinimum: 'someNumber',
          minimumValue: 200,
          classNameOfHighlight: 'highlight'
        }
      }
    },
    minValue: { dataDD: IntegerDD },
    tableWithVaryingMinValueOnBalance: {
      dataDD: {
        ...TableRepDD,
        name: 'Table4',
        display: TableWithHighLightIfOverDataDependantCD,
        displayParams: {
          order: [ 'name', 'balance', 'someNumber' ],
          nameOfCellForMinimum: 'balance',
          minimumPath: 'minValue',
          classNameOfHighlight: 'highlight'
        }
      }
    },

  }
}
