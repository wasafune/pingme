const { load } = require('cheerio');

const { scrapeLatestConfig } = require('../scrapers/mangapark');

const mockBasicDom = require('./mockDom');
const mockMangaparkDom = require('./mockDom/mangapark');

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
const $mp = load(mockMangaparkDom);

test('genUrlFunc returns the same url', () => {
  expect(genUrlFunc()).toBe('https://www.mangapark.me/rss/latest.xml');
  expect(genUrlFunc(123)).toBe('https://www.mangapark.me/rss/latest.xml');
});

test('iterateCheck always returns false', () => {
  expect(iterateCheck()).toBe(false);
});

test('extractFunc should return proper data', () => {
  const mockEl = $mp(iterateDomEle)[0];
  const expected = {
    title: 'Tsurezure Children',
    latest: '8',
  };
  expect(extractFunc(3, mockEl, $mp)).toMatchObject(expected);
});

test('breakCheck should return proper data', () => {
  const mockEl = $mp(iterateDomEle)[0];
  expect(breakCheck(3, mockEl, $mp)).toBe('Tsurezure Children 8');
});
