import { test, expect, describe } from 'bun:test';
import { getZone, ZONES } from './zones';

describe('getZone logic', () => {
  test('should return Zone 1 for levels 1 to 5', () => {
    expect(getZone(1).id).toBe(1);
    expect(getZone(3).id).toBe(1);
    expect(getZone(5).id).toBe(1);
    expect(getZone(1).name).toBe('GREEN VALLEY');
  });

  test('should return Zone 2 for levels 6 to 10', () => {
    expect(getZone(6).id).toBe(2);
    expect(getZone(8).id).toBe(2);
    expect(getZone(10).id).toBe(2);
    expect(getZone(6).name).toBe('DESERT OUTPOST');
  });

  test('should return Zone 3 for levels 11 to 15', () => {
    expect(getZone(11).id).toBe(3);
    expect(getZone(13).id).toBe(3);
    expect(getZone(15).id).toBe(3);
    expect(getZone(11).name).toBe('ARCTIC BASE');
  });

  test('should return Zone 4 for levels 16 to 20', () => {
    expect(getZone(16).id).toBe(4);
    expect(getZone(18).id).toBe(4);
    expect(getZone(20).id).toBe(4);
    expect(getZone(16).name).toBe('VOLCANIC FORTRESS');
  });

  test('should return Zone 5 for levels 21 to 999', () => {
    expect(getZone(21).id).toBe(5);
    expect(getZone(100).id).toBe(5);
    expect(getZone(999).id).toBe(5);
    expect(getZone(21).name).toBe('SPACE STATION');
  });

  test('should fallback to Zone 5 for levels outside defined ranges', () => {
    // Current logic returns ZONES[ZONES.length - 1] if no match is found
    expect(getZone(1000).id).toBe(5);
    expect(getZone(0).id).toBe(5);
    expect(getZone(-1).id).toBe(5);
  });

  test('ZONES array should contain 5 zone definitions', () => {
    expect(ZONES.length).toBe(5);
  });
});
