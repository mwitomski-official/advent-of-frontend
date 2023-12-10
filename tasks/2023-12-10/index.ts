// Tutaj skopiuj kod zadania
// ? Day 10
// Po inspekcji sprzętu Mikołaj zauważył, że trasa dostarczania prezentów nie jest optymalna.
// Jego ścieżka przebiega przez wiele miast wielokrotnie, co wydłuża czas dostarczenia prezentów do dzieci.
// Santa postanowił rozwiązać problem wykrywania cykli na swojej drodze, aby zoptymalizować trasę
// i upewnić się, że każde miasto odwiedzany jest tylko raz.
// Pomóż Świętemu Mikołajowi w napisaniu rozszerzenia do systemu nawigacji, które wykryje cykle
// w jego ścieżkach i zaproponuje trasę bez zbędnych powtórzeń.
// * -------------------- Graph search --------------------
// ? -------------------- Explanation
// ? ▶  #1 Depth-First Search (DFS) [SELECTED]
// - DFS is a widely used algorithm for finding cycles in a graph.
// - The idea is to traverse the graph depth-first, and if you encounter a vertex that is already in the recursion stack,
//   then there is a cycle
// ? ▶ #2 Tarjan's Algorithm
// - Tarjan's algorithm is another algorithm for finding strongly connected components in a directed graph.
// - It can be adapted to find cycles in the graph
// ? ▶ #3 Breadth-First Search (BFS)
// - While BFS is typically used for finding shortest paths, it can also be adapted to detect cycles
// - If, during the BFS traversal, you encounter a vertex that is already visited and not the parent of the current vertex,
//   then there is a cycle
// ? ▶ #4 Union-Find (Disjoint Set Union)
// - Union-Find can be used to detect cycles in an undirected graph
// - It works by maintaining a set of disjoint sets and joining them as edges are processed.
//   If, at any point, you try to join two vertices that are already in the same set, then a cycle is detected.
// ? ▶ #5 Johnson's Algorithm
// - Johnson's algorithm can be used to find all simple cycles in a directed graph
// - It's based on the idea of maintaining a stack of vertices during the depth-first search.

type Graph = Record<string, string[]>;

export function findCyclesBetweenLocations(graph: Graph): string[][] {
  const visited: Record<string, boolean> = {};
  const cycles: string[][] = [];

  /**
   * Depth-first search to find cycles in the graph.
   * @param node Current node in the traversal.
   * @param stack Stack to keep track of the current path.
   */
  function dfs(node: string, stack: string[] = []) {
    if (stack.includes(node)) {
      // Found a cycle, add it to the result
      const cycleStart = stack.indexOf(node);
      const cycle = stack.slice(cycleStart);
      cycles.push(cycle.concat(cycle[0])); // Add the starting node to the end of the cycle
      return;
    }

    if (visited[node]) {
      return;
    }

    visited[node] = true;
    stack.push(node);

    const neighbors = graph[node] || [];
    for (const neighbor of neighbors) {
      dfs(neighbor, stack.slice());
    }
  }

  // Iterate through all nodes in the graph
  Object.keys(graph).forEach((node) => {
    if (!visited[node]) {
      dfs(node);
    }
  });

  // Check for missing nodes in the graph - sth is broken here
  for (const node in graph) {
    if (!visited[node]) {
      throw new Error(`Invalid graph: missing nodes`);
    }
  }

  return cycles;
}

/* 
? -------------------- Explanation
? Depth-First Search (DFS):
* Strengths: 
Simple and easy to implement. Works well for small to medium-sized graphs.
* Weaknesses: 
May not be optimal for very large graphs or graphs with specific structures.
* Considerations: 
If your graph is relatively small and doesn't have highly specific characteristics, DFS can be a good choice due to its simplicity.

? Tarjan's Algorithm:
* Strengths: 
Specifically designed for finding strongly connected components in a directed graph.
* Weaknesses: 
May have higher overhead for general cycle detection compared to simpler algorithms like DFS.
* Considerations: 
If you specifically need to find strongly connected components or have a graph with such characteristics, Tarjan's Algorithm could be a good fit.

? Breadth-First Search (BFS):
* Strengths: 
Effective for finding shortest paths and detecting cycles. Can work well for certain types of graphs.
* Weaknesses: 
May have limitations for very large graphs or graphs with specific structures.
* Considerations: 
BFS can be a good choice if you are interested in other properties of the graph, such as shortest paths, in addition to cycle detection.

? Union-Find (Disjoint Set Union):
* Strengths: 
Efficient for detecting cycles in undirected graphs. Used in Kruskal's algorithm for minimum spanning trees.
* Weaknesses: 
Primarily suited for undirected graphs. May have limitations for directed graphs.
* Considerations: 
If your graph is undirected and cycle detection is the primary concern, Union-Find can be efficient.

? Johnson's Algorithm:
* Strengths: 
Specifically designed for finding all simple cycles in a directed graph.
* Weaknesses: 
May have higher complexity compared to simpler algorithms.
* Considerations: 
If you need to find all simple cycles in a directed graph, Johnson's Algorithm is a specialized choice.
*/
