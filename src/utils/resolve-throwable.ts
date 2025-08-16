type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E extends Error = Error> = Promise<Success<T> | Failure<E>>;

export const resolveThrowable = async <
  E extends Error,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  F extends (...args: any[]) => any,
>(
  throwableFn: F,
): Result<Awaited<ReturnType<F>>, E> => {
  type T = Awaited<ReturnType<F>>;

  try {
    const data = (await throwableFn()) as T;

    return { data, error: null };
  } catch (err) {
    return { data: null, error: err as E };
  }
};
