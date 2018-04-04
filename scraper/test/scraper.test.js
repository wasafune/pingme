const cheerio = require('cheerio');
const mockDom = require('./mockDom');
const {
  getRandomInt,
  iterateDom,
  fetchHTML,
  // awaitFetch,
  // scrapeAll,
} = require('../scrapers/scraper');

// parse all mockDom strings into cheerio objects
const mockCheerioDom = {};
Object.entries(mockDom).forEach((arr) => {
  mockCheerioDom[arr[0]] = cheerio.load(arr[1]);
});

// mock modules
jest.mock('axios');


test('getRandomInt should generate random int between min/max', () => {
  const min = 123;
  const max = 54321;
  let randomNum = 0;
  for (let i = 0; i < 42; i += 1) {
    randomNum = getRandomInt(min, max);
    expect(randomNum).toBeGreaterThan(min);
    expect(randomNum).toBeLessThan(max);
  }
});

// test('check if should continue to iterate', () => {
//   expect(iterateCheck(mockCheerioDom.domWithClassNext, '.next')).toBeGreaterThan(0);
//   expect(iterateCheck(mockCheerioDom.domWithoutClassNext, '.next')).toBe(0);
// });

test('iterateDom forEach functionality with className and return false if nothing to iterate', () => {
  const tempConfig = {
    extractFunc: jest.fn(),
    iterateDomEle: '.mada',
  };
  expect(iterateDom(mockCheerioDom.domWithRepeatedClass3Times, tempConfig)).toBe(true);
  expect(tempConfig.extractFunc).toHaveBeenCalledTimes(3);

  expect(iterateDom(mockCheerioDom.domWithRepeatedTag3Times, tempConfig)).toBe(false);
  expect(tempConfig.extractFunc).toHaveBeenCalledTimes(3);
});

test('iterateDom forEach functionality with tagName and return false if nothing to iterate', () => {
  const tempConfig = {
    extractFunc: jest.fn(),
    iterateDomEle: 'div',
  };

  expect(iterateDom(mockCheerioDom.domWithRepeatedClass3Times, tempConfig)).toBe(false);
  expect(tempConfig.extractFunc).toHaveBeenCalledTimes(0);

  expect(iterateDom(mockCheerioDom.domWithRepeatedTag3Times, tempConfig)).toBe(true);
  expect(tempConfig.extractFunc).toHaveBeenCalledTimes(3);
});

test('iterateDom should run breakCheck on each iteration if exists', () => {
  const tempConfig = {
    extractFunc: jest.fn(),
    iterateDomEle: 'div',
    breakCheck: jest.fn(),
    breakVal: 'Hunter X Hunter 123',
  };
  iterateDom(mockCheerioDom.domWithRepeatedTag3Times, tempConfig);
  expect(tempConfig.breakCheck).toHaveBeenCalledTimes(3);

  iterateDom(mockCheerioDom.domWithRepeatedClass3Times, tempConfig);
  expect(tempConfig.breakCheck).toHaveBeenCalledTimes(3);
});

test('iterateDom should break iteration and return false if breakVal found', () => {
  const mockBreakCheck = jest.fn();
  mockBreakCheck
    .mockReturnValueOnce('Avatar 123')
    .mockReturnValueOnce('Regular Show 321')
    .mockReturnValueOnce('Hunter X Hunter 123');

  const tempConfig = {
    extractFunc: jest.fn(),
    iterateDomEle: 'div',
    breakCheck: mockBreakCheck,
    breakVal: 'Hunter X Hunter 123',
  };

  expect(iterateDom(mockCheerioDom.domWithRepeatedTag3Times, tempConfig)).toBe(false);
  expect(mockBreakCheck).toHaveBeenCalledTimes(3);
  expect(tempConfig.extractFunc).toHaveBeenCalledTimes(2);
});

// write test for iterate dom with breakCheck and breakVal

// test('extract data to scrape', () => {
//   const now = Date.now();
//   Date.now = jest.genMockFunction().mockReturnValue(now);
//
//   const expected = ['Action', 'Adventure', 'Comedy'];
//   const extractedData = extractAllData(0, '*', mockCheerioDom.domToExtractData);
//   expect(extractedData.title).toBe('Hunter X Hunter');
//   expect(extractedData.rating).toBe('4.90');
//   expect(extractedData.genres).toEqual(expect.arrayContaining(expected));
//   expect(extractedData.latest).toBe('380');
//   expect(extractedData.time).toBe(now);
// });
test('iterateDom handles break case', () => {

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
