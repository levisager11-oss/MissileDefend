import { test, expect, describe } from 'bun:test';
import { ACHIEVEMENT_DEFS } from './achievements';

describe('ACHIEVEMENT_DEFS', () => {
  test('should be an array', () => {
    expect(Array.isArray(ACHIEVEMENT_DEFS)).toBe(true);
  });

  test('should have at least one achievement', () => {
    expect(ACHIEVEMENT_DEFS.length).toBeGreaterThan(0);
  });

  test('each achievement should have required properties', () => {
    ACHIEVEMENT_DEFS.forEach(achievement => {
      expect(achievement).toHaveProperty('id');
      expect(achievement).toHaveProperty('name');
      expect(achievement).toHaveProperty('description');
      expect(achievement).toHaveProperty('icon');
      expect(typeof achievement.check).toBe('function');
    });
  });
});
