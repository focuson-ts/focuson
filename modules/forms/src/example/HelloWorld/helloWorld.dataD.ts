import { ExampleDataD } from "../common";

import { helloWorldSample } from "./helloWorld.sample";
import { StringDD } from "../../common/dataD";

export const helloWorldDD: ExampleDataD = {
    name: 'HelloWorldDomainData',
    description: 'This is a summary about hello world domain data',
    structure: { message: { dataDD: StringDD, displayParams: { label: 'Hello world example'}, sample: [helloWorldSample.message] } }
}