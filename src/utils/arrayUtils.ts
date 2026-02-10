/**
 * Filters an array in-place, removing elements that do not satisfy the predicate.
 * This function modifies the original array and returns it.
 * It is faster than Array.prototype.filter because it avoids creating a new array.
 *
 * @param array The array to filter
 * @param predicate A function that accepts an element and returns true to keep it, false to remove it.
 * @returns The filtered array (same instance)
 */
export function inplaceFilter<T>(array: T[], predicate: (item: T, index: number) => boolean): T[] {
  let writeIdx = 0;
  for (let readIdx = 0; readIdx < array.length; readIdx++) {
    const item = array[readIdx];
    if (predicate(item, readIdx)) {
      if (writeIdx !== readIdx) {
        array[writeIdx] = item;
      }
      writeIdx++;
    }
  }
  array.length = writeIdx;
  return array;
}
