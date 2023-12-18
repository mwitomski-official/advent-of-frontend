// Tutaj skopiuj kod zadania
// ? Day 17
// Na czas nieobecności Świętego Mikołaja zespół elfów-programistów eksperymentuje z nowościami,
// jakie zostaną wdrożone w przyszłym roku do procesu przygotowywania prezentów.
// Jednym z pomysłów jest zbudowanie nowego języka opisu prezentów, który będzie bardziej czytelny dla każdego pracownika fabryki.
// Powstaje prototyp języka GSL (GiftStylingLanguage), którego pierwsze polecenia wyglądają naprawdę obiecująco.
// Problem w tym, że nikt nie potrafi ich przetłumaczyć na wykonywalny kod,
// a system do obsługi prezentów nie jest w stanie ich zinterpretować.
// Czy uda się zbudować funkcję do obsługi języka GSL, która będzie zwracać poprawnie sformatowany opis prezentu?
// * -------------------------------------------- Custom Parser --------------------------------------------

export const GSL_DEMO_SNIPPET = `
Gift(ribbon: "gold curly", label: "Merry Christmas!") {
    Wearable(type: "socks", size: "small", color: "red").if(winterSeason: true) {
      pattern: "snowflakes"
    }

    Wearable(type: "scarf", size: "medium", color: "green") {
      pattern: "snowflakes"
    }

    Literary(type: "book", size: "15cm 22cm 2cm", title: "Christmas Stories", author: "C. Claus")
}
`;

export interface Gift {
  items: Array<Wearable | Literary>;
}

export interface Wearable {
  type: string;
  size: string;
  color: string;
  pattern?: string;
}

export interface Literary {
  type: string;
  size: string;
  title: string;
  author: string;
}

export function parseGSL(gslScript: string): Gift {
  const gift: Gift = { items: [] };
  let currentGiftItem: Wearable | Literary | null = null;

  const lines = gslScript
    .trim()
    .split("\n")
    .filter((line) => line.trim() !== ""); // Remove empty lines
  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith("Gift(")) {
      // Handle Gift properties (ribbon, label) if needed
      continue;
    }

    if (
      trimmedLine.startsWith("Wearable(") ||
      trimmedLine.startsWith("Literary(")
    ) {
      // Extract type, size, color, and any additional properties
      const typeMatch = /type: "(.*?)"/.exec(trimmedLine);
      const sizeMatch = /size: "(.*?)"/.exec(trimmedLine);
      const colorMatch = /color: "(.*?)"/.exec(trimmedLine);

      if (typeMatch && sizeMatch) {
        const type = typeMatch[1];
        const size = sizeMatch[1];
        const color = colorMatch ? colorMatch[1] : "";

        if (trimmedLine.startsWith("Wearable(")) {
          currentGiftItem = {
            type,
            size,
            color,
          };
        } else {
          // Assuming Literary type
          const titleMatch = /title: "(.*?)"/.exec(trimmedLine);
          const authorMatch = /author: "(.*?)"/.exec(trimmedLine);

          if (titleMatch && authorMatch) {
            const title = titleMatch[1];
            const author = authorMatch[1];
            currentGiftItem = { type, size, title, author };
          }
        }
      }
    }

    if (currentGiftItem && trimmedLine.endsWith("}")) {
      // End of Wearable or Literary block
      gift.items.push(currentGiftItem);
      currentGiftItem = null;
    }
  }

  return gift;
}
