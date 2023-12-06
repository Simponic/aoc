export const main = async (lines: string[]): Promise<number | string> => {
  const times = lines[0]
    .split(":")
    .at(1)!
    .split(" ")
    .filter((x) => x)
    .map((x) => parseInt(x));

  const distances = lines[1]
    .split(":")
    .at(1)!
    .split(" ")
    .filter((x) => x)
    .map((x) => parseInt(x));

  console.log(times, distances);

  let prod = 1;

  for (let i = 0; i < distances.length; i++) {
    const [time, record] = [times[i], distances[i]];

    let winTimes = 0;

    for (
      let buttonPressLength = 0;
      buttonPressLength <= time;
      buttonPressLength++
    ) {
      const timeTraveled = time - buttonPressLength;
      const totalDistance = buttonPressLength * timeTraveled;

      if (totalDistance > record) winTimes++;
    }

    prod *= winTimes;
  }

  return prod;
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
