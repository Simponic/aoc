export const main = async (lines: string[]): Promise<number | string> => {
  const maps: number[][][] = [];

  const seeds = lines[0]
    .split(":")
    .at(1)!
    .split(" ")
    .filter((x) => x)
    .map((x) => parseInt(x));

  for (const line of lines.slice(1, lines.length)) {
    if (!line) continue;

    if (line.includes("to")) {
      maps.push([]);
      continue;
    }
    console.log(maps);

    const currMap = maps.at(-1);
    const [dest, source, range] = line.split(" ").map((x) => parseInt(x));
    if (currMap) {
      currMap.push([dest, source, range]);
    }
  }

  let min = Math.pow(2, 32);
  for (const seed of seeds) {
    const location = maps.reduce((acc, map) => {
      const [dest, source, _range] = map.find(
        ([_dest, source, range]) => acc - source < range && acc - source >= 0
      ) ?? [acc, acc];
      return acc - source + dest;
    }, seed);
    min = Math.min(min, location);
  }
  return min;
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
