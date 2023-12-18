// Tutaj skopiuj kod zadania
// ? Day 18
// W ostatnim tygodniu przed Bożym Narodzeniem, Święty Mikołaj stanął przed niecodziennym wyzwaniem.
// Pomocnicy Mikołaja zgłosili, że w centralnym systemie zarządzania listami życzeń dzieci nastąpił ogromny wzrost ruchu.
// Na skutek tego, dostęp do bazy danych z życzeniami zagroził przeciążeniem systemu.
// Święty Mikołaj postanowił, że potrzebny jest algoritm limitowania ruchu do systemu,
// aby każde dziecko miało sprawiedliwą szansę na złożenie swojego zamówienia do Świętego.
// Algorytm miał gwarantować, że w określonej jednostce czasu, tylko pewna liczba prób dostępu będzie przetwarzana,
// a wszystkie nadmiarowe próby zostaną odrzucone lub odłożone do późniejszego czasu.
// Właśnie ty, jako doświadczony inżynier oprogramowania, zostałeś poproszony, byś zaprojektował
// i wdrożył niezawodny system limitowania ruchu, który zadba o równowagę obciążenia w systemie.

// * RateLimiter class should limit the rate of requests based on the specified maximum requests and interval.

export class RateLimiter {
  private maxRequests: number;
  private intervalMs: number;
  private lastAccessTime: number;
  private requestCount: number;

  /**
   * Creates a new RateLimiter instance.
   * @param maxRequests The maximum number of requests allowed within the specified interval.
   * @param intervalMs The interval (in milliseconds) during which the maximum number of requests is allowed.
   */
  constructor(maxRequests: number, intervalMs: number) {
    this.maxRequests = maxRequests;
    this.intervalMs = intervalMs;
    this.lastAccessTime = 0;
    this.requestCount = 0;
  }

  /**
   * Attempts to access the resource while respecting the rate limit.
   * @returns True if the access is allowed within the rate limit, false otherwise.
   */
  attemptAccess(): boolean {
    const currentTime = Date.now();

    // If the interval has passed since the last access, reset the request count
    if (currentTime - this.lastAccessTime >= this.intervalMs) {
      this.requestCount = 0;
    }

    // Check if the request count is within the limit
    if (this.requestCount < this.maxRequests) {
      this.requestCount++;
      this.lastAccessTime = currentTime;
      return true;
    }

    return false;
  }
}
