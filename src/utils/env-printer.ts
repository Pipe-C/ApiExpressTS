import chalk from "chalk";
import { env } from "../config/env";

// Tipado seguro con unknown
function printObject(obj: Record<string, unknown>, indent = 0): void {
  const spacing = " ".repeat(indent);

  // Lista de palabras clave sensibles a enmascarar
  const SENSITIVE_KEYWORDS = ["password", "secret", "token", "database", "key", "auth"];

  for (const [key, value] of Object.entries(obj)) {
    const isSensitive = SENSITIVE_KEYWORDS.some((word) =>
      key.toLowerCase().includes(word)
    );

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      console.log(spacing + chalk.cyan.bold(`${key}:`));
      printObject(value as Record<string, unknown>, indent + 2);
    } else {
      // Enmascarar en lugar de omitir para saber que la variable fue cargada
      const displayValue = isSensitive
        ? chalk.red("[REDACTED]")
        : chalk.yellow(String(value));

      console.log(`${spacing}${chalk.green(key)} = ${displayValue}`);
    }
  }
}

export function printEnvironmentVariables(): void {
  // Ejecutar la impresión solo si está habilitado por configuración o en desarrollo
  if (!env.showEnv && !env.isDevelopment) {
    return;
  }

  console.log(chalk.blue.bold("\n📦 Application Configuration\n"));
  printObject(env as unknown as Record<string, unknown>);
  console.log("");
}