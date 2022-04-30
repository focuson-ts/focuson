import { makeUseStoredProcedure } from "../codegen/makeUseStoredProcedure";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { ChequeCreditbooksPD } from "../example/chequeCreditBooks/chequeCreditBooks.pageD";
import { chequeCreditBooksRestD } from "../example/chequeCreditBooks/chequeCreditBooks.restD";

describe ( "makeUseStoredProcedure", () => {
  it ( "should generate the java that will call a stored procedure with the given values, with parameters in the order given", () => {
    expect ( makeUseStoredProcedure ( paramsForTest, ChequeCreditbooksPD, chequeCreditBooksRestD, 'create' ) ).toEqual ( [] )

  } )

} )