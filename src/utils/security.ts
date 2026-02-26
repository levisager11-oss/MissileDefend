// Simple synchronous hash function for integrity checks
// Not cryptographically secure, but sufficient for client-side game state protection

const SECRET_KEY = 'missile-command-secure-v1-salt-8x92m';

export function generateSignature(data: any): string {
  const str = JSON.stringify(data) + SECRET_KEY;
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16);
}

export function verifySignature(data: any, signature: string): boolean {
  return generateSignature(data) === signature;
}
