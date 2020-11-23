export default function solveUsingRecursiveMemo(total: number, coins: number[]): number[] {
  let bestCoins: number[] = [];
  const mem: { [key: number]: number[] } = {};

  function calculate(total: number, currentPath: number[]): void {
    for (const coin of coins) {
      currentPath.push(coin);
      const nextTotal = total - coin;

      if (bestCoins.length > 0 && currentPath.length >= bestCoins.length) {
        currentPath.pop();
        continue;
      }

      if (nextTotal < 0) {
        if (coin === coins[coins.length - 1] && !mem[total]) {
          mem[total] = [];
        }
        currentPath.pop();
        continue;
      }

      if (nextTotal === 0) {
        mem[total] = [...currentPath];
        bestCoins = [...currentPath];
        currentPath.pop();
        continue;
      }

      if (mem[nextTotal]) {
        let finalPath: number[];
        if (mem[nextTotal].length > 0) {
          finalPath = [...currentPath, ...mem[nextTotal]];
        } else {
          finalPath = [];
        }
        if (finalPath.length < bestCoins.length) {
          bestCoins = [...finalPath];
        }
        mem[total] = [...finalPath];
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
