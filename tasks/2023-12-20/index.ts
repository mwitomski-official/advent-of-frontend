// Tutaj skopiuj kod zadania
// ? Day 20
// W ostatnim tygodniu przed świętami Mikołaj napotkał kolejny problem.
// W jego magicznej fabryce zabawek, maszyny zaczęły działać w nieprzewidywalny sposób,
// a informacje o prezentach były przesyłane w chaotycznej kolejności.
// Mikołaj potrzebował sposobu, aby zarządzać tym strumieniem informacji i je uporządkować.
// "Mapowanie, pomijanie i branie określonej liczby prezentów z listy - to by rozwiązało mój problem!"
// Czasu było niewiele, a wyzwanie wydawało się trudne.
// Czy ktoś mógłby mu pomóc zanim nadejdą święta?
// * -------------------------------------------- Array Operations --------------------------------------------
// ? Explanation
// This implementation provides methods for mapping, skipping, taking, and retrieving the gifts from the stream.
// Each method returns a new GiftStream instance with the modified items,
// allowing for method chaining as demonstrated in the tests.

export class GiftStream<T> {
  private items: T[];

  constructor(items: T[]) {
    this.items = items;
  }

  /**
   * Maps each item in the stream to a new value using the provided mapper function.
   * @param mapper The function used to map each item.
   * @returns A new GiftStream with the mapped items.
   */
  map<U>(mapper: (value: T) => U): GiftStream<U> {
    return new GiftStream<U>(this.items.map(mapper));
  }

  /**
   * Skips the specified number of items from the beginning of the stream.
   * @param count The number of items to skip.
   * @returns A new GiftStream with the skipped items.
   */
  skip(count: number): GiftStream<T> {
    return new GiftStream<T>(this.items.slice(count));
  }

  /**
   * Takes the specified number of items from the beginning of the stream.
   * @param count The number of items to take.
   * @returns A new GiftStream with the taken items.
   */
  take(count: number): GiftStream<T> {
    return new GiftStream<T>(this.items.slice(0, count));
  }

  /**
   * Retrieves the items from the stream.
   * @returns An array containing the items in the stream.
   */
  getGifts(): T[] {
    return this.items;
  }
}
