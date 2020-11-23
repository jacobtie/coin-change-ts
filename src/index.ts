import {
  solveUsingRecursive,
  solveUsingRecursiveMemo,
  solveUsingDynamicProgramming,
} from './coin-counters';

function main() {
  const total = 341;
  const coins = [25, 10, 1];

  let fn: (total: number, coins: number[]) => number[];

  switch (process.argv[2]) {
    case 'a':
      console.log('Running recursive algorithm...');
      fn = solveUsingRecursive;
      break;
    case 'b':
      console.log('Running recursive algorithm with memoization...');
      fn = solveUsingRecursiveMemo;
      break;
    case 'c':
      console.log('Running dynamic programming algorithm...');
      fn = solveUsingDynamicProgramming;
      break;
    default:
      throw new Error("Invalid input. Expected 'a', 'b', or 'c'.");
  }

  const startTime = process.hrtime();

  const coinCombo = fn(total, coins);

  const endTime = process.hrtime(startTime);
  const timeInMs = (endTime[0] * 1e9 + endTime[1]) / 1e6; // convert first to ns then to ms

  if (coinCombo.length === 0) {
    console.log('No solution');
    return;
  } else {
    console.log(`The fewest number of coins to make up ${total} is ${coinCombo.length}`);
    let summationString = `${total} = `;
    for (let i = 0; i < coinCombo.length; i++) {
      summationString += coinCombo[i];
      if (i < coinCombo.length - 1) {
        summationString += ' + ';
      }
    }
    console.log(summationString);
  }

  console.log(`Time taken: ${timeInMs}ms`);
}

main();
