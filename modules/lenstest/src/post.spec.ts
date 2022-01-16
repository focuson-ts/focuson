import { Lenses, Optional } from "@focuson/lens";
import { addDebugErrorMessage, post, PostCommand, PostDebug, PostDetails, Posters } from "@focuson/poster";


interface TestPostState {
    debug?: PostDebug,
    one?: string,
    two?: string,
    three?: string,
    four?: string,
    errors: string[],
    postCommands?: PostCommand<TestPostState, typeof postDetails, any>[]
}
const identityL = Lenses.identity<TestPostState>("testPostState")
const postDebugL: Optional<TestPostState, PostDebug> = identityL.focusQuery('debug')
const errorL: Optional<TestPostState, string[]> = identityL.focusQuery('errors')

const postCommandsL = identityL.focusQuery('postCommands')
function urlFn(expected: any): (args: any) => [RequestInfo, RequestInit | undefined] {
    return (args: any) => {
        expect(args).toEqual(expected)
        return ["/" + args, undefined]
    }

}

const onePostDetails: PostDetails<TestPostState, string, string, string> = { urlFn: urlFn("args1"), targetLn: identityL.focusQuery('one'), shape: s => s + "_1", errorFn: addDebugErrorMessage(errorL) }
const twoPostDetails: PostDetails<TestPostState, string, string, string> = { urlFn: urlFn("args2"), targetLn: identityL.focusQuery('two'), shape: s => s + "_2", errorFn: addDebugErrorMessage(errorL) }
const threePostDetails: PostDetails<TestPostState, string, string, string> = { urlFn: urlFn("args3"), targetLn: identityL.focusQuery('three'), shape: s => s + "_3", errorFn: addDebugErrorMessage(errorL) }
const fourPostDetails: PostDetails<TestPostState, string, string, string> = { urlFn: urlFn("args4"), targetLn: identityL.focusQuery('four'), shape: s => s + "_4", errorFn: addDebugErrorMessage(errorL) }

const postDetails: Posters<TestPostState> = {
    one: onePostDetails,
    two: twoPostDetails,
    three: threePostDetails,
    four: fourPostDetails
}

function testFetchFn(requestInfo: RequestInfo, requestInit: RequestInit | undefined): Promise<[number, any]> {
    expect(requestInit === requestInfo + "Init")
    if (requestInfo === "/args1") return Promise.resolve([200, "oneRes"])
    if (requestInfo === "/args2") return Promise.resolve([200, "twoRes"])
    if (requestInfo === "/args3") return Promise.resolve([200, "threeRes"])
    if (requestInfo === "/args4") return Promise.resolve([200, "fourRes"])
    throw 'failed'
}
function testNon200FetchFn(requestInfo: RequestInfo, requestInit: RequestInit | undefined): Promise<[number, any]> {
    expect(requestInit === requestInfo + "Init")
    if (requestInfo === "/args1") return Promise.resolve([200, "oneRes"])
    if (requestInfo === "/args2") return Promise.resolve([400, "twoRes"])
    if (requestInfo === "/args3") return Promise.resolve([500, "threeRes"])
    if (requestInfo === "/args4") return Promise.reject("failed")
    throw 'failed'
}


const poster = post<TestPostState, Posters<TestPostState>>(testFetchFn, postDetails, postCommandsL, postDebugL)
const errorPoster = post<TestPostState, typeof postDetails>(testNon200FetchFn, postDetails, postCommandsL, postDebugL)

const fourPostCommands: PostCommand<TestPostState, typeof postDetails, any>[] = [
    { poster: 'one', args: "args1" },
    { poster: 'two', args: "args2" },
    { poster: 'three', args: "args3" },
    { poster: 'four', args: "args4" }
]

const emptyState: TestPostState = { errors: [], debug: { postDebug: true } }


describe('addDebugErrorMessage', () => {
    it("should add an error message to the state", () => {
        expect(addDebugErrorMessage(errorL)(emptyState, "someDetail", "someArgs", 200, "someresp")).toEqual(
            { "debug": { "postDebug": true }, "errors": ["someDetail \"someArgs\" Status(200) Resp: someresp)"] }
        )

    })

});
describe("post", () => {
    // it("should return a promise of the input state if no post commands", async () => {
    //     expect(await poster(emptyState)).toEqual(emptyState)
    // })
    // it("should aggreagate successful posts, removing existing postcommands ", async () => {
    //     expect(await poster({ ...emptyState, postCommands: fourPostCommands })).toEqual(
    //         { ...emptyState, "postCommands": [], "one": "oneRes_1", "two": "twoRes_2", "three": "threeRes_3", "four": "fourRes_4" }
    //     )
    // })

    it("should aggreagate successful posts and non200 results, removing existing postcommands", async () => {
        expect(await errorPoster({ ...emptyState, postCommands: fourPostCommands })).toEqual(
            {
                ...emptyState, errors: [
                    "two \"args2\" Status(400) Resp: twoRes)",
                    "three \"args3\" Status(500) Resp: threeRes)",
                    "four \"args4\" Status(undefined) Resp: failed)"], "postCommands": [], "one": "oneRes_1"
            }
        )
    })

})