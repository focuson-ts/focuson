import { generatedPages } from "./focuson.config";
import { formatWindowNode, makeGraph } from "./reporting/graphStructure";
import { isMainPage } from "./common/pageD";


const graphs = generatedPages.filter ( isMainPage ).flatMap ( p => [ ...formatWindowNode ( makeGraph ( p ), new Set () ), '' ] )

graphs.forEach ( s => {
  process.stdout.write ( s );
  process.stdout.write ( "\n" )
} )




