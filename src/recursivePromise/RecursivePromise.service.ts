export function recursivePromise<T>(promisesArray: Array<() => Promise<T>>): Promise<Array<T>> {
  if (promisesArray.length === 0) {
    return Promise.resolve([]);
  } else {
    const [first, ...rest]: (() => Promise<T>)[] = promisesArray;
    return first()
      .then((result) => {
        return recursivePromise(rest).then((remaining) => {
          return [result, ...remaining];
        });
      })
      .catch((error) => {
        return recursivePromise(rest).then((remaining) => {
          return [error, ...remaining];
        });
      });
  }
}
