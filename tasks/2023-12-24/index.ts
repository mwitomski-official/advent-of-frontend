// Tutaj skopiuj kod zadania
// ? Day 24 🎄
// Święta tuż tuż! Aby nie tracić czasu, cały zespół odpowiedzialny za dostarczanie prezentów rozpoczął prace nad nowym systemem,
// który pozwoli na szybsze wdrażanie prezentów w kolejnym roku.
// Mikołaj wiedział, że potrzebuje nowego, bardziej elastycznego rozwiązania, które pozwoli na szybkie aktualizowanie stanu listy i jej szablonu,
// bez konieczności oczekiwania na pomoc elfów-programistów.
// Ponadto, chciał, aby nowy system był łatwy w obsłudze i pozwalał na dodawanie stylów, które będą odzwierciedlone w szablonie.
// Mikołaj zwrócił się więc z prośbą do ciebie, abyś podjął to wyzwanie i stworzył podstawy nowoczesnego front-endowego frameworka,
// który pomoże w zarządzaniu listą prezentów na rok 2024!
// * -------------------------------------------- Render generator --------------------------------------------
// Abstract Component class
abstract class Component {
  state: Record<string, any> = {};
  style: string | null = null;

  constructor(state: Record<string, any> = {}, style: string | null = null) {
    this.state = state;
    this.style = style;
  }

  // Set state method
  setState(newState: Record<string, any>): void {
    this.state = { ...this.state, ...newState };
    this.render(); // Re-render the component when the state changes
  }

  // Render method
  abstract render(): string;
}

// Function to render a component to a string
function renderComponent(component: Component): string {
  return component.render();
}

export { Component, renderComponent };
