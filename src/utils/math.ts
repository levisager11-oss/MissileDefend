export function solveInterceptTime(
  originX: number,
  originY: number,
  targetX: number,
  targetY: number,
  velX: number,
  velY: number,
  projectileSpeed: number
): number | null {
  const relX = targetX - originX;
  const relY = targetY - originY;
  const a = velX * velX + velY * velY - projectileSpeed * projectileSpeed;
  const b = 2 * (relX * velX + relY * velY);
  const c = relX * relX + relY * relY;

  if (Math.abs(a) < 1e-6) {
    if (Math.abs(b) < 1e-6) return null;
    const t = -c / b;
    return t > 0 ? t : null;
  }

  const disc = b * b - 4 * a * c;
  if (disc < 0) return null;
  const sqrtDisc = Math.sqrt(disc);
  const t1 = (-b - sqrtDisc) / (2 * a);
  const t2 = (-b + sqrtDisc) / (2 * a);
  const t = Math.min(t1 > 0 ? t1 : Infinity, t2 > 0 ? t2 : Infinity);
  if (!isFinite(t)) return null;
  if (t > 300) return null;
  return t;
}
