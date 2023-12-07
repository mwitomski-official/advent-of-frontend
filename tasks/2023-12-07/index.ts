// Tutaj skopiuj kod zadania
//? Day 7
// W zespole Świętego Mikołaja zapanował chaos.
// Chmurowy system do zamawiania prezentów obsługuje teraz konta rodzinne,
// dzięki czemu zarówno rodzice jak i dzieci mogą bez końca edytować te same listy.
// W efekcie tych zmian, zarówno Mikołaj jak i jego elfy gubią się w tym, co dzieci naprawdę chcą dostać.
// Na naradzie kryzysowej pojawił się pomysł nowego modelu danych, który pozwoliłby na śledzenie zmian w życzeniach dzieci.
// Niestety, elfy nie wiedza jak wdrożyć taki system w istniejącym kodzie. Pomóż im!
// * -------------------- Proxy --------------------

// It represents a collection of key-value pairs where the keys are strings,
// and the values are numeric.
type Letter = { [key: string]: number };

// ? -------------------- Explanation
// ? Function below takes two parameters:
// ? `letter`:
// ? This is the original letter object, an instance of the Letter type.
// ? `changeTracker`:
// ? This is a function that will be called whenever a property in the letter is changed.
// ? It takes two parameters, the `key` (property name) and the new `value`.
/**
 * Creates a tracked letter using a Proxy.
 * @param letter - The original letter object.
 * @param changeTracker - A function to track changes in the letter.
 * @returns A tracked letter.
 */
export function createTrackedLetter(
  letter: Letter,
  changeTracker: (key: string, value: number) => void
): Letter {
  if (typeof changeTracker !== "function") {
    throw new Error("changeTracker must be a function.");
  }

  // ? Here, a `Proxy` is used to create a `trackedLetter`.
  // ? The `set` handler intercepts property assignments.
  // ? It ensures that `key` is always treated as a string using `String(key)`.
  // ? If the new value is a valid number, and it's different from the current value,
  // ? it calls `changeTracker` with the property name and the new numeric value.
  // ? Finally, it updates the property in the original `letter` object.
  const trackedLetter = new Proxy(letter, {
    set: function (target, key, value) {
      // Ensure key is always treated as a string
      const propertyName = String(key);

      const numericValue = Number(value);
      if (!isNaN(numericValue) && target[propertyName] !== numericValue) {
        changeTracker(String(key), numericValue);
      }

      // Update the property in the original letter
      target[propertyName] = numericValue;

      // Indicate success
      return true;
    },
  });

  // ? The function returns the `trackedLetter`,
  // ? which is a proxy around the original `letter` object.
  // ? The `as Letter` is a type assertion, telling TypeScript that the returned object is of type Letter.
  return trackedLetter as Letter;
}
