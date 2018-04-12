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
test('scraper should return errors array if the array\'s length greater or equal to 30.', async () => {
  const mockArr30 = Array(30);
  const mockArr35 = Array(35);
  const mockArr21 = Array(21);
  const mockErrMsg = 'Error: Too many errors, closing scraper cycle.';
  expect.assertions(3);

  await expect(scraper(null, null, null, 1, mockArr30)).rejects.toBe(mockErrMsg);
  await expect(scraper(null, null, null, 1, mockArr35)).rejects.toBe(mockErrMsg);
  await expect(scraper(null, null, null, 1, mockArr21)).rejects.not.toBe(mockErrMsg);
});

// this also tests the break condition for recusive (iterateDom returns a falsy)
test('scraper should continue script and close db if good url and iterateDom returns falsy', async () => {
  const genUrlFunc = jest.fn();
  const db = { close: jest.fn() };
  genUrlFunc.mockReturnValue('http://manga.com');
  const mockConfig = {
    genUrlFunc,
  };

  expect.assertions(2);
  await expect(scraper(mockConfig, db, 1, 1)).resolves.toBe('end loop condition met, closing db connection');
  expect(db.close).toHaveBeenCalledTimes(1);
});

test('scraper should catch bad url', async () => {
  const genUrlFunc = jest.fn();
  const db = { close: jest.fn() };
  genUrlFunc.mockReturnValue('getjebaited.co');
  const mockConfig = {
    genUrlFunc,
  };

  expect.assertions(1);
  await expect(scraper(mockConfig, db, 1, 1)).resolves.toBe('bad url');
});

test('scraper should catch when iterateDom rejects', async () => {
  const genUrlFunc = () => 'http://manga.com';
  const db = { close: () => {} };
  const rejecter = new Promise((res, rej) => {
    const err = Error('iterateDom rejected');
    process.nextTick(() => rej(err));
  });
  iterateDom.mockReturnValue(rejecter);
  const mockConfig = {
    genUrlFunc,
  };

  expect.assertions(1);
  await expect(scraper(mockConfig, db, 1, 1)).resolves.toBe('iterateDom rejected');
  jest.resetAllMocks();
});

test('scraper recursively call if iterateDom returns truthy', async () => {
  const genUrlFunc = () => 'http://manga.com';
  // iterateDom is spy to keep track of how many recursive calls
  iterateDom.mockReturnValue(true);
  const mockConfig = {
    genUrlFunc,
  };

  expect.assertions(1);
  scraper(mockConfig, null, 1, 2);
  await new Promise(res => setTimeout(res, 30));
  expect(iterateDom).toHaveBeenCalledTimes(2);
  jest.resetAllMocks();
});

test('scraper recursively call if error caught from fetch', async () => {
  const genUrlFunc = jest.fn();
  // genUrlFunc is spy to keep track of how many recursive calls
  genUrlFunc.mockReturnValue('http://comics.com');
  const mockConfig = {
    genUrlFunc,
  };

  expect.assertions(1);
  scraper(mockConfig, null, 1, 2);
  await new Promise(res => setTimeout(res, 30));
  expect(genUrlFunc).toHaveBeenCalledTimes(2);
});

test('scraper recursively call if error caught from iterateDom', async () => {
  const genUrlFunc = () => 'http://manga.com';
  // genUrlFunc is spy to keep track of how many recursive calls
  const rejecter = new Promise((res, rej) => {
    const err = Error('iterateDom rejected');
    process.nextTick(() => rej(err));
  });
  iterateDom.mockReturnValue(rejecter);
  const mockConfig = {
    genUrlFunc,
  };

  expect.assertions(1);
  scraper(mockConfig, null, 1, 2);
  await new Promise(res => setTimeout(res, 30));
  expect(iterateDom).toHaveBeenCalledTimes(2);
  jest.resetAllMocks();
});
