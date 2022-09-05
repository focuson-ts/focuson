import { ButtonCreator, MakeButton, makeIdForButton } from "../codegen/makeButtons";
import { opt, optT } from "../codegen/codegen";
import { decamelize, toArray } from "@focuson/utils";
import { EnabledBy, enabledByString } from "./enabledBy";
import { CommandButtonChangeCommands } from "@focuson/rest";

function makeCommandButton<G> (): ButtonCreator<CommandButtonInPage, G> {
  return {
    import: "@focuson/form_components",
    makeButton:
      ( createButton ) => {
        const { params, parent, name, button } = createButton
        return [ `<CommandButton  id=${makeIdForButton ( name )}${enabledByString ( button )} state={state} commands={${JSON.stringify ( toArray ( button.command ) )}} ${opt ( 'label', button.label ? button.label : decamelize ( name, ' ' ) )}` + [
          opt ( 'buttonType', button.buttonType ? button.buttonType : 'primary' ),
          optT ( 'validate', button.validate ),
          `/>` ].join ( " " )
        ]
      }
  }
}

export function makeCommandButtons<G> (): MakeButton<G> {
  return { CommandButton: makeCommandButton () }
}

export interface CommandButtonInPage extends EnabledBy {
  control: 'CommandButton';
  label?: string;
  validate?: boolean;
  command: CommandButtonChangeCommands | CommandButtonChangeCommands[];
}

