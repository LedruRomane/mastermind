export default class ForbiddenError extends Error {
  // @ts-expect-error Never read for linter (meh)
  private previous?: Error;

  constructor(message: string | null = null, previous?: Error) {
    super(message ?? 'Forbidden access');

    this.name = 'ForbiddenError';
    this.previous = previous;
  }
}
