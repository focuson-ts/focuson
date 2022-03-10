import { DataD, IntegerDD, OneLineStringDD, RepeatingDataD } from "../../common/dataD";
import { AllGuards } from "../../buttons/guardButton";
import { TableCD } from "../../common/componentsD";


export const RepeatingLineDataD: DataD<AllGuards> = {
  name: "RepeatingLine",
  description: "A line of data",
  structure: {
    name: { dataDD: OneLineStringDD },
    age: { dataDD: IntegerDD }
  }
}
export const RepeatingWholeDataD: RepeatingDataD<AllGuards> = {
  name: "RepeatingWholeData",
  description: "A list of data",
  dataDD: RepeatingLineDataD,
  display: TableCD,
  paged: false,
  displayParams: { order: { value: [ 'name', 'age' ] } }
}