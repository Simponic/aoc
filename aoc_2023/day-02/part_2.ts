export const main = async (lines: string[]): Promise<number | string> => {
  const games = lines
    .filter((x) => x)
    .map((line) => line.split(":").at(-1) as string)
    .map((line) => line.split(";").map((x) => x.trim()));

  let sum = 0;
  for (let i = 0; i < games.length; i++) {
    const game = games[i];

    const mins = new Map<string, number>([
      ["red", 0],
      ["green", 0],
      ["blue", 0],
    ]);

    for (const play of game) {
      const sets = play.split(",").map((x) => x.trim());
      for (const [num, color] of sets.map((s) => s.split(" "))) {
        mins.set(color, Math.max(mins.get(color)!, parseInt(num)));
      }
    }

    sum += Array.from(mins.keys())
      .map((color) => mins.get(color)!)
      .reduce((acc, x) => acc * x, 1);
  }

  return sum;
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
