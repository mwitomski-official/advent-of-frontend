import * as fs from "fs";

export class Logger {
  private logFilePath: string;

  constructor() {
    this.logFilePath = this.generateLogFilePath();
  }

  private generateLogFilePath(): string {
    const now = new Date();
    const dateString = now.toISOString().split("T")[0]; // Get YYYY-MM-DD
    return `tasks\\common\\logs\\log_${dateString}.txt`;
  }

  private getCurrentTimestamp(): string {
    const now = new Date();
    return now.toISOString();
  }

  public log(message: string): void {
    const logEntry = `[${this.getCurrentTimestamp()}] ${message.replace(
      /\t/g,
      ""
    )}\n`;

    fs.appendFileSync(this.logFilePath, logEntry, "utf-8");

    // You can also log to the console if needed
    // console.log(logEntry);
  }
}
