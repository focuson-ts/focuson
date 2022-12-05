import { endPointName, isCommonLens, makeParamsForJava, RefD } from "@focuson/forms";
import { composeMappers, FileAndStrings, firstCall, indent, Indenter, iterateOver, iterateOverChangingAcc, MakeFullAcc, pageAndRestDetailsToRestDetailsArray, RefAndRestDetails, refDToPageAndRestDetailsArray, refDToPageRestDetailAndParamArray, RefRestActionAndMutation0, RefRestActionAndParam, refRestActionToMutationLevel0, RefRestAndAction, stringsMonoid, TaglessMapGenerator } from "./generators";

export interface SpringBootSingleEndpointInterpreter<Acc> {
  annotations: TaglessMapGenerator<Acc, RefRestAndAction>
  params: TaglessMapGenerator<Acc, RefRestAndAction>
  methodStart: ( params: Acc ) => TaglessMapGenerator<Acc, RefRestAndAction>
  makeJsonString: TaglessMapGenerator<Acc, RefRestAndAction>
  openConnection: TaglessMapGenerator<Acc, RefRestAndAction>
  callMutations: TaglessMapGenerator<Acc, RefRestActionAndMutation0>
  closeConnection: TaglessMapGenerator<Acc, RefRestAndAction>
  resultStatement: TaglessMapGenerator<Acc, RefRestAndAction>
  methodEnd: TaglessMapGenerator<Acc, RefRestAndAction>
}

export const springBootSingleEndpointInterpreter = <Acc> ( s: SpringBootSingleEndpointInterpreter<Acc>, indenter: Indenter<Acc> ): TaglessMapGenerator<Acc, RefAndRestDetails> =>
  composeMappers ( indenter ) (
    s.annotations,
    firstCall ( s.params ).thenCall ( s.methodStart ),
    indent ( indenter, 1 ) (
      s.makeJsonString,
      s.openConnection,
      iterateOver<Acc, RefRestAndAction, RefRestActionAndMutation0> ( refRestActionToMutationLevel0, indenter ) ( s.callMutations ),
      s.closeConnection,
      s.resultStatement ),
    s.methodEnd,
  )

export interface SpringBootEndpointCodeIntepreter<FullAcc, Acc> {
  fileStart: TaglessMapGenerator<Acc, RefAndRestDetails>
  imports: TaglessMapGenerator<Acc, RefAndRestDetails>
  classStart: TaglessMapGenerator<Acc, RefAndRestDetails>
  mutationVariables: TaglessMapGenerator<Acc, RefRestActionAndMutation0>
  realEndpoints: SpringBootSingleEndpointInterpreter<Acc>
  sampleEndpoints: TaglessMapGenerator<Acc, RefRestAndAction>
  sqlEndpoints: TaglessMapGenerator<Acc, RefRestAndAction>
  classEnd: TaglessMapGenerator<Acc, RefAndRestDetails>
  fileEnd: TaglessMapGenerator<Acc, RefAndRestDetails>
}


/** FullAcc when used for real is 'FilenameAndString' and Acc is string[] */
export const springBootEndpointGenerator = <FullAcc, Acc> (
  s: SpringBootEndpointCodeIntepreter<FullAcc, Acc>, indenter: Indenter<Acc>, makeFullAcc: MakeFullAcc<RefAndRestDetails, FullAcc, Acc> ): TaglessMapGenerator<FullAcc[], RefD<any>> =>
  iterateOverChangingAcc<FullAcc, Acc, RefD<any>, RefAndRestDetails> ( refDToPageAndRestDetailsArray, indenter, makeFullAcc )
  ( s.fileStart, indent ( indenter, 1 ) (
      s.imports,
      s.classStart,
      iterateOver<Acc, RefAndRestDetails, RefRestAndAction> ( pageAndRestDetailsToRestDetailsArray, indenter ) (
        iterateOver<Acc, RefRestAndAction, RefRestActionAndMutation0> ( refRestActionToMutationLevel0, indenter ) ( s.mutationVariables ),
        springBootSingleEndpointInterpreter ( s.realEndpoints, indenter ),
        s.sqlEndpoints,
        s.sampleEndpoints ) ),
    s.classEnd,
    s.fileEnd )


//export function makeParamsForJava<G> ( errorPrefix: string, r: RestD<G>, restAction: RestAction, forRealEndpoint: boolean ): string {
//   const params = paramsForRestAction ( errorPrefix, r, restAction );
//   const comma = makeCommaIfHaveParams ( errorPrefix, r, restAction );
//   const requestParam = getRestTypeDetails ( restAction ).params.needsObj ? `${comma}@RequestBody String body` : ""
//   return params.map ( (( [ name, param ] ) => {
//     const defaultAnnotation = isCommonLens ( param ) && param.inJwtToken && forRealEndpoint ? '@RequestHeader' : '@RequestParam'
//     const required = param.allowUndefined ? `(required=false)` : ''
//     return `${param.annotation ? param.annotation : defaultAnnotation}${required} ${param.javaType} ${name}`;
//   }) ).join ( ", " ) + requestParam
// }

const params = ( forRealEndpoint: boolean ): TaglessMapGenerator<string[], RefRestActionAndParam> =>
  ( { param, paramName }, template ) => {
    const defaultAnnotation = isCommonLens ( param ) && param.inJwtToken && forRealEndpoint ? '@RequestHeader' : '@RequestParam'
    const required = param.allowUndefined ? `(required=false)` : ''
    return [ `${param.annotation ? param.annotation : defaultAnnotation}${required} ${param.javaType} ${paramName}` ]
  }
const springBootSingleEndpointStringsInterpreter: SpringBootSingleEndpointInterpreter<string[]> = {
  params: params(true),
  annotations: ( source, template ) => [],
  methodStart: ( params: string[] ) => ( source, template ) => [
    `public ResponseEntity ${endPointName ( source.rdpp.rest, source.action )}(${params.join ( "," )}) throws Exception{`,
  ],
  makeJsonString: ( source, template ) => [],
  openConnection: ( source, template ) => [],
  callMutations: ( source, template ) => [],
  closeConnection: ( source, template ) => [],
  resultStatement: ( source, template ) => [],
  methodEnd: ( source, template ) => []
}


const springBootEndpointCodeInterpreter: SpringBootEndpointCodeIntepreter<FileAndStrings, string[]> = {
  realEndpoints: springBootSingleEndpointStringsInterpreter,
  fileStart: ( source, template ) => [],
  imports: ( source, template ) => [],
  classStart: ( source, template ) => [],
  mutationVariables: ( source, template ) => [],
  sampleEndpoints: ( source, template ) => [],
  sqlEndpoints: ( source, template ) => [],
  classEnd: ( source, template ) => [],
  fileEnd: ( source, template ) => []
}

