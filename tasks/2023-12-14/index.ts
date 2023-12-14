// Tutaj skopiuj kod zadania
// ? Day 14
// Na kilka dni przed świętami, Mikołaj przygotowywał się do doręczenia prezentów dzieciom na całym świecie.
// Jego worki były pełne różnorodnych upominków, a każdy z nich miał określoną wartość, wagę i objętość.
// Mikołaj chciał zmaksymalizować wartość dostarczonych prezentów,
// ale jednocześnie musiał przestrzegać limitów wagowych i pojemności swoich sań.
// Wiedząc, że to zadanie wymaga nie tylko magii, ale i algorytmicznego podejścia,
// postanowił poprosić o pomoc elfa-programistę, który zna się na programowaniu dynamicznym.
// * -------------------------------------------- Knapsack problem --------------------------------------------
// ? -------------------------------------------- Explanation
// ? The knapsack problem, which is a classic optimization problem.
// * The knapsack problem asks for the maximum value that can be obtained by selecting a subset of items,
// * each with its own weight and value, such that the total weight and volume of the selected items do not exceed given constraints.

// ? 1. Matrix Initialization:
// * -> The function creates a three-dimensional matrix dp, where [dp[i][w][v]]
// * represents the maximum value that can be obtained by considering the first [i] gifts, with a total [weight] of [w] and a total [volume] of [v].

// ? 2. Dynamic Programming Loop:
// * -> The code iterates through [each gift (i)], [total weight (w)], and [total volume (v)] combination to fill in the matrix.
// * -> For each combination, the algorithm makes a decision whether to include the current gift or not.

// ? 3. Decision Logic:
// * -> If the [weight] and [volume] of the current gift fit within the remaining [weight (w)] and [volume (v)],
// * the algorithm decides whether to include the current gift based on its value.
// * -> The decision is made by comparing the maximum value obtained without the current gift (dp[i-1][w][v])
// * and the maximum value obtained by including the current gift
// ! ▶ (dp[i-1][w-currentGift.weight][v-currentGift.volume] + currentGift.value).
// * -> The maximum value is stored in the matrix (dp[i][w][v]).

// ? 4. Matrix Completion:
// * -> After iterating through all gifts and weight/volume combinations,
// * the matrix is filled, and the bottom-right cell (dp[gifts.length][maxWeight][maxVolume]) contains the maximum value.

// ? 5. Return Result:
// * -> The function returns the maximum value calculated for the given gifts, maxWeight, and maxVolume.

// The dynamic programming approach efficiently solves the problem by breaking it down into subproblems
// and using the solutions of smaller subproblems to build up the solution to the larger problem.
// The matrix dp effectively memorizes the results of overlapping subproblems, avoiding redundant calculations.
// ! This algorithm has a time complexity of ▶ O(n * maxWeight * maxVolume), where 'n' is the number of gifts.
// It is a commonly used approach for solving optimization problems with constraints.

export type Gift = {
  value: number;
  weight: number;
  volume: number;
};

/**
 * Calculates the maximum value of delivered gifts within weight and volume constraints.
 * @param gifts An array of gifts with their respective values, weights, and volumes.
 * @param maxWeight The maximum total weight that can be delivered.
 * @param maxVolume The maximum total volume that can be delivered.
 * @returns The maximum value of delivered gifts within the given constraints.
 */
export function calculateMaxGiftValue(
  gifts: Gift[],
  maxWeight: number,
  maxVolume: number
): number {
  if (gifts.length === 0) return 0;

  // Create a matrix to store the maximum values for each combination of weight and volume
  const dp: number[][][] = Array.from({ length: gifts.length + 1 }, () =>
    Array.from({ length: maxWeight + 1 }, () => Array(maxVolume + 1).fill(0))
  );

  // Iterate through each gift and calculate the maximum value for each combination of weight and volume
  for (let i = 1; i <= gifts.length; i++) {
    for (let w = 0; w <= maxWeight; w++) {
      for (let v = 0; v <= maxVolume; v++) {
        const currentGift = gifts[i - 1];

        if (currentGift.weight <= w && currentGift.volume <= v) {
          // Decide whether to include the current gift or not
          dp[i][w][v] = Math.max(
            dp[i - 1][w][v],
            dp[i - 1][w - currentGift.weight][v - currentGift.volume] +
              currentGift.value
          );
        } else {
          // If the current gift cannot be included, use the value from the previous row
          dp[i][w][v] = dp[i - 1][w][v];
        }
      }
    }
  }

  // The maximum value is stored in the bottom-right cell of the matrix
  return dp[gifts.length][maxWeight][maxVolume];
}
