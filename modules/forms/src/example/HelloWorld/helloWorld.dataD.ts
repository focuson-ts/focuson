import { ExampleDataD } from "../common";

import { helloWorldSample } from "./helloWorld.sample";
import { StringDD } from "../../common/dataD";

export const helloWorldDD: ExampleDataD = {
    name: 'HelloWorldDomainData',
    description: 'This is a summary about hello world domain data',
    structure: {
        message1: { dataDD: StringDD, sample: ['Greetings  !'] },
        message2: { dataDD: StringDD, sample: [' message !'] },

    }
}