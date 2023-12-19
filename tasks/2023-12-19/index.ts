// Tutaj skopiuj kod zadania
// ? Day 19
// W ostatnim tygodniu przed Świętami, Święty Mikołaj zmaga się z nowym wyzwaniem.
// Jego warsztat pełen jest prezentów gotowych do dostarczenia dzieciom na całym świecie.
// Jednak ilość prezentów jest tak ogromna, że zwykłe metody organizacji zawiodły.
// Elfowie, chcąc ułatwić Mikołajowi zadanie, zaproponowali stworzenie magicznego systemu paginacji prezentów.
// System ten miałby umożliwić Mikołajowi przeglądanie prezentów partiami,
// zamiast wszystkich na raz, co znacznie przyspieszyłoby proces wyboru prezentów do dostarczenia.
// * -------------------------------------------- Pagination --------------------------------------------
// ? Explanation
/* 
 - > Calculate the starting index based on the pageNumber and itemsPerPage.
 - > Slice the items array to get the current page items.
 - > Calculate the total number of pages and total items.
 */
export function usePagination<T>(
  items: T[],
  itemsPerPage: number,
  pageNumber: number
): {
  currentPageItems: T[];
  totalPages: number;
  totalItems: number;
} {
  // Calculate the starting index for the current page
  const startIndex = (pageNumber - 1) * itemsPerPage;

  // Get the current page items using slicing
  const currentPageItems = items.slice(startIndex, startIndex + itemsPerPage);

  // Calculate the total number of pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return {
    currentPageItems,
    totalPages,
    totalItems: items.length,
  };
}
