import { recursivePromise } from "../RecursivePromise.service";

describe("RecursivePromise function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const promise1: Promise<string> = Promise.resolve("resolved1");
  const promise2: Promise<string> = Promise.resolve("resolved2");
  const promise3: Promise<string> = Promise.resolve("resolved3");
  const promise4: Promise<string> = Promise.resolve("resolved4");
  const promise5: Promise<string> = Promise.reject("rejected5");
  const promise6: Promise<string> = Promise.resolve("resolved6");
  const promise7: Promise<string> = Promise.resolve("resolved7");
  const arrayOfPromises: Promise<string>[] = [promise1, promise2, promise3, promise4, promise5, promise6, promise7];

  describe("When given array of promises is empty", () => {
    it("It returns Promise with with empty array", async () => {
      //given
      const array: Promise<string>[] = [];
      //when
      const result: string[] = await recursivePromise(array);
      //then
      expect.assertions(1);
      expect(result).toMatchObject([]);
    });
  });
  describe("When array of promises is given", () => {
    it("It returns Promise with array with same lenght as given array", async () => {
      //given
      const arrayOfPromisesLenght: number = arrayOfPromises.length;
      //when
      const { length } = await recursivePromise(arrayOfPromises);
      //then
      expect.assertions(1);
      expect(length).toBe(arrayOfPromisesLenght);
    });
  });
  describe("When array of promises is given", () => {
    it("It return Promise with array of resolved and rejected promises results", async () => {
      //when
      const result: string[] = await recursivePromise(arrayOfPromises);
      //then
      expect.assertions(1);
      expect(result).toMatchSnapshot();
    });
  });
});
