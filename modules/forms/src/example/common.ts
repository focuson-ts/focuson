import { MainPageD, ModalPageD } from "../common/pageD";
import { AllButtonsInPage } from "../buttons/allButtons";
import { AllGuards } from "../buttons/guardButton";
import { RestD } from "../common/restD";
import { DataD, RepeatingDataD } from "../common/dataD";

export type ExampleButtons = AllButtonsInPage<AllGuards>

export type ExampleMainPage = MainPageD<ExampleButtons, AllGuards>
export type ExampleModalPage = ModalPageD<ExampleButtons, AllGuards>
export type ExampleRestD = RestD<AllGuards>
export type ExampleDataD = DataD<AllGuards>
export type ExampleRepeatingD = RepeatingDataD<AllGuards>
