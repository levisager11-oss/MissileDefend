import { describe, it, expect } from 'bun:test';
import { UPGRADE_DEFS, getUpgradeCost } from './upgrades';

describe('Upgrade Definitions', () => {
  it('should have 13 upgrades', () => {
    expect(UPGRADE_DEFS.length).toBe(13);
  });

  it('should calculate cost correctly', () => {
    const blastRadius = UPGRADE_DEFS.find(u => u.key === 'blastRadius');
    if (!blastRadius) throw new Error('blastRadius not found');

    // Level 0 cost
    expect(getUpgradeCost(blastRadius, 0)).toBe(120);

    // Level 1 cost: 120 * 1.5^1 = 180
    expect(getUpgradeCost(blastRadius, 1)).toBe(180);
  });
});
