import { allRestAndActions } from "./common/pageD";
import { generatedPages } from "./focuson.config";
import { AllDataFlatMap, AllDataFolder, DataD, emptyDataFlatMap, findAllDataDs, flatMapDD, foldDataDD, OneDataDD, PrimitiveDD, RepeatingDataD } from "./common/dataD";
import { enabledByDataD } from "./example/enabledBy/enabledBy.dataD";
import { PaymentsLaunchDD } from "./example/payments/payments.dataD";


// allRestAndActions(generatedPages).forEach(([ref, restname, props, restAction]) =>
//   console.log(ref.name, restname, restAction.name))

interface AccForCounts {
  data: number
  rep: number,
  prim: number
}
const zeroCounts: AccForCounts = { data: 0, rep: 0, prim: 0 }

const countOfDataDsFolder: AllDataFolder<AccForCounts, any> = {
  foldData: ( acc, path, parents, oneDataDD, data, start ) =>
    start ? ({ ...acc, data: acc.data + 1 }) : acc,
  foldRep: ( acc, path, parents, oneDataDD, data, start ) =>
    start ? ({ ...acc, prim: acc.rep + 1 }) : acc,
  foldPrim: acc => ({ ...acc, prim: acc.prim + 1 }),
}

console.log ( foldDataDD ( enabledByDataD, [], [], zeroCounts, countOfDataDsFolder ) )


const prettyPrintFlapMapper: AllDataFlatMap<string, any> = {
  ...emptyDataFlatMap (),
  walkDataStart: ( path ) => [ ''.padStart ( path.length * 2 ) +  path.join ( "." ) + "{" ],
  walkDataEnd: ( path ) => [  ''.padStart ( path.length * 2 ) + '}' ],
  walkPrim: ( path, parents, oneDataDD, dataDD ) =>
    [ ''.padStart ( path.length * 2 ) + path.join ( "." ) + ':' + dataDD.reactType ],
}

flatMapDD ( PaymentsLaunchDD, prettyPrintFlapMapper ).forEach ( console.log )