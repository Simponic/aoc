export const main = async (lines: string[]): Promise<number | string> => {
  const colors = new Map<string, number>([
    ["red", 12],
    ["green", 13],
    ["blue", 14],
  ]);

  const games = lines
    .filter((x) => x)
    .map((line) => line.split(":").at(-1) as string)
    .map((line) => line.split(";").map((x) => x.trim()));

  const unplayableGames = new Set<number>();

  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    for (const play of game) {
      const sets = play.split(",").map((x) => x.trim());
      for (const [num, color] of sets.map((s) => s.split(" "))) {
        const totalColors = colors.get(color) ?? 0;
        if (parseInt(num) > totalColors) {
          unplayableGames.add(i + 1);
        }
      }
    }
  }

  const n = games.length;
  const perfect = (n * (n + 1)) / 2;

  return perfect - Array.from(unplayableGames).reduce((acc, x) => acc + x, 0);
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

  console.log("=== ANSWER TO P1 ===");
  console.log(answer);
}
