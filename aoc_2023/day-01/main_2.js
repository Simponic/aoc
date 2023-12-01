const fs = require("node:fs");

const digits = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const data = fs.readFileSync("input.txt", "utf8");

const res = data
  .split("\n")
  .filter((line) => line && line != "")
  .map((line) => {
    let newLine = "";
    for (let i = 0; i < line.length; i++) {
      for (let j = i + 1; j < line.length + 1; j++) {
        const word = line.substring(i, j);
        if (word.match(/^[0-9]$/)) {
          newLine += word;
        }
        if (word in digits) {
          newLine += digits[word].toString();
        }
      }
    }
    return newLine;
  })
  .reduce((acc, line) => {
    const nums = line.split("");
    const first = parseInt(nums.at(0));
    const last = parseInt(nums.at(-1));

    return acc + (first * 10 + last);
  }, 0);

console.log(res);
