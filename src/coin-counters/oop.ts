export default class CoinCounter {
  private coins: number[];
  private bestCoins: number[];
  private currentPath: number[];
  private mem: { [key: number]: number[] };

  public static solveUsingRecursiveMemo(total: number, coins: number[]): number[] {
    const counter = new CoinCounter(coins);
    counter.calculate(total);
    return counter.bestCoins;
  }

  private constructor(coins: number[]) {
    this.coins = coins;
    this.bestCoins = [];
    this.currentPath = [];
    this.mem = {};
  }

  private calculate(total: number) {
    for (const coin of this.coins) {
      this.currentPath.push(coin);
      const nextTotal = total - coin;

      if (this.bestCoins.length > 0 && this.currentPath.length >= this.bestCoins.length) {
        this.currentPath.pop();
        continue;
      }

      if (nextTotal < 0) {
        if (coin === this.coins[this.coins.length - 1] && !this.mem[total]) {
          this.mem[total] = [];
        }
        this.currentPath.pop();
        continue;
      }

      if (nextTotal === 0) {
        this.mem[total] = [...this.currentPath];
        this.bestCoins = [...this.currentPath];
        this.currentPath.pop();
        continue;
      }

      if (this.mem[nextTotal]) {
        const finalPath = [...this.currentPath, ...this.mem[nextTotal]];
        if (finalPath.length < this.bestCoins.length) {
          this.bestCoins = [...finalPath];
        }
        this.mem[total] = [...finalPath];
        this.currentPath.pop();
        continue;
      }

      this.calculate(nextTotal);
      this.currentPath.pop();
    }
  }
}
