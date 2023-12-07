import { expect, test } from "bun:test";
import { main as part1, score } from "./part_1";
import { main as part2, score as scoreJoker } from "./part_2";

const example = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`.split("\n");

test("part1", async () => {
  const answer = 6440;
  const res = await part1(example);
  expect(res).toEqual(answer);
});

test("matching", () => {
  expect(score("AAAAA")).toEqual(6);
  expect(score("AA8AA")).toEqual(5);
  expect(score("23332")).toEqual(4);
  expect(score("TTT98")).toEqual(3);
  expect(score("23432")).toEqual(2);
  expect(score("A23A4")).toEqual(1);
  expect(score("23456")).toEqual(0);
});

test("part2", async () => {
  const answer = 5905;
  const res = await part2(example);
  expect(res).toEqual(answer);
});
