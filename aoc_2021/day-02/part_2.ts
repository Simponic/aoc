export const main = async (lines: string[]): Promise<number | string> => {
  const { depth, horiz } = lines
    .map((line) => line.split(" "))
    .reduce(
      (acc, [dir, delta]) => {
        const d = Number(delta);
        if (dir === "forward") {
          acc.horiz += d;
          acc.depth += acc.aim * d;
        }

        if (dir === "up") {
          acc.aim -= d;
        }
        if (dir === "down") {
          acc.aim += d;
        }
        return acc;
      },
      { horiz: 0, depth: 0, aim: 0 },
    );

  return depth * horiz;
};

//

const isrun = process.argv.length > 1 && process.argv[1] === import.meta.path;
if (isrun) {
  const file = Bun.file("./problem.txt");
  const text = await file.text();
  const lines = text.split("\n");

  console.log("=== COMPUTATION ===\n");

  const answer = await main(lines);

  console.log("\n=== /COMPUTATION ===\n");

  console.log("=== ANSWER TO P2 ===");
  console.log(answer);
}
