export default class NotFoundError extends Error {
  // @ts-expect-error Never read for linter (meh)
  private previous?: Error;

  constructor(message: string | null, previous?: Error) {
    super(message ?? 'Page not found');

    this.name = 'NotFound';
    this.previous = previous;
  }
}
