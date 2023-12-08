// Tutaj skopiuj kod zadania
// ? Day 8
// Pewna grupa elfów z zespołu Świętego Mikołaja zajmuje się sortowaniem listów.
// Niestety, wymagania związane z sortowaniem zmieniają się każdego dnia,
// a system do obsługi sortowania nie jest wystarczająco elastyczny.
// Zaproponuj rozwiązanie, które pozwoli na łatwe dodawanie nowych strategii sortowania w zależności od parametrów
// takich jak kraj pochodzenia listu, priorytet, jego długość, albo zawartość.
// * -------------------- List | Sorting + localeCompare --------------------

// Enum to represent priority levels
export enum Priority {
  high = 1,
  medium = 2,
  low = 3,
}

// Define the structure of a letter
export interface Letter {
  content: string;
  country: "pl" | "de" | "us";
  priority: "high" | "medium" | "low";
}

// -------------------- Main
export class LetterSorter {
  private strategy: Strategy;
  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  sortLetters(letters: Letter[]): Letter[] {
    return this.strategy.sort(letters);
  }
}

// Define a strategy interface for sorting letters
interface Strategy {
  // Method to sort an array of letters
  sort(letters: Letter[]): Letter[];
}

// -------------------- Strategies

// Priority sorting strategy
export class PriorityStrategy implements Strategy {
  sort(letters: Letter[]): Letter[] {
    return (
      letters
        // ? Create a copy of the array using slice to avoid modifying the original array
        // ? 'slice': Returns a shallow copy of a portion of an array into a new array
        .slice()
        // ? Sorting based on the priority level using the Priority enum
        // ? > 'Priority[a.priority] - Priority[b.priority]' ensures correct comparison of priority levels
        .sort((a, b) => Priority[a.priority] - Priority[b.priority])
    );
  }
}

// Country sorting strategy
export class CountryStrategy implements Strategy {
  sort(letters: Letter[]): Letter[] {
    // ? Sorting based on the 'country' property using string comparison
    return letters.slice().sort((a, b) => a.content.localeCompare(b.content));
  }
}

// Length sorting strategy
export class LengthStrategy implements Strategy {
  sort(letters: Letter[]): Letter[] {
    // ? Sorting based on the length of the 'content' property using subtraction
    // ? > If a.content.length is greater, it comes after b.content.length
    return letters.slice().sort((a, b) => a.content.length - b.content.length);
  }
}
