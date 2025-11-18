export class ClientIdGenerator {
  private static counter: number = 0;
  private _prefix: string;

  /**
   * Creates an instance of ClientIdGenerator.
   *
   * @param prefix An optional string prefix for the generated IDs (e.g., "PREFIX-").
   */
  constructor(prefix: string = "BQX_CLIENT_") {
    this._prefix = prefix;
  }

  /**
   * Generates a new unique client ID.
   * The ID will be in the format: [prefix][incrementing_number]
   * For example, if the prefix is "PREFIX-" and the counter is at 5, the ID will be "PREFIX-5".
   *
   * @returns A string representing the unique client ID.
   */
  public generateId(): string {
    ClientIdGenerator.counter++;

    return `${this._prefix}${ClientIdGenerator.counter}`;
  }

  /**
   * Resets the internal counter.
   * Use with caution, as resetting the counter can lead to duplicate IDs if not managed properly.
   * This is generally useful for testing or specific application states where ID uniqueness is not paramount
   * across application restarts or long-running processes.
   */
  public static resetCounter(): void {
    ClientIdGenerator.counter = 0;

    // eslint-disable-next-line no-console
    console.warn(
      "Client ID generator counter has been reset. Use with caution to avoid duplicate IDs.",
    );
  }

  /**
   * Gets the current value of the internal counter.
   *
   * @returns The current counter value.
   */
  public static getCurrentCounter(): number {
    return ClientIdGenerator.counter;
  }
}
