export const main = async (lines: string[]): Promise<number | string> => {
  return lines
    .map((x) => Number(x))
    .map((_num, i, arr) => {
      if (i > arr.length - 3) return -1;
      return arr.slice(i, i + 3).reduce((acc, x) => acc + x, 0);
    })
    .map((num, i, arr) => {
      return i > 0 && arr[i - 1] < num;
    })
    .filter((x) => x).length;
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
