import { recursivePromiseASync } from "../recursivePromiseASync.service";

describe("RecursivePromise function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const promise1: () => Promise<unknown> = () => Promise.resolve("resolved1");
  const promise2: () => Promise<unknown> = () => Promise.resolve("resolved2");
  const promise3: () => Promise<unknown> = () => Promise.resolve("resolved3");
  const promise4: () => Promise<unknown> = () => Promise.resolve("resolved4");
  const promise5: () => Promise<unknown> = () => Promise.reject("rejected5");
  const promise6: () => Promise<unknown> = () => Promise.resolve("resolved6");
  const promise7: () => Promise<unknown> = () => Promise.resolve("resolved7");
  const arrayOfPromises: (() => Promise<unknown>)[] = [
    promise1,
    promise2,
    promise3,
    promise4,
    promise5,
    promise6,
    promise7,
  ];

  describe("When given array of promises is empty", () => {
    it("It returns Promise with with empty array", async () => {
      //given
      const array: any[] = [];
      const result: unknown[] = [];
      // when
      await recursivePromiseASync(array).then((data) => result.push(data));
      //then
      expect.assertions(1);
      expect(result).toMatchSnapshot();
    });
  });
  describe("When array of promises is given", () => {
    it("It returns Promise with array with same lenght as given array", async () => {
      //given
      let resultArrayLenght: number = 0;
      //when
      const arrayOfPromisesLenght: number = arrayOfPromises.length;
      await recursivePromiseASync(arrayOfPromises).then((array) => {
        resultArrayLenght = array.length;
      });
      //then
      expect.assertions(1);
      expect(resultArrayLenght).toBe(arrayOfPromisesLenght);
    });
  });
  describe("When array of promises is given", () => {
    it("It return Promise with array of resolved and rejected promises results", async () => {
      //given
      let result: unknown[] = [];
      //when
      await recursivePromiseASync(arrayOfPromises).then((data) => (result = data));
      //then
      expect.assertions(1);
      expect(result).toMatchSnapshot();
    });
  });
});
