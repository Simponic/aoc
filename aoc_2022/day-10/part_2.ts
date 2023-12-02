const cycles = (instruction: string): number => {
  if (instruction === "noop") return 1;
  if (instruction === "addx") return 2;
  return 0;
};

export const main = async (lines: string[]): Promise<number | string> => {
  const instructions = lines.map((line) => line.split(" "));
  let signalStrength = 0;
  let cycle = 0;
  const registers = { x: 1 };
  const dim = { width: 40, height: 6 };

  const crt = Array(dim.width * dim.height).fill("");

  for (const [instruction, operand] of instructions) {
    const instCycles = cycles(instruction);
    for (let i = 0; i < instCycles; i++) {
      const crtx = cycle % dim.width;
      crt[cycle] = [registers.x - 1, registers.x, registers.x + 1].includes(
        crtx
      )
        ? "#"
        : ".";

      cycle++;
      if (cycle >= 20 && (cycle - 20) % 40 === 0) {
        signalStrength += registers.x * cycle;
      }
    }

    if (instruction === "addx") {
      registers.x += parseInt(operand);
    }
  }

  return Array(dim.height)
    .fill(null)
    .map((_, i) => crt.slice(dim.width * i, dim.width * (i + 1)).join(""))
    .join("\n");
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
