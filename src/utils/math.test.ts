import { describe, it, expect } from 'bun:test';
import { solveInterceptTime } from './math';

describe('solveInterceptTime', () => {
  it('should return null if target is unreachable', () => {
    // Target moves faster than projectile away from origin
    const time = solveInterceptTime(0, 0, 10, 0, 20, 0, 10);
    expect(time).toBeNull();
  });

  it('should return time for stationary target', () => {
    // Target at (10, 0), projectile speed 2. Time should be 5.
    const time = solveInterceptTime(0, 0, 10, 0, 0, 0, 2);
    expect(time).toBeCloseTo(5);
  });

  it('should return correct time for moving target', () => {
    // Target at (10, 0) moving (0, 10). Projectile speed 20.
    // Distance over time: sqrt(10^2 + (10t)^2) = 20t
    // 100 + 100t^2 = 400t^2 => 300t^2 = 100 => t^2 = 1/3 => t = 1/sqrt(3) ~= 0.577
    const time = solveInterceptTime(0, 0, 10, 0, 0, 10, 20);
    expect(time).toBeCloseTo(1 / Math.sqrt(3));
  });

  it('should return null if t > 300 (implementation detail)', () => {
    // Very far target or slow projectile
    const time = solveInterceptTime(0, 0, 10000, 0, 0, 0, 1);
    expect(time).toBeNull();
  });
});
