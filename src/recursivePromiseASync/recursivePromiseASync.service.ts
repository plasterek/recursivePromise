export async function recursivePromiseASync<T>(promisesArray: Array<() => Promise<T>>): Promise<Array<T>> {
  if (promisesArray.length === 0) {
    return [];
  } else {
    const [first, ...rest]: (() => Promise<T>)[] = promisesArray;
    const result: Awaited<T> = await first()
      .then((data) => data)
      .catch((err) => err);
    const remaining: T[] = await recursivePromiseASync(rest);
    return [result, ...remaining];
  }
}
