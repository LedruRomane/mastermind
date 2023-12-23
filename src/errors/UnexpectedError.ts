export default class UnexpectedError extends Error {
  // @ts-expect-error Never read for linter (meh)
  private previous?: Error;

  constructor(message: string | null, previous?: Error) {
    super(message ?? 'An unexpected error occurred');

    this.name = 'UnexpectedError';
    this.previous = previous;
  }
}
