export type Vec2 = {
  x: number;
  y: number;
};

export const l2Norm = (p1: Vec2, p2: Vec2) =>
  Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

export const isDiagAdj = (p1: Vec2, p2: Vec2) => l2Norm(p1, p2) <= Math.sqrt(2);

export const neighbors = (p1: Vec2, max: Vec2) => {
  const ns: Vec2[] = [];
  const { x, y } = p1;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const [newX, newY] = [dx + x, dy + y];
      if (
        !(dy === dx && dy === 0) &&
        newX >= 0 &&
        newX < max.x &&
        newY < max.y &&
        newY >= 0
      ) {
        ns.push({ x: newX, y: newY });
      }
    }
  }
  return ns;
};
