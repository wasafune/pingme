const cheerio = require('cheerio');
const mockDom = require('./mockDom');
const {
  getRandomInt,
  iterateCheck,
  iterateDom,
  extractData,
  fetchHTML,
  awaitFetch,
  scrapeAll,
} = require('../scrapers/mangahere');

// parse all mockDom strings into cheerio objects
const mockCheerioDom = {};
Object.entries(mockDom).forEach((arr) => {
  mockCheerioDom[arr[0]] = cheerio.load(arr[1]);
});

// mock modules
jest.mock('axios');


test('generate random int between min/max', () => {
  const min = 123;
  const max = 54321;
  let randomNum = 0;
  for (let i = 0; i < 42; i += 1) {
    randomNum = getRandomInt(min, max);
    expect(randomNum).toBeGreaterThan(min);
    expect(randomNum).toBeLessThan(max);
  }
});

test('check if should continue to iterate', () => {
  expect(iterateCheck(mockCheerioDom.domWithClassNext, '.next')).toBeGreaterThan(0);
  expect(iterateCheck(mockCheerioDom.domWithoutClassNext, '.next')).toBe(0);
});

test('run callback function on dom elements w/ matching class', () => {
  const tempFunc = jest.fn();

  iterateDom(mockCheerioDom.domWithRepeatedClass3Times, '.mada', tempFunc);
  expect(tempFunc).toHaveBeenCalledTimes(3);

  iterateDom(mockCheerioDom.domWithRepeatedTag3Times, '.mada', tempFunc);
  expect(tempFunc).toHaveBeenCalledTimes(3);
});

test('run callback function on dom elements w/ matching tags', () => {
  const tempFunc = jest.fn();

  iterateDom(mockCheerioDom.domWithRepeatedClass3Times, 'div', tempFunc);
  expect(tempFunc).toHaveBeenCalledTimes(0);

  iterateDom(mockCheerioDom.domWithRepeatedTag3Times, 'div', tempFunc);
  expect(tempFunc).toHaveBeenCalledTimes(3);
});

test('extract data to scrape', () => {
  const now = Date.now();
  Date.now = jest.genMockFunction().mockReturnValue(now);

  const expected = ['Action', 'Adventure', 'Comedy'];
  const extractedData = extractData(0, '*', mockCheerioDom.domToExtractData);
  expect(extractedData.title).toBe('Hunter X Hunter');
  expect(extractedData.rating).toBe('4.90');
  expect(extractedData.genres).toEqual(expect.arrayContaining(expected));
  expect(extractedData.latest).toBe('380');
  expect(extractedData.time).toBe(now);
});

test('fetchHTML works with resolves', () => {
  expect.assertions(1);
  return expect(fetchHTML('http://anime.com')).resolves.toEqual('hi domo');
});

test('fetchHTML works with rejects', () => {
  const expectedErr = { error: 'bad url' };
  expect.assertions(1);
  return expect(fetchHTML('http://cartoon.com'))
    .rejects.toEqual(expect.objectContaining(expectedErr));
});
