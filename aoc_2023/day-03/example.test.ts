import { expect, test } from "bun:test";
import { main as part1 } from "./part_1";
import { main as part2 } from "./part_2";

const example = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`.split("\n");

test("part1", async () => {
  const answer = 4361;
  const res = await part1(example);
  expect(res).toEqual(answer);
});

test("part2", async () => {
  const answer = 467835;
  const res = await part2(example);
  expect(res).toEqual(answer);
});
