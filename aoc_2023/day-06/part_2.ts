export const main = async (lines: string[]): Promise<number | string> => {
  const distance = parseInt(lines[1].split(":").at(1)!.replaceAll(" ", ""));

  const time = parseInt(lines[0].split(":").at(1)!.replaceAll(" ", ""));

  let winTimes = 0;

  for (
    let buttonPressLength = 0;
    buttonPressLength <= time;
    buttonPressLength++
  ) {
    const timeTraveled = time - buttonPressLength;
    const totalDistance = buttonPressLength * timeTraveled;

    if (totalDistance > distance) winTimes++;
  }

  return winTimes;
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
