import { inplaceFilter } from "./arrayUtils";

describe("inplaceFilter", () => {
    test("removes elements based on predicate", () => {
        const arr = [1, 2, 3, 4, 5];
        // Keep evens
        const result = inplaceFilter(arr, (n) => n % 2 === 0);
        expect(result).toBe(arr); // Should return same array instance
        expect(result).toEqual([2, 4]);
    });

    test("keeps all elements if predicate is always true", () => {
        const arr = [1, 2, 3];
        const result = inplaceFilter(arr, () => true);
        expect(result).toBe(arr);
        expect(result).toEqual([1, 2, 3]);
    });

    test("removes all elements if predicate is always false", () => {
        const arr = [1, 2, 3];
        const result = inplaceFilter(arr, () => false);
        expect(result).toBe(arr);
        expect(result).toEqual([]);
    });

    test("handles empty array", () => {
        const arr: number[] = [];
        const result = inplaceFilter(arr, () => true);
        expect(result).toBe(arr);
        expect(result).toEqual([]);
    });

    test("passes index to predicate", () => {
        const arr = ['a', 'b', 'c', 'd'];
        // Keep elements at even indices
        const result = inplaceFilter(arr, (_, index) => index % 2 === 0);
        expect(result).toBe(arr);
        expect(result).toEqual(['a', 'c']);
    });
});
