export type Vec2 = {
  x: number;
  y: number;
};

export const l2Norm = (p1: Vec2, p2: Vec2) =>
  Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

export const isDiagAdj = (p1: Vec2, p2: Vec2) => l2Norm(p1, p2) <= Math.sqrt(2);
