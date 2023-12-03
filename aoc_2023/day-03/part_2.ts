import { JSONSet, Vec2 } from "@/utils";

const isNumeric = (symbol: string) => symbol <= "9" && symbol >= "0";

export const main = async (lines: string[]): Promise<number | string> => {
  const adjacentPoints: (Vec2 & { ratio: number })[] = [];

  let ratioId = 0;

  const dimy = lines.length;
  for (let y = 0; y < lines.length; y++) {
    const dimx = lines[y].length;
    for (let x = 0; x < dimx; x++) {
      const symbol = lines[y][x];
      if (symbol === "*") {
        ratioId++;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const newX = dx + x;
            const newY = dy + y;
            if (
              !(dy === dx && dy === 0) &&
              newX >= 0 &&
              newX < dimx &&
              newY < dimy &&
              newY >= 0
            ) {
              adjacentPoints.push({
                x: x + dx,
                y: y + dy,
                ratio: ratioId,
              });
            }
          }
        }
      }
    }
  }

  const visitedPoints: JSONSet<Vec2> = new JSONSet();
  const ratioNums: Map<number, number[]> = new Map();
  for (const { x, y, ratio } of adjacentPoints) {
    const symbol = lines[y][x];
    if (!isNumeric(symbol)) continue;

    let num = "";
    if (!visitedPoints.has({ x, y })) {
      let x_i = x;
      while (x_i >= 0 && isNumeric(lines[y][x_i])) {
        x_i--;
      }
      x_i = Math.max(0, x_i + 1);

      while (x_i < lines[y].length && isNumeric(lines[y][x_i])) {
        num += lines[y][x_i];
        visitedPoints.add({ x: x_i, y });

        x_i++;
      }
    }

    if (num.trim() !== "") {
      const n = parseInt(num.trim());
      const curr = ratioNums.get(ratio) ?? [];
      ratioNums.set(ratio, curr.concat([n]));
    }
  }

  return Array.from(ratioNums.keys())
    .map((ratioId) => {
      const arr = ratioNums.get(ratioId)!;
      if (arr.length > 1) {
        return arr.reduce((acc, x) => acc * x, 1);
      }
      return 0;
    })
    .reduce((acc, x) => acc + x, 0);
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
