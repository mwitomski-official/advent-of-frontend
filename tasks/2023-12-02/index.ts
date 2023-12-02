//? Tutaj skopiuj kod zadania
//? Day 2
//? Święty Mikołaj ma problem. Jego renifery zauważyły, że listy od dzieci z całego świata nie są odpowiednio sortowane.
//? Listy powinny być uporządkowane według priorytetu, który jest wyrażony liczbą - im wyższa liczba, tym wyższy priorytet.
//? Mikołaj potrzebuje systemu, który pomoże mu szybko i efektywnie organizować listy, aby żadne życzenie nie zostało pominięte.
//? Renifery są ekspertami od logistyki, a nie od struktur danych, więc Mikołaj zwraca się o pomoc do programistów.
//? Czy jesteś w stanie stworzyć dla niego odpowiednią strukturę danych, która pomoże mu w sortowaniu listów? Czas ucieka!

//* --------------------  Priority Queue --------------------
//! A priority queue differs from regular queues that items get inserted with a priority
//! that determines when they will be returned by pop

import { Logger } from "../common/logs/logger";

interface IChristmasQueue<T> {
  enqueue(item: T, priority: number): void;
  dequeue(): T | undefined;
  size(): number;
  isEmpty(): boolean;
}

export class ChristmasQueue<T> implements IChristmasQueue<T> {
  private logger: Logger;
  private debug: boolean = true;
  private christmasStorage: [number, T][] = [];

  constructor() {
    this.logger ??= new Logger();
  }

  // Adds an item to the queue
  enqueue(item: T, prio: number): void {
    this.christmasStorage.push([prio, item]);
  }

  // Retrieves an item from the queue
  dequeue(): T | undefined {
    let l = this.logger;
    if (this.isEmpty()) throw new Error("There are no letters in the queue!");

    // 'reduce' - is used to find the index of the maximum element.
    const maxIndex = this.christmasStorage.reduce((maxIndex, item, index) => {
      let result =
        item[0] > this.christmasStorage[maxIndex][0] ? index : maxIndex;
      this.logReduce(maxIndex, index, item, result);
      return result;
    }, 0);

    // 'splice' - is used to remove the maximum element from the array
    const max = this.christmasStorage.splice(maxIndex, 1)[0];
    return max[1];
  }

  // Returns the size of the queue
  size(): number {
    return this.christmasStorage.length;
  }

  // Returns true if the queue is empty
  isEmpty(): boolean {
    return this.christmasStorage.length === 0;
  }

  private logReduce(
    maxIndex: number,
    index: number,
    item: any[],
    result: number
  ): void {
    if (this.debug) {
      this.logger.log(`
      ----------------------------------------------
      Max Index: ${maxIndex};
      [Index] - [Item]: [${index}] - [${item}]
      item[0] > this.christmasStorage[maxIndex][0] ? index : maxIndex; =>
      result = ${item[0]} > ${this.christmasStorage[maxIndex][0]} ? ${index} : ${maxIndex}
      result = ${result}
      ----------------------------------------------
      `);
    }
  }
}
