export const cardOrder = "A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, 2"
  .split(", ")
  .reverse();

export const score = (hand: string) => {
  const cards = hand.split("");

  // five of a kind
  if (hand.match(new RegExp(cards[0], "g"))?.length === cards.length) return 6;

  // four of a kind
  for (const card of cards) {
    if (hand.match(new RegExp(card, "g"))?.length === 4) return 5;
  }

  // full house
  let threeMatching = cards.some(
    (card) => hand.match(new RegExp(card, "g"))?.length === 3
  );
  let twoMatching = cards.find(
    (card) => hand.match(new RegExp(card, "g"))?.length === 2
  );
  if (threeMatching && twoMatching) return 4;
  if (threeMatching) return 3;

  let twoMatchingUnique = cards.find(
    (card) =>
      card !== twoMatching && hand.match(new RegExp(card, "g"))?.length === 2
  );
  if (twoMatchingUnique) return 2;

  if (twoMatching) return 1;

  return 0;
};

export const main = async (lines: string[]): Promise<number | string> => {
  const hands: { hand: string; bid: number }[] = lines
    .map((line) => {
      const [hand, bidS] = line.split(" ");
      const bid = parseInt(bidS);
      return { hand, bid };
    })
    .sort(({ hand: handOne }, { hand: handTwo }) => {
      const scoreOne = score(handOne);
      const scoreTwo = score(handTwo);

      if (scoreOne === scoreTwo) {
        let [cardOneScore, cardTwoScore] = [-1, -1];
        let i = 0;
        while (cardOneScore === cardTwoScore && i < handOne.length) {
          cardOneScore = cardOrder.indexOf(handOne[i]);
          cardTwoScore = cardOrder.indexOf(handTwo[i]);
          i++;
        }

        return cardOneScore - cardTwoScore;
      }
      return scoreOne - scoreTwo;
    });

  return hands.reduce((acc, { bid }, i) => acc + bid * (i + 1), 0);
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
