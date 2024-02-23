export type Schema = {
  spec: {type: string}
  kind: string
  junk: string
}

export function categorise(s: Schema): "library" | "service" | "api" | undefined {
  if (s.spec.type === "library") return "library"
  if (s.kind === "Service") return "service"
  if (s.kind === "API") return "api"
  return undefined
}

const blank: Schema = {spec: {type: ''}, kind: '', junk: ''}

describe("categorise", () => {
  it("should categorise libraries", () => {
    expect(categorise({...blank, spec: {type: "library"}})).toEqual("library")
  })
  it("should categorise services", () => {
    expect(categorise({...blank, kind: "Service"})).toEqual("service")
  })
  it("should categorise apis", () => {
    expect(categorise({...blank, kind: "API"})).toEqual("api")
  })
  it("should categorise nothing else", () => {
    expect(categorise(blank)).toEqual(undefined)
  })
})
