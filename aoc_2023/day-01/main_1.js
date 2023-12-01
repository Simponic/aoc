const fs = require("node:fs");

const data = fs.readFileSync("input.txt", "utf8");

const res = data
  .split("\n")
  .filter((line) => line && line != "")
  .map((line) => line.replaceAll(/[^0-9]*/g, ""))
  .reduce((acc, line) => {
    const nums = line.split("");

    const first = parseInt(nums.at(0));
    const last = parseInt(nums.at(-1));

    return acc + (first * 10 + last);
  }, 0);

console.log(res);
