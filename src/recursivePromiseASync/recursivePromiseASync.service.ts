export async function recursivePromiseASync<T>(promisesArray: Array<Promise<T>>): Promise<Array<T>> {
  if (promisesArray.length === 0) {
    return [];
  }
  let counter: number = 0;
  const [first, ...rest]: Promise<T>[] = promisesArray;
  try {
    const result: Awaited<T> = await first;
    const remaining: T[] = await recursivePromiseASync(rest);
    counter++;
    return [result, ...remaining];
  } catch (err: any) {
    const remaining: T[] = await recursivePromiseASync(rest);
    counter++;
    return [err, ...remaining];
  }
}
