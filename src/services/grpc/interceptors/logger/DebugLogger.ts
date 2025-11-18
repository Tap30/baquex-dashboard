import { isProduction } from "@constants/env";

export class DebugLogger {
  private _active: boolean = false;

  constructor() {
    this._active = !isProduction;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public log(...args: any[]): void {
    if (!this._active) return;

    // eslint-disable-next-line no-console, @typescript-eslint/no-unsafe-argument
    console.log("[GRPC-WEB-DEBUGGER]:", "\n", ...args);
  }

  public init(): void {
    if (typeof window === "undefined") return;

    Object.defineProperty(window, "DEBUG", {
      get: () => {
        return this._active;
      },
      set: (v: boolean) => {
        if (typeof v !== "boolean") {
          // eslint-disable-next-line no-console
          console.log(
            `[GRPC-WEB-DEBUGGER]: Expected boolean, received \`${String(v as unknown)}\`.`,
          );

          return;
        }

        if (v) {
          this._active = v;

          // eslint-disable-next-line no-console
          console.log("[GRPC-WEB-DEBUGGER]: Started!");

          return;
        }

        if (!v) {
          this._active = v;

          // eslint-disable-next-line no-console
          console.log("[GRPC-WEB-DEBUGGER]: Stopped!");

          return;
        }
      },
    });
  }
}
