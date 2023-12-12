// Tutaj skopiuj testy dla zadania. Uruchom je poleceniem `npm test`
import { conductInterviews } from "./index";

test("main functionality - process multiple messages within timeout", async () => {
  const messages = ["Message1", "Message2", "Message3"];
  const processMessage = jest.fn((message: string) =>
    Promise.resolve(`Processed: ${message}`)
  );
  const result = await conductInterviews(messages, processMessage, 100);
  expect(result).toEqual([
    "Processed: Message1",
    "Processed: Message2",
    "Processed: Message3",
  ]);
  expect(processMessage).toHaveBeenCalledTimes(3);
});

test("edge case - skip messages that exceed timeout", async () => {
  const messages = ["FastMessage", "SlowMessage", "FastMessage2"];
  const processMessage = jest.fn((message: string): Promise<string> => {
    return message.startsWith("Slow")
      ? new Promise((resolve) =>
          setTimeout(() => resolve(`Processed: ${message}`), 200)
        )
      : Promise.resolve(`Processed: ${message}`);
  });
  const result = await conductInterviews(messages, processMessage, 100);
  expect(result).toEqual(["Processed: FastMessage", "Processed: FastMessage2"]);
  expect(processMessage).toHaveBeenCalledTimes(3);
});

test("error handling - return error message for failed processing", async () => {
  const messages = ["Message1", "InvalidMessage", "Message3"];
  const processMessage = jest.fn((message: string) => {
    if (message === "InvalidMessage") {
      return Promise.reject(new Error("Invalid message format"));
    }
    return Promise.resolve(`Processed: ${message}`);
  });
  const result = await conductInterviews(messages, processMessage, 100);
  expect(result).toEqual([
    "Processed: Message1",
    "Error: Invalid message format",
    "Processed: Message3",
  ]);
  expect(processMessage).toHaveBeenCalledTimes(3);
});
