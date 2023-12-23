// Tutaj skopiuj kod zadania
// ? Day 23
// W noc przed Wigilią, Święty Mikołaj zorientował się, że ma problem z weryfikacją listów od dzieci.
// Każdy list jest w formacie JSON i musi spełniać różne schematy w zależności od kraju pochodzenia.
// Mikołaj postanowił, że potrzebuje systemu do dynamicznego generowania schematów weryfikacji,
// który będzie elastyczny i pozwoli na szybkie dostosowywanie do różnorodnych wymagań.
// System ten musi być gotowy w ciągu dwóch dni, aby Mikołaj mógł sprawdzić wszystkie listy przed rozdaniem prezentów.

// Zadanie polega na stworzeniu generatora schematów w TypeScript,
// który pozwoli Mikołajowi na sprawne zarządzanie listami i zapewnienie, że żadne dziecko nie zostanie pominięte.
// * -------------------------------------------- Schema generator in TypeScript --------------------------------------------
export type JsonSchema = {
  type: string;
  properties?: Record<string, JsonSchema>;
  required?: string[];
  items?: JsonSchema;
  nullable?: boolean;
};

export const generateSchema = (schemaDefinition: JsonSchema): JsonSchema => {
  return schemaDefinition;
};

export const validate = (schema: JsonSchema, jsonObject: any): boolean => {
  // If the JSON object is null or undefined
  if (jsonObject == null) {
    return schema.nullable === true;
  }

  // Validate based on the type
  switch (schema.type) {
    case "object":
      // Ensure it's an object
      if (
        typeof jsonObject !== "object" ||
        jsonObject === null ||
        Array.isArray(jsonObject)
      ) {
        return false;
      }

      // Check required properties
      if (schema.required) {
        for (const propName of schema.required) {
          if (!(propName in jsonObject)) {
            return false;
          }
        }
      }

      // Validate each property
      if (schema.properties) {
        for (const [key, propSchema] of Object.entries(schema.properties)) {
          if (!validate(propSchema, jsonObject[key])) {
            return false;
          }
        }
      }
      return true;

    case "array":
      // Ensure it's an array
      if (!Array.isArray(jsonObject)) {
        return false;
      }

      // Validate each item in the array
      if (schema.items) {
        for (const item of jsonObject) {
          if (!validate(schema.items, item)) {
            return false;
          }
        }
      }
      return true;

    case "string":
      return typeof jsonObject === "string";

    case "number":
      return typeof jsonObject === "number";

    // Add more cases for other types as needed

    default:
      return false;
  }
};
