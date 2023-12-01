export const main = async (
  lines: string[]
): Promise<number | string> => {
  const answer = lines.length;

  // delete me!
  console.log(lines);

  return answer;
};

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
