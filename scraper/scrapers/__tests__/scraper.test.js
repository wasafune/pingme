const scraper = require('../scraper');

// mock modules
jest.mock('../helpers');
jest.mock('../iterateDom');

const iterateDom = require('../iterateDom');

// disable console log/error
const blankFunc = () => {};
global.console.log = blankFunc;
global.console.error = blankFunc;

// test scraper
beforeEach(() => {
  iterateDom.mockReset();
});

test('scraper should return errors array if the array\'s length greater or equal to 30.', async () => {
  const mockArr30 = Array(30);
  const mockArr35 = Array(35);
  const mockArr21 = Array(21);
  const genUrlFunc = jest.fn().mockReturnValue('http://manga.com');
  const mockConfig = { genUrlFunc };
  const exitObj = { msg: 'End condition met.', page: 1 };

  expect.assertions(3);
  await expect(scraper(mockConfig, 1, mockArr30)).rejects.toEqual(expect.anything());
  await expect(scraper(mockConfig, 1, mockArr35)).rejects.toEqual(expect.anything());
  await expect(scraper(mockConfig, 1, mockArr21)).resolves.toEqual(exitObj);
});

test('scraper should handle fetch resolve', async () => {
  const genUrlFunc = jest.fn().mockReturnValue('http://manga.com');
  const mockConfig = { genUrlFunc };
  const exitObj = { msg: 'End condition met.', page: 1 };

  expect.assertions(1);
  await expect(scraper(mockConfig, 1)).resolves.toEqual(exitObj);
});

test('scraper should catch when fetch rejects', async () => {
  const genUrlFunc = jest.fn()
    .mockReturnValueOnce('getjebaited.gg')
    .mockReturnValueOnce('http://manga.com');
  const mockArr = [];
  const mockConfig = { genUrlFunc };
  const exitObj = { msg: 'End condition met.', page: 1 };

  expect.assertions(2);
  await expect(scraper(mockConfig, 1, mockArr)).resolves.toEqual(exitObj);
  expect(mockArr.length).toBe(1);
});

test('scraper should catch when iterateDom rejects', async () => {
  const genUrlFunc = () => 'http://manga.com';
  const rejecter = new Promise((res, rej) => {
    const err = Error('iterateDom rejected');
    process.nextTick(() => rej(err));
  });
  iterateDom.mockReturnValueOnce(rejecter).mockReturnValueOnce(false);
  const mockArr = [];
  const mockConfig = { genUrlFunc };
  const exitObj = { msg: 'End condition met.', page: 1 };

  expect.assertions(2);
  await expect(scraper(mockConfig, 1, mockArr)).resolves.toEqual(exitObj);
  expect(mockArr.length).toBe(1);
});

test('scraper recursively calls while iterateDom returns truthy', async () => {
  const genUrlFunc = () => 'http://manga.com';
  iterateDom
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(false);
  const mockConfig = { genUrlFunc };
  const exitObj = { msg: 'End condition met.', page: 3 };

  expect.assertions(1);
  await expect(scraper(mockConfig, 1)).resolves.toEqual(exitObj);
});

test('scraper recursively calls if error caught from fetch', async () => {
  const genUrlFunc = jest.fn()
    .mockReturnValueOnce('http://comics.com')
    .mockReturnValueOnce('http://books.com')
    .mockReturnValueOnce('http://avatar.com')
    .mockReturnValueOnce('http://manga.com');
  const mockConfig = { genUrlFunc };
  const mockArr = [];
  const exitObj = { msg: 'End condition met.', page: 1 };

  expect.assertions(3);
  await expect(scraper(mockConfig, 1, mockArr)).resolves.toEqual(exitObj);
  expect(mockArr.length).toBe(3);
  expect(genUrlFunc).toHaveBeenCalledTimes(4);
});

test('scraper recursively calls if error caught from iterateDom', async () => {
  const genUrlFunc = () => 'http://manga.com';
  const rejecter = new Promise((res, rej) => {
    const err = Error('iterateDom rejected');
    process.nextTick(() => rej(err));
  });
  iterateDom
    .mockReturnValueOnce(rejecter)
    .mockReturnValueOnce(rejecter)
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(false);
  const mockConfig = { genUrlFunc };
  const mockArr = [];
  const exitObj = { msg: 'End condition met.', page: 2 };

  expect.assertions(3);
  await expect(scraper(mockConfig, 1, mockArr)).resolves.toEqual(exitObj);
  expect(mockArr.length).toBe(2);
  expect(iterateDom).toHaveBeenCalledTimes(4);
});
