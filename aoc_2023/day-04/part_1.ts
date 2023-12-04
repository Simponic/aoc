export const main = async (lines: string[]): Promise<number | string> => {
  let sum = 0;

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

    console.log(cardNums, winners);

    const winnerSet = new Set<number>(winners);
    const wins = cardNums.reduce(
      (acc, x) => acc + (winnerSet.has(x) ? 1 : 0),
      0
    );
    if (wins > 0) sum += Math.pow(2, wins - 1);
  }

  return sum;
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
