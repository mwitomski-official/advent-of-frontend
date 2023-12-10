//? Tutaj skopiuj kod zadania
//? Day 4
//? -----------------------------------------------------------------------
/* 
Przygotowując się do najważniejszego okresu w roku Święty Mikołaj zauważył, 
że jego pomocnicy tracą dużo czasu na powtarzanie tych samych operacji 
przy obliczaniu trajektorii lotu sań z prezentami. 
Aby zoptymalizować pracę, Mikołaj postanowił wprowadzić poprawkę algorytmu, 
która pozwoli na przechowywanie i ponowne wykorzystanie wyników obliczeń. 
Niestety, nikt z zespołu elfów nie potrafił zaimplementować takiej funkcjonalności. 
Pomóż Mikołajowi i jego pomocnikom w rozwiązaniu tego problemu.
*/
//* -------------------- Memoization | Cache --------------------

//* ▶ Cache Size Limit (maxSize):
// The maxSize option allows you to limit the size of the cache to prevent it from growing indefinitely.
//* ▶ Clear Cache Function (clearCache):
// A clearCache function is added to the memoized function, allowing you to manually clear the cache when needed.
//* ▶ Key Generation Function (generateKey):
// A generateKey function is introduced to create a unique key for each set of function arguments.
// It ensures proper handling of complex arguments by using JSON.stringify for objects.

type MemoizedFunction<T extends (...args: any[]) => any> = T & {
  clearCache: () => void;
};

interface MemoizeOptions {
  maxSize?: number;
}

export function memoize<T extends (...args: any[]) => any>(
  func: T,
  options: MemoizeOptions = {}
): MemoizedFunction<T> {
  // Check if the provided argument is a function
  if (typeof func !== "function") {
    throw new Error("Function to be memoized must be a function.");
  }

  // Cache to store memoized results
  const cache = new Map<string, ReturnType<T>>();

  // Maximum size of the cache to prevent it from growing indefinitely
  const maxSize = options.maxSize || Number.POSITIVE_INFINITY;

  // The main memoized function
  const memoizedFunction = ((...args: Parameters<T>): ReturnType<T> => {
    // Generate a unique key based on the function arguments
    const key = generateKey(args);

    // If the result is already in the cache, return it
    if (cache.has(key)) {
      // Log that the result was retrieved from the cache
      // console.log(`▶ Cache hit for key: ${key}`);
      return cache.get(key)!;
    }

    // Log that the original function is being called
    // console.log(`▶ Calling original function for key: ${key}`);

    // Call the original function if the result is not in the cache
    const result = func(...args);

    // Manage the cache size by evicting the oldest entry if the limit is reached
    if (cache.size >= maxSize) {
      const oldestKey = cache.keys().next().value;

      // Log that an entry is being evicted from the cache
      // console.log(`▶ Evicting cache entry for key: ${oldestKey}`);

      cache.delete(oldestKey);
    }

    // Cache the result and log the cache entry
    // console.log(`▶ Caching result for key: ${key}`);

    // Cache the result and return it
    cache.set(key, result);
    return result;
  }) as MemoizedFunction<T>;

  // Function to manually clear the cache
  memoizedFunction.clearCache = () => {
    // Log that the cache is being cleared
    // console.log("▶Clearing the cache");

    cache.clear();
  };

  // Return the memoized function with clearCache capability
  return memoizedFunction;
}

// Helper function to generate a unique key for function arguments
function generateKey(args: any[]): string {
  return args
    .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : arg))
    .join(",");
}
