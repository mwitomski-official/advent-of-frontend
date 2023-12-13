// Tutaj skopiuj kod zadania

// ? Day 12
// Jak co roku, w okresie świąt o działalności Świętego Mikołaja szeroko rozpisują się media.
// Dziennikarze chcą wiedzieć jak organizuje on swoją podróż, jakie są jego plany na przyszłość, a także co robi w wolnym czasie.
// Jako, że do świąt zostało już naprawdę niewiele czasu, Mikołaj zdecydował się na przeprowadzenie wywiadów o z góry ustalonych ramach czasowych.
// Niestety, nie każdy dziennikarz trzyma się ustalonych zasad. Mikołaj potrzebuje systemu, który pozwoli mu anulować przeciągające się rozmowy.

/**
 * Represents an asynchronous interview process for a list of subjects.
 * @param subjects An array of subjects to be interviewed.
 * @param interview A function representing the interview process for a single subject.
 * @param timeConstraint The maximum time allowed for each interview (in milliseconds).
 * @returns A Promise that resolves to an array of strings representing the results of the interviews.
 */
export async function conductInterviews(
  subjects: string[],
  interview: (subject: string) => Promise<string>,
  timeConstraint: number
): Promise<string[]> {
  const results: string[] = [];

  // Iterate through subjects and conduct interviews
  for (const subject of subjects) {
    try {
      // Use Promise.race to handle timeouts
      const result = await Promise.race([
        // Interview the subject
        interview(subject),
        // Timeout promise
        new Promise<string>((_, reject) =>
          setTimeout(
            () => reject(new Error("Interview timeout")),
            timeConstraint
          )
        ),
      ]);

      // Add the result to the array
      results.push(result);
    } catch (error: any) {
      // Handle errors, including timeouts
      results.push(`Error: ${error.message}`);
    }
  }

  // Skip messages that exceed timeout
  let mResults = results.filter(
    (result) => result !== "Error: Interview timeout"
  );

  return mResults;
}
