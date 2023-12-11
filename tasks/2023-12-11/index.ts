// Tutaj skopiuj kod zadania
// ? Day 11
// Mikołaj kontynuuje przygotowania do wyruszenia w podróż.
// Po pozbyciu się cykli, które mogły powodować niepotrzebne opóźnienia, postanowił zająć się planowaniem właściwej trasy.
// Okazało się jednak, że nagłe zmiany temperatur zamroziły urządzenia nawigujące.
// Wszystko, co pozostało, to mapa z zaznaczonymi punktami kontrolnymi, które Mikołaj może odwiedzić.
// Pomóż mu znaleźć najkrótszą trasę pomiędzy wybranymi odcinkami trasy tak, aby żadne dziecko nie czekało na prezent zbyt długo.
// * -------------------------------------------- Dijkstra's algorithm --------------------------------------------

/**
 * Represents a weighted graph where each node has a mapping to its neighbors with associated weights.
 */
export interface WeightedGraph {
  [key: string]: { [key: string]: number };
}

export function findShortestPath(
  graph: WeightedGraph,
  startNode: string,
  endNode: string
): string[] | null {
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const priorityQueue: string[] = Object.keys(graph);

  // Initialize distances with Infinity and set the distance for the start node to 0
  for (const node of priorityQueue) {
    distances[node] = Infinity;
    previous[node] = null;
  }
  distances[startNode] = 0;

  while (priorityQueue.length > 0) {
    // Extract the node with the smallest distance
    const currentNode = priorityQueue.reduce((minNode, node) =>
      distances[node] < distances[minNode] ? node : minNode
    );

    priorityQueue.splice(priorityQueue.indexOf(currentNode), 1);

    // Relaxation step
    for (const neighbor in graph[currentNode]) {
      const distanceToNeighbor =
        distances[currentNode] + graph[currentNode][neighbor];
      if (distanceToNeighbor < distances[neighbor]) {
        distances[neighbor] = distanceToNeighbor;
        previous[neighbor] = currentNode;
      }
    }
  }

  // Reconstruct the path
  const path: string[] = [];
  let current: string | null = endNode;
  while (current && current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  // Check if the distance to the end is still Infinity, indicating no path
  if (distances[endNode] === Infinity) {
    return null;
  }

  // Check if the endNode is unreachable (no valid path)
  if (!path.includes(startNode) || !path.includes(endNode)) {
    throw new Error("Invalid or non-existent route");
  }

  let result = distances[endNode] !== Infinity ? path : null;

  return result;
}
