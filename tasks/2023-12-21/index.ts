// Tutaj skopiuj kod zadania
// ? Day 21
// Napięty grafik na kilka dni przed świętami powoduje mnóstwo stresu.
// Zespół elfów odpowiedzialny za produkcję zabawek nie radzi sobie z ilością pracy,
// więc część pracowników zaczyna omijać procesy i improwizować.
// Wszystko to powoduje, że jakość zabawek w tym kluczowym okresie spada.
// Mikołaj, aby zapobiec dalszemu pogorszeniu sytuacji, postanawia zatrudnić kogoś,
// kto rozwiązywał w przeszłości takie problemy.
// Nowy inżynier jakości postanawia wdrożyć politykę odwróconych zależności -
// zamiast pozwalać elfom tworzyć narzędzia i zabawki na własną rękę,
// będą oni korzystać z jednego wspólnego kontenera "dobrych praktyk i rekomendacji".
// Tylko w ten sposób można zapewnić, że wszystkie zabawki będą spełniać wymagania jakościowe.
// * -------------------------------------------- Factory Injector --------------------------------------------

// ? Explanation
// ! [InjectionToken] ->
// ▶ This is a class that represents a unique token.
// ▶ It can be used to retrieve a specific dependency from the injector.
// ! [FactoryInjector] ->
//  ▶ [registry]: A map to store registered classes or values.
//  ▶ [registerClass]: Registers a class with the injector.
//     When a class is registered, the injector knows how to create an instance of that class when it's requested.
//  ▶ [provideValue]: Allows providing a direct value for a given token.
//  ▶ [get]: Retrieves a dependency based on the token. If the dependency is a class, it creates a new instance
//  (if not already created) and returns it. If the dependency is a value, it returns the stored value.

// * Define a token that represents a dependency
export class InjectionToken<T> {
  // A description can be provided for debugging or logging purposes.
  constructor(public readonly description: string) {}
}

// * FactoryInjector manages the creation and retrieval of dependencies
export class FactoryInjector {
  // Store registered classes or values
  private registry: Map<any, any> = new Map();

  // Register a class with the injector
  registerClass<T>(clazz: new (...args: any[]) => T): void {
    // Instantiate the class
    const instance = new clazz();
    // Store the instance
    this.registry.set(clazz, instance);
  }

  // Provide a value directly
  provideValue<T>(token: InjectionToken<T>, value: T): void {
    // Store the value associated with the token
    this.registry.set(token, value);
  }

  // Retrieve an instance based on a token
  get<T>(token: InjectionToken<T> | (new (...args: any[]) => T)): T {
    const entry = this.registry.get(token);

    if (entry === undefined) {
      throw new Error(`No provider found for ${token}`);
    }

    // If the entry is a class, instantiate it
    if (entry instanceof Function) {
      // Instantiate the class
      const instance = new entry();
      // Cache the instance for future use
      this.registry.set(token, instance);
      return instance;
    }

    // Otherwise, return the stored value
    return entry;
  }
}
