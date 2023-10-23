import { maxTuplesFor } from "../makeFiles/generate";
import { AccountOverviewMainPage } from "../example/accountOverview/accountOverview.pageD";


describe ( 'maxTuples', () => {
  it ( 'should be auto derived from the code', () => {
    expect ( maxTuplesFor ( [ AccountOverviewMainPage ] ) ).toEqual ( 5 )
  } )
  // it ( 'should handle nested structures', () => {
  //   expect ( maxTuplesFor ( [ resolversRefD ] ) ).toEqual ( 10 )
  // } )

} )