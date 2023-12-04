//? Tutaj skopiuj kod zadania
//? Day 3
//? -----------------------------------------------------------------------
/* 
    Mikołaj ma problem: w czasie podróży przez czasoprzestrzeń zgubił worek z prezentami! 
    Teraz musi szybko wyznaczyć, w którym punkcie czterowymiarowego kontinuum (x, y, z, czas) worek się znajduje. 
    Twoim zadaniem jest napisanie funkcji 'znajdzWorek', która przyjmie jako parametry listę potencjalnych lokalizacji 
    oraz obliczoną przez elfów 'mapę czasoprzestrzenną' w postaci matematycznej funkcji f(x, y, z, czas). 
    
    Funkcja 'znajdzWorek' powinna zwrócić lokalizację worka, dla której wartość mapy jest najwyższa. 
    Lokalizacje są obiektami z właściwościami x, y, z, czas, a mapa czasoprzestrzenna jest funkcją 
    przyjmującą te cztery współrzędne i zwracającą wartość liczbową. 
    
    Pamiętaj o obsłudze przypadków, gdy mapa nie zwróci żadnej wartości lub zwróci wartości niepoprawne matematycznie (np. NaN, Infinity).
*/
//? Helper: Metoda Array.reduce() w Praktyce - JavaScript by Overment - https://www.youtube.com/watch?v=L5hBo9J_HlU
//? -----------------------------------------------------------------------
//* -------------------- Reduce --------------------

export interface Lokalizacja {
  x: number;
  y: number;
  z: number;
  czas: number;
}

// Define a type named MapaCzasoprzestrzenna representing a function
// that takes four numbers (x, y, z, czas) and returns a number.
export type MapaCzasoprzestrzenna = (
  x: number,
  y: number,
  z: number,
  czas: number
) => number;

export function znajdzWorek(
  lokalizacje: Lokalizacja[],
  mapa: MapaCzasoprzestrzenna
): Lokalizacja | null {
  // Should return null when the list of locations is empty
  if (!lokalizacje || lokalizacje.length === 0) return null;

  // Should return null if we have any mathematically incorrect values
  if (!mapa || mapa.length === 0) return null;

  // If any item is less than 0 (0 values or '-' values) then it should return null
  if (
    lokalizacje.filter((item) => mapa(item.x, item.y, item.z, item.czas) <= 0)
      .length >= 1
  )
    return null;

  //? Def: 'Reduce' - is used to iterate through the 'lokalizacje' array
  //? and compare the results of the MapaCzasoprzestrzenna function for each element
  //* Note: That this assumes the array is not empty, and it initializes with the first element.
  const result = lokalizacje.reduce((maxLocation, currentLocation) => {
    const maxLocationSum = mapa(
      maxLocation.x,
      maxLocation.y,
      maxLocation.z,
      maxLocation.czas
    );

    const currentLocationSum = mapa(
      currentLocation.x,
      currentLocation.y,
      currentLocation.z,
      currentLocation.czas
    );

    return currentLocationSum > maxLocationSum ? currentLocation : maxLocation;
  }, lokalizacje[0]); // Initialize with the first element

  return result;
}
