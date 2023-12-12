// Tutaj skopiuj kod zadania

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
