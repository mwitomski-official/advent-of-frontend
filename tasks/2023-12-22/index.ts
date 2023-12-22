// Tutaj skopiuj kod zadania
// ? Day 22
// W fabryce Mikołaja jeden z zespołów zajmuje się tłumaczeniem listów nadchodzacych z całego świata.
// Jest to przydatne szczególnie wtedy, kiedy okresowo zmienia się slang, zestaw emoji lub format tekstu,
// którego Mikołaj nie do końca rozumie. Niestety, w tym roku poziom skomplikowania listów jest tak duży, że zespół nie nadąża z ich formatowaniem.
// Mikołaj potrzebuje Twojej pomocy! Czy jesteś w stanie napisać nowy, modularny procesor tekstu,
// który będzie od teraz otwarty na rozszerzenia i gotowy na przyszłe warianty listów od dzieci?
// * -------------------------------------------- Text Processor --------------------------------------------
// ? Explanation
// ? Given the tests you've provided, the TextProcessingPlugin should define a method,
// ? say process, which will transform the input text based on the specific plugin's logic.

// Define the interface for text processing plugins
export interface TextProcessingPlugin {
  process(text: string): string;
}

// Implement a plugin that removes specified words from the text
export class RemoveWordsPlugin implements TextProcessingPlugin {
  private wordsToRemove: string[];

  constructor(wordsToRemove: string[]) {
    this.wordsToRemove = wordsToRemove;
  }

  process(text: string): string {
    return this.wordsToRemove.reduce((processedText, word) => {
      return processedText.replace(new RegExp(word, "gi"), "");
    }, text);
  }
}

// Implement a plugin that replaces characters in the text
export class ReplaceCharsPlugin implements TextProcessingPlugin {
  private replacements: { [key: string]: string };

  constructor(replacements: { [key: string]: string }) {
    this.replacements = replacements;
  }

  process(text: string): string {
    return Object.entries(this.replacements).reduce(
      (processedText, [char, replacement]) => {
        return processedText.replace(new RegExp(char, "gi"), replacement);
      },
      text
    );
  }
}

// Implement a plugin that converts markdown to HTML
export class MarkdownToHtmlPlugin implements TextProcessingPlugin {
  process(text: string): string {
    // Very basic conversion, not full markdown support
    return (
      text
        // Convert **text** to <strong>text</strong>
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        // Convert *text* to <em>text</em>
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
    );
  }
}

// TextProcessor class to manage and apply plugins
export class TextProcessor {
  private plugins: TextProcessingPlugin[] = [];

  use(plugin: TextProcessingPlugin): void {
    this.plugins.push(plugin);
  }

  process(text: string): string {
    return this.plugins.reduce((processedText, plugin) => {
      return plugin.process(processedText);
    }, text);
  }
}

// Implement a plugin that removes extra spaces from the text
export class RemoveExtraSpacesPlugin implements TextProcessingPlugin {
  process(text: string): string {
    // Replace multiple spaces with a single space and trim leading/trailing spaces
    return text.replace(/\s+/g, " ").trim();
  }
}
