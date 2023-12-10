// Tutaj skopiuj kod zadania
//? Day 6
//? -----------------------------------------------------------------------
// Po naprawie systemu zdarzeń zespół elfów zaczął uzyskiwać informacje o nowych zamówieniach,
// ale część maszyn na produkcji nadal produkowała zabawki, które nie były już potrzebne.
// Każdorazowa zmiana zamówienia wymagała ręcznej rekonfiguracji maszyn, co było bardzo czasochłonne.
// Mikołaj postanowił zatrudnić Ciebie, abyś pomógł mu wdrożyć bardziej scentralizowany system zarządzania produkcją.
// Powinien on na bieżąco informować wszystkie maszyny o zmianach w zamówieniach, a także przekazywać im informacje o tym,
// jakie zabawki mają produkować. Tylko jak to zrobić, kiedy maszyny nie są ze sobą połączone?
//* -------------------- The observer pattern --------------------
// Define an observer interface
interface Observer {
  update(newState: string): void;
}

export class Machine implements Observer {
  private orders: { orderNumber: number; state: string }[] = [];
  private orderCounter = 1;
  state: string | null = null;

  // List of observers subscribed to this machine
  private observers: Observer[] = [];

  // Implement the update method from the Observer interface
  update(newState: string): void {
    this.state = newState;
    // console.log(`Machine updated. New state: ${this.state}`);
  }

  setState(newState: string): void {
    this.orders.push({ orderNumber: this.orderCounter++, state: newState });
    this.state = newState;
    this.notifyObservers(newState);
  }

  // Subscribe an observer to this machine
  subscribe(observer: Observer): void {
    this.observers.push(observer);
    observer.update(this.state!); // Initial update for the current state
  }

  // Unsubscribe an observer from this machine
  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  // Notify all subscribed observers about a state change
  private notifyObservers(newState: string): void {
    this.observers.forEach((observer) => {
      observer.update(newState);
    });
  }

  // Perform machine auditing and return a list of orders with their states
  performAudit(): string[] {
    return this.orders.map(
      (order) => `Order #${order.orderNumber} - ${order.state}`
    );
  }
}

export class OrderController implements Observer {
  private machines: Machine[] = [];

  update(newState: string): void {
    // console.log(`OrderController updated. New state: ${newState}`);
  }

  // Register a machine with the controller
  registerMachine(machine: Machine): void {
    this.machines.push(machine);

    // Subscribe machine as an observer
    machine.subscribe(this);
  }

  // Unregister a machine from the controller
  unregisterMachine(machine: Machine): void {
    this.machines = this.machines.filter((m) => m !== machine);
  }

  // Set the state of the controller and notify all registered machines
  setState(newState: string): void {
    if (!this.isValidState(newState)) {
      throw new Error("Invalid state provided");
    }

    // Set the state for all machines
    this.machines.forEach((machine) => {
      machine.setState(newState);
    });
  }

  // Check if the provided state is valid
  private isValidState(state: string): boolean {
    // Implement logic to check if the state is valid
    // For simplicity, let's assume any non-empty string is valid
    return state.trim() !== "" && state.trim() !== "unknown";
  }
}
