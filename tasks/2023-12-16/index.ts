// Tutaj skopiuj kod zadania
// ? Day 16
// Przed Mikołajem misja specjalna - musi on dostarczyć prezent,
// który został zamówiony w innym wymiarze. Aby dostarczyć tę szczególną paczkę,
// Święty musi wykonać kilka skoków w czasoprzestrzeni i wyszukać odpowiednią galaktykę,
// w której przedstawiciel obcej cywilizacji odbierze swój prezent.
// Aby zachować wysokie standardy bezpieczeństwa, elfy odpowiedzialne za info-sec zarekomendowały
// logowanie całej historii podróży Mikołaja, aby w razie potrzeby wyruszyć na misję poszukiwawczą.
// Czy jesteś w stanie utworzyć taki system bezpiecznej nawigacji?

// Represents the state of the GalacticHistoryTracer
type GalacticHistoryTracer<T> = {
  // Array to store the historical entries
  history: T[];

  // Index pointing to the current entry in the history
  currentIndex: number;

  // Functions
  add(entry: T): void;
  current(): T | null;
  undo(): void;
  redo(): void;
};

/**
 * Creates a GalacticHistoryTracer with an empty history.
 * @returns An empty GalacticHistoryTracer.
 */
export function createTracer<T>(): GalacticHistoryTracer<T> {
  const tracer: GalacticHistoryTracer<T> = {
    history: [],
    currentIndex: -1,

    /**
     * Adds a new entry to the GalacticHistoryTracer.
     * @param entry The entry to be added.
     */
    add(entry: T): void {
      // Add a new entry to the history
      tracer.history.push(entry);
      // Update the current index to the new entry
      tracer.currentIndex = tracer.history.length - 1;
    },

    /**
     * Retrieves the current entry in the GalacticHistoryTracer.
     * @returns The current entry or null if the history is empty.
     */
    current(): T | null {
      // Return the current entry if there is any, otherwise return null
      return tracer.currentIndex > -1
        ? tracer.history[tracer.currentIndex]
        : null;
    },

    /**
     * Moves back one step in the GalacticHistoryTracer's history.
     */
    undo(): void {
      // Move back in history if possible
      tracer.currentIndex -= 1;
    },

    /**
     * Moves forward one step in the GalacticHistoryTracer's history.
     * @throws Error if there are no more entries to explore.
     */
    redo(): void {
      // Move forward in history if possible
      if (tracer.currentIndex < tracer.history.length - 1) {
        tracer.currentIndex += 1;
      } else {
        throw new Error("No more galaxies to explore");
      }
    },
  };

  return tracer;
}
