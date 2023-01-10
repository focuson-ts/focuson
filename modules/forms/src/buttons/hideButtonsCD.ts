import { DisplayCompD } from "../common/componentsD";

export const HideButtonsCD: DisplayCompD = {
  import: "@focuson-nw/form_components",
  name: "HideButtonsLayout",
  params: { buttons: { paramType: 'object', needed: "defaultToButtons" },
    hide: { paramType: 'string[]', needed: 'yes' } }
}

export const HideButtonsAndRestOnTopCD: DisplayCompD = {
  import: "@focuson-nw/form_components",
  name: "HideButtonsAndRestOnTopLayout",
  params: { buttons: { paramType: 'object', needed: "defaultToButtons" },
    hide: { paramType: 'string[]', needed: 'yes' } }
}