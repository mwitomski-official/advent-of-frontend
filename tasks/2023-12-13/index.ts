// Tutaj skopiuj kod zadania

// ? Day 13
// Aplikacja do wymiany wiadomości, z której korzysta całe biuro Świętego Mikołaja, ma jedną istotną wadę - nie zawsze aktualizuje się poprawnie.
// Kiedy pracownicy korzystają z różnych wersji aplikacji, mogą wysyłać i otrzymywać błędnie sformatowane wiadomości.
// Tak przydarzyło się i tym razem, kiedy wiadomości od podróżującego Mikołaja zaczęły docierać do Elfów w nietypowym formacie.
// Każda z nich składa się z dwóch fragmentów, które dodatkowo wyglądają na zaszyfrowane. Pomóż Elfom odczytać wiadomości i przywróć świąteczny porządek.
// * -------------------------------------------- Encoding --------------------------------------------
/**
 * Decodes a message template by replacing placeholders with values from a given object.
 * @param template The message template containing placeholders.
 * @param values An object containing key-value pairs for replacing placeholders in the template.
 * @returns The decoded message with replaced placeholders.
 */
export function decodeMessage(
  template: string,
  values: Record<string, string>
): string {
  // Regular expression to match placeholders in the template
  const placeholderRegex = /\{\{\s*([\w.-]+)\s*\}\}/g;

  /**
   * Replaces placeholders in the template with their corresponding values.
   * @param match The full match, including the placeholder.
   * @param key The key extracted from the placeholder.
   * @returns The replacement value for the placeholder.
   */
  const replacePlaceholders = (match: string, key: string): string => {
    // Check if the key exists in the values object
    if (values.hasOwnProperty(key)) {
      // Not recognized
      if (
        !values[key].startsWith("b64:") &&
        !values[key].startsWith("uri:") &&
        !values[key].startsWith("c13:")
      )
        return "";

      // If the value is encoded using base64, decode it
      if (values[key].startsWith("b64:")) {
        return Buffer.from(values[key].substring(4), "base64").toString(
          "utf-8"
        );
      }
      // If the value is encoded using uri, decode it
      if (values[key].startsWith("uri:")) {
        return decodeURIComponent(values[key].substring(4));
      }
      // If the value is encoded using c13, replace each letter with the next one in the alphabet (rot13)
      if (values[key].startsWith("c13:")) {
        return values[key].substring(4).replace(/[a-z]/gi, (char) => {
          const code = char.charCodeAt(0);
          const offset = code >= 97 ? 97 : 65; // Set offset based on lowercase or uppercase
          return String.fromCharCode(((code - offset - 13 + 26) % 26) + offset);
        });
      }
      // If the value is not encoded, return it as is
      return values[key];
    }
    // If the key is not present in the values object, return an empty string
    return "";
  };

  // Replace placeholders in the template using the replacePlaceholders function
  const result = template.replace(placeholderRegex, replacePlaceholders);

  return result;
}
