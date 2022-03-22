import { DisplayCompD, SimpleDisplayComp } from "../common/componentsD";

export const HideButtonsCD: DisplayCompD = {
  import: "../formComponents/hideButtons",
  name: "HideButtonsLayout",
  params: { buttons: { paramType: 'object', needed: "defaultToButtons" },
    hide: { paramType: 'string[]', needed: 'yes' } }
}