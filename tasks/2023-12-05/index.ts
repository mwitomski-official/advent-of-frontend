//? Tutaj skopiuj kod zadania
//? Day 5
//? -----------------------------------------------------------------------
// Zespół Świętego Mikołaja napotkał niezwykłe wyzwanie. Otóż, jedna z maszyn w pracowni, odpowiedzialna za koordynowanie pracy elfów i rozdział prezentów, przestała działać.
// Ta maszyna to nic innego jak zaawansowany system zdarzeń, który informuje elfy o zmianach w liście prezentów i priorytetach dostaw.
// W związku z tym, Mikołaj musi szybko znaleźć sposób na naprawę systemu zdarzeń, aby wszystko wróciło do normy i prezenty zostały dostarczone na czas.
// Programiści będą musieli napisać nową implementację mechanizmu emitującego zdarzenia aby system do obsługi prezentów zaczął działać poprawnie.
// Link: https://www.opanujfrontend.pl/advent/2023-12-05
//* -------------------- Emitter --------------------
//? Here's a breakdown of how it works:
//
//? When a callback function is subscribed to an event using the on method,
//? the event name is used as a key, and the corresponding callback function is added to the array of subscribers for that event.
//
//? When the emit method is called for a specific event, the eventSubscribers map is checked to see if there are subscribers for that event.
//? If subscribers exist, the emit method iterates through the array of callback functions and invokes each one.

import { Logger } from "../common/logs/logger";

export class ChristmasEmitter {
  // ? A map to store event subscriptions
  // ? -------------------- Explanation
  // ? `Map` - This is a built-in JavaScript/TypeScript data structure that stores key-value pairs.
  // ? -> In this case, it is used to associate events (keys) with an array of callback functions (values).
  //
  // ? `string` - The keys of the map are expected to be strings, representing the names of events.
  // ? -> For example, 'letter' or 'gift'.
  //
  // ? `Array<() => void>` - The values associated with each key are arrays of callback functions.
  // ? The callback functions are expected to take no arguments and have a return type of void.
  // ? These functions represent the actions to be executed when a particular event occurs.
  //
  // ? `= new Map();` - The values associated with each key are arrays of callback functions.
  // ? The callback functions are expected to take no arguments and have a return type of void.
  // ? These functions represent the actions to be executed when a particular event occurs.

  eventSubscribers: Map<string, Array<() => void>> = new Map();
  logger: Logger;

  constructor() {
    this.logger ??= new Logger("05");
    this.logger.log("-------------------- Emitter --------------------");
  }

  // Subscribe a callback function to a specific event
  on(eventKey: string, callback: () => void): void {
    // Check if the event already has subscribers
    // ? -------------------- Explanation
    // ? this.eventSubscribers.set(eventKey, []):
    // ? - If the key does not exist (i.e., the condition is true), this line creates a new entry in the eventSubscribers map.
    // ? - It associates the specified key (eventKey) with an empty array ([]).
    // ? - This is done to initialize the array of subscribers for the event if it doesn't exist yet.
    if (!this.eventSubscribers.has(eventKey)) {
      this.eventSubscribers.set(eventKey, []);

      this.logger.log(
        `Initialized subscribers for event '${eventKey}':` +
          this.eventSubscribers.get(eventKey)
      );
    }
    // Add the callback to the list of subscribers for the event
    // ? -------------------- Explanation
    // ? Here, this.eventSubscribers.get(eventKey) returns an Array<() => void> | undefined
    // ? because the get method of a Map returns the value associated with the specified key, or undefined if the key is not found.
    //
    // ? The ! at the end asserts to the TypeScript compiler that the result of this.eventSubscribers.get(eventKey) is non-null.
    // ? This is used in situations where you, as the developer, know that the value will not be null or undefined at runtime.
    this.eventSubscribers.get(eventKey)!.push(callback);
    this.logger.log(`Added subscriber for event '${eventKey}':` + callback);
  }

  // Unsubscribe a callback function from a specific event
  off(eventKey: string, callback: () => void): void {
    // Check if the event has subscribers
    if (this.eventSubscribers.has(eventKey)) {
      this.logger.log(
        `Before removal: Subscribers for event '${eventKey}':` +
          this.eventSubscribers.get(eventKey)
      );

      // Remove the callback from the list of subscribers for the event
      // ? -------------------- Explanation
      // ? .filter((cb) => cb !== callback):
      // ? - The filter method is a built-in array method in JavaScript/TypeScript.
      // ? - It creates a new array by filtering out elements that do not satisfy the given condition.
      // ? - In this case, it creates a new array that includes all callbacks except the one specified by callback.
      //
      // ? this.eventSubscribers.set(event, ...) :
      // ? - This part sets the updated array of callbacks back into the eventSubscribers map, associating it with the specified event.
      // ? - It effectively replaces the existing array of callbacks with the new filtered array that does not include the specified callback.
      //
      // ? So, while it may look like a "remove" operation, it's more accurately described as updating the list of subscribers by creating a new array without the specified callback.
      this.eventSubscribers.set(
        eventKey,
        this.eventSubscribers.get(eventKey)!.filter((cb) => cb !== callback)
      );

      this.logger.log(
        `After removal: Subscribers for event '${eventKey}':` +
          this.eventSubscribers.get(eventKey)
      );
    }
  }

  // Emit an event, calling all subscribed callback functions
  emit(eventKey: string): void {
    // Check if the event has subscribers
    if (this.eventSubscribers.has(eventKey)) {
      // Iterate through each subscriber and invoke the callback
      this.eventSubscribers.get(eventKey)!.forEach((callback) => {
        this.logger.log(
          `Emitting event '${eventKey}': Invoking subscriber:` + callback
        );
        callback();
      });
    } else {
      this.logger.log(`Emitting event '${eventKey}': No subscribers found.`);
    }
  }
}
