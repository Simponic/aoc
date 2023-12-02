import { expect, test } from "bun:test";
import { main as part1 } from "./part_1";
import { main as part2 } from "./part_2";

const example = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`.split("\n");

test("part1", async () => {
  const answer = 8;
  const res = await part1(example);
  expect(res).toEqual(answer);
});

test("part2", async () => {
  const answer = 2286;
  const res = await part2(example);
  expect(res).toEqual(answer);
});
