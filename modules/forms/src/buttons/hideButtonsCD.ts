import { DisplayCompD } from "../common/componentsD";

export const HideButtonsCD: DisplayCompD = {
  import: "@focuson/form_components",
  name: "HideButtonsLayout",
  params: { buttons: { paramType: 'object', needed: "defaultToButtons" },
    hide: { paramType: 'string[]', needed: 'yes' } }
}