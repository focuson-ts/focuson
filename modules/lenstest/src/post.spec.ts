import { post, PostCommand, PostDebug, Posters, PostDetails } from "@focuson/poster";
import { Lenses, Optional } from "@focuson/lens";


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
const postCommandsL = identityL.focusQuery('postCommands')
function urlFn(expected: any): (args: any) => [RequestInfo, RequestInit | undefined] {
    return (args: any) => {
        expect(args).toEqual(expected)
        return ["/" + args, undefined]
    }

}

const onePostDetails: PostDetails<TestPostState, String, String> = { urlFn: urlFn("args1"), targetLn: identityL.focusQuery('one') }
const twoPostDetails: PostDetails<TestPostState, String, String> = { urlFn: urlFn("args2"), targetLn: identityL.focusQuery('two') }
const threePostDetails: PostDetails<TestPostState, String, String> = { urlFn: urlFn("args3"), targetLn: identityL.focusQuery('three') }
const fourPostDetails: PostDetails<TestPostState, String, String> = { urlFn: urlFn("args4"), targetLn: identityL.focusQuery('four') }

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

let stateIdentityL = Lenses.identity<TestPostState>('TestPostState');
const postDebugL: Optional<TestPostState, PostDebug> = stateIdentityL.focusQuery('debug')
const errorL: Optional<TestPostState, string[]> = stateIdentityL.focusQuery('errors')

const poster = post<TestPostState, Posters<TestPostState>>(testFetchFn, postDetails, postCommandsL, () => fail(), postDebugL)
const errorPoster = post<TestPostState, typeof postDetails>(testNon200FetchFn, postDetails, postCommandsL,
    (s: TestPostState, detail: string, args: any, status: number | undefined, resp: any) =>
        errorL.map(s, oldErrors => [...oldErrors, `${detail},${args} => ${status} + ${resp}`])
    , postDebugL)

const fourPostCommands: PostCommand<TestPostState, typeof postDetails, any>[] = [
    { poster: 'one', args: "args1" },
    { poster: 'two', args: "args2" },
    { poster: 'three', args: "args3" },
    { poster: 'four', args: "args4" }
]

const emptyState: TestPostState = { errors: [], debug: { postDebug: false } }
describe("post", () => {
    it("should return a promise of the input state if no post commands", async () => {
        expect(await poster(emptyState)).toEqual(emptyState)
    })
    it("should aggreagate successful posts, removing existing postcommands ", async () => {
        expect(await poster({ ...emptyState, postCommands: fourPostCommands })).toEqual(
            { ...emptyState, "postCommands": [], "one": "oneRes", "two": "twoRes", "three": "threeRes", "four": "fourRes" }
        )
    })

    it("should aggreagate successful posts and non200 results, removing existing postcommands", async () => {
        expect(await errorPoster({ ...emptyState, postCommands: fourPostCommands })).toEqual(
            { ...emptyState, errors: ["two,args2 => 400 + twoRes", "three,args3 => 500 + threeRes", "four,args4 => undefined + failed"], "postCommands": [], "one": "oneRes" }
        )
    })

})