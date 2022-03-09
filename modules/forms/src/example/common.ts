import { MainPageD, ModalPageD } from "../common/pageD";
import { AllButtonsInPage } from "../buttons/allButtons";
import { AllGuards } from "../buttons/guardButton";

export type ExampleButtons = AllButtonsInPage< AllGuards>

export type ExampleMainPage = MainPageD<ExampleButtons,AllGuards>
export type ExampleModalPage = ModalPageD<ExampleButtons,AllGuards>