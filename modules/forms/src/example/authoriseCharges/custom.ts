import { commonParams, DisplayCompD } from "../../common/componentsD";

export const AuthoriseTableCD: DisplayCompD = {
  import: "@focuson/form_components",   //so that I can write the import statement for the react component
  name: "AuthoriseTable",                        //The name of the react component
  params: {                             //configuration parameter for the react component
    ...commonParams,
    order: { paramType: 'string[]', needed: 'yes' },
    copySelectedItemTo: { paramType: 'path', needed: 'no' },
    // copySelectedIndexTo: { paramType: 'pageState', needed: 'no' },
  }
}
