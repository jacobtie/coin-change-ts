interface SubProblem {
  count: number;
  coins: number[];
}

export default function solveUsingDynamicProgramming(total: number, coins: number[]): number[] {
  const subProblems: SubProblem[] = [...Array(total + 1)].map(() => ({
    count: Number.MAX_VALUE,
    coins: [],
  }));
  subProblems[0].count = 0;

  for (let i = 1; i <= total; i++) {
    for (const coin of coins) {
      if (i - coin >= 0 && subProblems[i - coin].count + 1 < subProblems[i].count) {
        subProblems[i].count = subProblems[i - coin].count + 1;
        subProblems[i].coins = [...subProblems[i - coin].coins, coin];
      }
    }
  }

  return subProblems[total].coins;
}
