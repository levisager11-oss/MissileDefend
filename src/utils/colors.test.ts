import { test, expect, describe } from 'bun:test';
import { hexToRgb } from './colors';

describe('hexToRgb', () => {
  test('converts lowercase hex', () => {
    expect(hexToRgb('#ffffff')).toBe('255, 255, 255');
    expect(hexToRgb('#000000')).toBe('0, 0, 0');
    expect(hexToRgb('#ff0000')).toBe('255, 0, 0');
    expect(hexToRgb('#00ff00')).toBe('0, 255, 0');
    expect(hexToRgb('#0000ff')).toBe('0, 0, 255');
  });

  test('converts uppercase hex', () => {
    expect(hexToRgb('#FFFFFF')).toBe('255, 255, 255');
    expect(hexToRgb('#000000')).toBe('0, 0, 0');
  });

  test('converts mixed case hex', () => {
    expect(hexToRgb('#AbCdEf')).toBe('171, 205, 239');
  });

  test('handles edge cases (current implementation behavior)', () => {
    // Short hex codes are not supported correctly by current implementation
    expect(hexToRgb('#fff')).toBe('255, 15, NaN');

    // Missing hash results in shifted parsing
    expect(hexToRgb('ffffff')).toBe('255, 255, 15');

    // Invalid characters result in NaN
    expect(hexToRgb('#zzzzzz')).toBe('NaN, NaN, NaN');
  });
});
