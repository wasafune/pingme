const { load } = require('cheerio');

const { scrapeLatestConfig } = require('../scrapers/mangastream');

const mockBasicDom = require('./mockDom');
const mockMangastreamDom = require('./mockDom/mangastream');

const {
  genUrlFunc,
  extractFunc,
  iterateCheck,
  iterateDomEle,
  breakCheck,
} = scrapeLatestConfig;

// parse mock dom into cheerio objects
const $ = {};
Object.entries(mockBasicDom).forEach((arr) => {
  $[arr[0]] = load(arr[1]);
});
const $ms = load(mockMangastreamDom);

test('genUrlFunc returns the same url', () => {
  expect(genUrlFunc()).toBe('https://readms.net/');
  expect(genUrlFunc(123)).toBe('https://readms.net/');
});

test('iterateCheck always returns false', () => {
  expect(iterateCheck()).toBe(false);
});

test('extractFunc should return proper data', () => {
  const mockEl = $ms(iterateDomEle)[0];
  const expected = {
    title: 'Tokyo Ghoul:re',
    latest: '167',
  };
  expect(extractFunc(3, mockEl, $ms)).toMatchObject(expected);
});

test('breakCheck should return proper data', () => {
  const mockEl = $ms('.pull-right')[0];
  expect(breakCheck(3, mockEl, $ms)).toBe('Tokyo Ghoul:re 167');
});
