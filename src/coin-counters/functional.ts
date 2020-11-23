export default function solveUsingRecursive(total: number, coins: number[]): number[] {
  let bestCoins: number[] = [];

  function calculate(total: number, currentPath: number[]): void {
    for (const coin of coins) {
      currentPath.push(coin);
      const nextTotal = total - coin;

      if (bestCoins.length > 0 && currentPath.length >= bestCoins.length) {
        currentPath.pop();
        continue;
      }

      if (nextTotal < 0) {
        currentPath.pop();
        continue;
      }

      if (nextTotal === 0) {
        bestCoins = [...currentPath];
        currentPath.pop();
        continue;
      }

      calculate(nextTotal, currentPath);
      currentPath.pop();
    }
  }

  calculate(total, []);

  return bestCoins;
}
