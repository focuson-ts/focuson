import {get, lens, lensFromPath, set} from "./optics";


interface TestData {
    a: {
        b: {
            c: number;
        };
    };
    list: number[];
}

describe('LensBuilder', () => {

    it('should get a nested value using focuson', () => {
        const data = {a: {b: {c: 42}}} as any as TestData;
        const lensBuilder = lens<TestData>().focuson('a').focuson('b').focuson('c');
        const result = get(data, lensBuilder.lens);
        expect(result).toBe(42);
    });

    it('should return undefined if parent does not exist', () => {
        const data: TestData = {} as any as TestData;
        const lensBuilder = lens<TestData>().focuson('a').focuson('b').focuson('c');
        const result = get(data, lensBuilder.lens);
        expect(result).toBeUndefined();
    });

    it('should set a nested value, creating missing structures', () => {
        const data: TestData = {} as any as TestData;
        const lensBuilder = lens<TestData>().focuson('a').focuson('b').focuson('c');
        const updatedData = set(data, 42, lensBuilder.lens);
        expect(updatedData).toEqual({a: {b: {c: 42}}});
    });

    it('should get a value from an array using focusonNth', () => {
        const data: TestData = {list: [10, 20, 30]} as any as TestData;
        const lensBuilder = lens<TestData>().focuson('list').focusonNth(1);
        const result = get(data, lensBuilder.lens);
        expect(result).toBe(20);
    });

    it('should return undefined if array index is out of bounds', () => {
        const data: TestData = {list: [10, 20, 30]} as any as TestData;
        const lensBuilder = lens<TestData>().focuson('list').focusonNth(5);
        const result = get(data, lensBuilder.lens);
        expect(result).toBeUndefined();
    });

    it('should set a value in an array, creating missing structures', () => {
        const data: TestData = {} as any as TestData;
        const lensBuilder = lens<TestData>().focuson('list').focusonNth(2);
        const updatedData = set(data, 42, lensBuilder.lens);
        expect(updatedData).toEqual({list: [undefined, undefined, 42]});
    });
});

describe('lensFromPath', () => {


    it('should get a nested value using a path', () => {
        const data: TestData = {a: {b: {c: 42}}} as any as TestData;
        const lensWithPath = lensFromPath<TestData>('a.b.c');
        const result = get(data, lensWithPath);
        expect(result).toBe(42);
    });

    it('should return undefined if a part of the path does not exist', () => {
        const data: TestData = {} as any as TestData;
        const lensWithPath = lensFromPath<TestData>('a.b.c');
        const result = get(data, lensWithPath);
        expect(result).toBeUndefined();
    });

    it('should set a nested value using a path, creating missing structures', () => {
        const data: TestData = {} as any as TestData;
        const lensWithPath = lensFromPath<TestData>('a.b.c');
        const updatedData = set(data, 42, lensWithPath);
        expect(updatedData).toEqual({a: {b: {c: 42}}});
    });

    it('should get a value from an array using a path', () => {
        const data: TestData = {list: [10, 20, 30]} as any as TestData;
        const lensWithPath = lensFromPath<TestData>('list[1]');
        const result = get(data, lensWithPath);
        expect(result).toBe(20);
    });

    it('should return undefined if array index in path is out of bounds', () => {
        const data: TestData = {list: [10, 20, 30]} as any as TestData;
        const lensWithPath = lensFromPath<TestData>('list[5]');
        const result = get(data, lensWithPath);
        expect(result).toBeUndefined();
    });

    it('should set a value in an array using a path, creating missing structures', () => {
        const data: TestData = {} as any as TestData;
        const lensWithPath = lensFromPath<TestData>('list[2]');
        const updatedData = set(data, 42, lensWithPath);
        expect(updatedData).toEqual({list: [undefined, undefined, 42]});
    });


});