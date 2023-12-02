import { JSONSet } from "@/utils";

type Point = {
  x: number;
  y: number;
};

const distance = (p1: Point, p2: Point) =>
  Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));

const isDiagAdj = (p1: Point, p2: Point) => distance(p1, p2) <= Math.sqrt(2);

export const main = async (lines: string[]): Promise<number | string> => {
  const knots: Point[] = Array(2)
    .fill(null)
    .map(() => ({ x: 0, y: 0 }));

  const visited: JSONSet<Point> = new JSONSet();
  visited.add(knots[0]);

  for (const step of lines) {
    const [dir, steps_s] = step.split(" ");
    const steps = parseInt(steps_s);

    for (let i = 0; i < steps; ++i) {
      if (dir === "U") knots[0].y += 1;
      if (dir === "L") knots[0].x -= 1;
      if (dir === "R") knots[0].x += 1;
      if (dir === "D") knots[0].y -= 1;

      for (let knotidx = 1; knotidx < knots.length; knotidx++) {
        const [head, tail] = [knots[knotidx - 1], knots[knotidx]];
        if (!isDiagAdj(head, tail)) {
          if (dir === "U") {
            tail.x = head.x;
            tail.y = head.y - 1;
          }
          if (dir === "L") {
            tail.x = head.x + 1;
            tail.y = head.y;
          }
          if (dir === "R") {
            tail.x = head.x - 1;
            tail.y = head.y;
          }
          if (dir === "D") {
            tail.x = head.x;
            tail.y = head.y + 1;
          }
          visited.add(tail);
        }
      }
    }
  }

  return visited.size;
};

//

const isrun = process.argv.length > 1 && process.argv[1] === import.meta.path;
if (isrun) {
  const file = Bun.file("./problem.txt");
  const text = await file.text();
  const lines = text.split("\n").filter((x) => x && x.length);

  console.log("=== COMPUTATION ===\n");

  const answer = await main(lines);

  console.log("\n=== /COMPUTATION ===\n");

  console.log("=== ANSWER TO P1 ===");
  console.log(answer);
}
