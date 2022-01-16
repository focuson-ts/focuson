import { post, PostCommand, Posters } from "./index";
import { Lenses } from "@focus/lens";


interface TestPostState {
    one?: string,
    two?: string,
    three?: string,
    four?: string,
    errors: string[],
    postCommands?: PostCommand<TestPostState, typeof postDetails, any>[]
}
const identityL = Lenses.identity<TestPostState>("testPostState")
const postCommandsL = identityL.focusQuery('postCommands')
function urlFn(expected: any): (args: any) => [RequestInfo, RequestInit|undefined] {
    return (args: any) => {
        expect(args).toEqual(expected)
        return ["/" + args, undefined]
    }

}
const postDetails: Posters<TestPostState> = {
    one: { urlFn: urlFn("args1"), targetLn: identityL.focusQuery('one') },
    two: { urlFn: urlFn("args2"), targetLn: identityL.focusQuery('two') },
    three: { urlFn: urlFn("args3"), targetLn: identityL.focusQuery('three') },
    four: { urlFn: urlFn("args4"), targetLn: identityL.focusQuery('four') },
}

function testFetchFn(requestInfo: RequestInfo, requestInit: RequestInit): Promise<[number, any]> {
    expect(requestInit === requestInfo + "Init")
    if (requestInfo === "/one") return Promise.resolve([200, "oneRes"])
    if (requestInfo === "/two") return Promise.resolve([200, "twoRes"])
    if (requestInfo === "/three") return Promise.resolve([200, "threeRes"])
    if (requestInfo === "/four") return Promise.resolve([200, "fourRes"])
    throw 'failed'
}
function testErrorFetchFn(requestInfo: RequestInfo, requestInit: RequestInit): Promise<[number, any]> {
    expect(requestInit === requestInfo + "Init")
    if (requestInfo === "/one") return Promise.resolve([200, "oneRes"])
    if (requestInfo === "/two") return Promise.resolve([400, "twoRes"])
    if (requestInfo === "/three") return Promise.resolve([500, "threeRes"])
    if (requestInfo === "/four") return Promise.resolve([200, "fourRes"])
    throw 'failed'
}

const poster = post<TestPostState, typeof postDetails>(testFetchFn, postDetails, postCommandsL, () => fail())
const errorPoster = post<TestPostState, typeof postDetails>(testFetchFn, postDetails, postCommandsL, () => fail())

const fourPostCommands: PostCommand<TestPostState, typeof postDetails, any>[] = [
    { poster: 'one', args: "args1" },
    { poster: 'two', args: "args2" },
    { poster: 'three', args: "args3" },
    { poster: 'four', args: "args4" }
]
describe("post", () => {
    it("should return a promise of the input state if no post commands", async () => {
        expect(await poster({ errors: [] })).toEqual(1)
    })
    it("should aggreagate successful posts ", async () => {
        expect(await poster({ errors: [], postCommands: fourPostCommands })).toEqual(1)
    })

    it("should aggreagate successful posts and errors", async () => {
        expect(await errorPoster({ errors: [], postCommands: fourPostCommands })).toEqual(1)
    })

})