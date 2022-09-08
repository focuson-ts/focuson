import { commonParams, DisplayCompD } from "../../common/componentsD";

export const AuthoriseTableCD: DisplayCompD = {
  import: "@focuson/form_components",   //so that I can write the import statement for the react component
  name: "AuthoriseTable",                        //The name of the react component
  params: {                             //configuration parameter for the react component
    ...commonParams,
    order: { paramType: 'string[]', needed: 'yes' },
    scrollAfter: { paramType: 'string', needed: 'no' },
    copySelectedItemTo: { paramType: 'path', needed: 'no' },
    copySelectedIndexTo: { paramType: 'path', needed: 'no' },
    firstColumnName: { paramType: 'string', needed: 'yes' },
  }
}
export const SummaryDetailsCD: DisplayCompD = {
  import: "@focuson/form_components",   //so that I can write the import statement for the react component
  name: "AllSummaryDetails",                        //The name of the react component
  params: {                             //configuration parameter for the react component
    id: { paramType: 'string', needed: 'id' },
    state: { paramType: 'state', needed: 'defaultToPath' },
    selectedItem: { paramType: 'path', needed: 'yes' },
    accountId: { paramType: 'path', needed: 'yes' },
  }
}
