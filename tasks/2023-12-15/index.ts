// Tutaj skopiuj kod zadania
// ? Day 15
// Trudne warunki pogodowe sprawiły, że Święty Mikołaj pogubił niektóre z prezentów przewożonych na saniach.
// Przy pierwszej możliwej okazji skontaktował się z Elfami przekazując im
// listę brakujących prezentów nalegając o jak najszybsze dostarczenie zapasowych odpowiedników.
// Niestety, wersje zapasowe przechowywane są w ścieśle strzeżonym magazynie,
// którego system skrytek komplikuje dostęp do przedmiotów.
// Elfy muszą wykonać zapytanie do systemu, które zwróci im numery skrytek umożliwiających
// zbudowanie awaryjnego zestawu prezentów. Jak to zrobić,
// kiedy wszyscy działają pod presją czasu a z magazynu zapasowego od dawna nie korzystano?
// * -------------------------------------------- Generator function to [yield storage] --------------------------------------------

// ? storageQuery that generates storage sections based on a given range, gift type, and a resolver function.
// ? The generator should yield sections where gifts of a certain type can be stored.

// * This implementation uses a generator function to [yield storage] sections
// * based on the conditions specified by the resolver function.
// * The storageResolver function is a placeholder for your actual resolver logic,
// * which should determine whether a given storage section can store a specific gift type.

// ? -------------------------------------------- Explanation
// ? Global Dictionary (giftConditions):
// * ▶ This is a global constant dictionary (giftConditions) that maps each gift type to a corresponding condition function.
// * ▶ For each gift type (hat, smartphone, book), there's a condition function that takes
// * a storage section number (n) and returns a boolean indicating whether the section can store that type of gift.
// * ▶ This dictionary is defined outside the storageQuery function to make it accessible globally within the module.

// Define conditions for each gift type using a global dictionary
const giftConditions: Record<string, (n: number) => boolean> = {
  hat: (n) => n % 3 === 0,
  smartphone: (n) => n % 10 === 0,
  book: (n) => n % 4 === 0,
};

// ? -------------------------------------------- Explanation
// ? storageQuery Function:
// * This function generates storage sections for a given gift type (gift) based on a specified range.
// * ▶ It takes three parameters:
// * - [range]: The range of storage sections to consider.
// * - [gift]: The type of gift for which storage sections are generated.
// * - [resolver]: A resolver function that determines whether a given section can store the specified gift type.
// * ▶ It uses a for loop to iterate over the storage sections from 1 to the specified range.
// * ▶ For each section, it checks whether the section can store the specified gift type using the resolver function.
// * ▶ If the condition is met, the section is yielded using a generator.
/**
 * Generates storage sections for a given gift type based on a range and resolver function.
 * @param range The range of storage sections.
 * @param gift The type of gift.
 * @param resolver A resolver function that determines whether a section can store the given gift type.
 * @returns A generator that yields storage sections.
 */
export function* storageQuery(
  range: number,
  gift: string,
  resolver: (n: number, gift: string) => boolean
): Generator<number> {
  for (let section = 1; section <= range; section++) {
    if (resolver(section, gift)) {
      yield section;
    }
  }
}

// ? -------------------------------------------- Explanation
// ? storageResolver Function:
// * ▶ This function is a resolver function for testing purposes.
// * ▶ It takes a storage section number (n) and a gift type (gift).
// * ▶ It looks up the condition function for the specified gift type from the global giftConditions dictionary.
// * ▶ It then calls the condition function with the storage section number (n) and returns true
// * if the condition is met or false otherwise

/**
 * A storage resolver function for testing purposes.
 * @param n The storage section number.
 * @param gift The type of gift.
 * @returns True if the section can store the given gift type, false otherwise.
 */
export function storageResolver(n: number, gift: string): boolean {
  // Use the specified condition for the given gift type, or default to false
  return giftConditions[gift]?.(n) || false;
}
