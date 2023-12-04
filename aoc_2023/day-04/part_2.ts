export const main = async (lines: string[]): Promise<number | string> => {
  let card = 0;
  const counts = new Map<number, number>();
  lines.forEach((_, i) => counts.set(i, 1));

  for (const line of lines) {
    const [cardS, numbersS] = line.split(" | ");
    const cardNums = cardS
      .split(":")
      .at(1)!
      .split(" ")
      .filter((x) => x)
      .map((x) => x.trim())
      .map((x) => parseInt(x));
    const winners = numbersS
      .split(" ")
      .filter((x) => x)
      .map((x) => x.trim())
      .map((x) => parseInt(x));

    const winnerSet = new Set<number>(winners);
    const wins = cardNums.reduce(
      (acc, x) => acc + (winnerSet.has(x) ? 1 : 0),
      0
    );

    const currCardCount = counts.get(card) ?? 1;

    for (let _ = 0; _ < currCardCount; _++) {
      for (let i = 1; i <= Math.min(wins, lines.length - 1); i++) {
        const currCount = counts.get(card + i) ?? 1;
        counts.set(card + i, currCount + 1);
      }
    }

    card++;
  }

  console.log(counts);

  return Array.from(counts.keys())
    .map((x) => counts.get(x)!)
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
