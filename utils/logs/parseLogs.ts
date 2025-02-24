import fs from 'fs/promises';
import path from 'path';

interface LogEntry {
  time: string;
  stock: string;
  rsi: number;
  price: number;
}

export async function getLogs(): Promise<LogEntry[]> {
  try {
    const logFilePath = path.join(process.cwd(), 'utils', 'logs', 'files', '2025-02-11.log');

    const logContent = await fs.readFile(logFilePath, 'utf-8');

    const logs = logContent.trim().split('\n');

    const parsedLogs: LogEntry[] = logs
      .map(log => {
        const match = log.match(/(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z) \[INFO\]: (\{.*\})/);
        if (!match) return null;

        const timestamp = match[1];
        const logData = JSON.parse(match[2]);

        return {
          time: new Date(timestamp).toISOString(),
          stock: logData.stock,
          rsi: parseFloat(logData.rsi),
          price: parseFloat(logData.price),
        };
      })
      .filter((entry): entry is LogEntry => entry !== null);

    return parsedLogs;
  } catch (error) {
    console.error('Error reading logs:', error);
    return [];
  }
}