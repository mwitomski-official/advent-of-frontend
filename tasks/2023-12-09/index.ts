// Tutaj skopiuj kod zadania
// ? Day 9
// Mikołaj dokonuje ostatniego przeglądu ekwipunku, który pozwoli mu przebyć świąteczną podróż.
// W tym celu podążą za ściśle określonym protokołem,
// według którego każdy zabierany w podróż sprzęt zostanie sprawdzony pod kątem włączenia, wymiany i usunięcia z sań.
// Niestety, czas nagli, a Mikołaj nie jest pewien, czy uda mu się wykonać wszystkie operacje na czas.
// Czy możesz zautomatyzować proces weryfikacji ekwipunku?

// The Tool interface now has
// - init(),
// - update(),
// - and dispose()
// methods, reflecting the typical lifecycle of tools.
// * -------------------- Duck typing | Structural typing --------------------
// ? TypeScript doesn't rely on explicit interface implementation checks as some other languages might;
// ? instead, it checks for the presence of the required properties or methods.

export interface Tool {
  init(): void;
  update(): void;
  dispose(): void;
}

export class Equipment {
  private tools: Tool[] = [];
  private initIndexes = new Set<number>();

  /**
   * Register a tool with the equipment.
   * @param tool - The tool to register.
   * @returns The [index] at which the tool is registered.
   */
  // * The registerTools method adds a tool to the array and returns its index.
  registerTools(tool: Tool): number {
    this.tools.push(tool);
    return this.tools.indexOf(tool);
  }

  // * The initializeTools, updateTools, and disposeTools methods
  // * perform their respective actions on all registered tools.
  /**
   * Initialize all registered tools.
   * @returns The total number of initialized tools.
   */
  initializeTools(): number {
    this.tools.forEach((tool, index) => {
      tool.init();
      this.initIndexes.add(index);
    });
    return this.tools.length;
  }

  /**
   * Update all initialized tools.
   * @throws Error if called before initialization.
   * @returns The total number of updated tools.
   */
  // * The updateTools method now throws an error if called before initialization.
  updateTools(): number {
    this.tools.forEach((tool, index) => {
      if (!this.initIndexes.has(index)) {
        throw new Error("Cannot update any tools before initialization.");
      }

      tool.update();
    });
    return this.tools.length;
  }

  /**
   * Dispose of all initialized tools.
   * @returns The total number of disposed tools.
   */
  disposeTools(): number {
    this.tools.forEach((tool) => tool.dispose());
    this.tools = []; // Clear the list of tools after disposal
    return this.tools.length;
  }
}
