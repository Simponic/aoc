import { JSONSet, Vec2, l2Norm, isDiagAdj } from "@/utils";

export const main = async (lines: string[]): Promise<number | string> => {
  const knots: Vec2[] = Array(10)
    .fill(null)
    .map(() => ({ x: 0, y: 0 }));

  const visited: JSONSet<Vec2> = new JSONSet();
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
          if (head.y - tail.y === 0) {
            tail.x += Math.floor((head.x - tail.x) / 2);
          } else if (head.x - tail.x === 0) {
            tail.y += Math.floor((head.y - tail.y) / 2);
          } else {
            tail.x += head.x - tail.x > 0 ? 1 : -1;
            tail.y += head.y - tail.y > 0 ? 1 : -1;
          }
        }

        if (knotidx === knots.length - 1) {
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

  console.log("=== ANSWER TO P2 ===");
  console.log(answer);
}
