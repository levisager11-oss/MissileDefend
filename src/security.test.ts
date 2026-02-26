import { describe, it, expect } from 'bun:test';
import { generateSignature, verifySignature } from './utils/security';

describe('Security Utils', () => {
  it('should generate a signature for an object', () => {
    const data = { score: 100, level: 5 };
    const sig = generateSignature(data);
    expect(sig).toBeDefined();
    expect(typeof sig).toBe('string');
    expect(sig.length).toBeGreaterThan(0);
  });

  it('should return consistent signatures for identical data', () => {
    const data = { score: 100, level: 5 };
    const sig1 = generateSignature(data);
    const sig2 = generateSignature(data);
    expect(sig1).toBe(sig2);
  });

  it('should verify a valid signature', () => {
    const data = { score: 500, credits: 1000 };
    const sig = generateSignature(data);
    expect(verifySignature(data, sig)).toBe(true);
  });

  it('should reject an invalid signature', () => {
    const data = { score: 500, credits: 1000 };
    const sig = generateSignature(data);

    // Tamper with data
    const tamperedData = { ...data, score: 999999 };
    expect(verifySignature(tamperedData, sig)).toBe(false);
  });

  it('should reject a modified signature', () => {
    const data = { score: 500, credits: 1000 };
    const sig = generateSignature(data);
    const fakeSig = sig.split('').reverse().join('');
    expect(verifySignature(data, fakeSig)).toBe(false);
  });
});
