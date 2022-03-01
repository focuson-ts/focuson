import { DirectorySpec, loadFile } from "../index";

const spec: DirectorySpec = { main: "templates", backup: "templates/backupTemplates" }
describe ( "loadFile", () => {
  it ( "should return a string representing the file", () => {
    expect ( loadFile ( "templates/t.text" ) ).toEqual ( "Main" )
  } )
  it ( "should use the DirectorySpec if it exists, prefering the main", () => {
    expect ( loadFile ( "t.text", spec ) ).toEqual ( "Main" )

  } )
  it ( "should use the DirectorySpec if it exists, using backup if main not found", () => {
    expect ( loadFile ( "w.text", spec ) ).toEqual ( "Backup" )
  } )

} )
