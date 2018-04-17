const { load } = require('cheerio');

const { scrapeLatestConfig } = require('../mangapark');

const mockDom = require('../__mockDom__/mangapark');

const {
  genUrlFunc,
  extractFunc,
  iterateCheck,
  iterateDomEle,
  source,
  type,
} = scrapeLatestConfig;

const $ = load(mockDom);

describe('scrapeLatest Functionality', () => {
  test('genUrlFunc', () => {
    expect(genUrlFunc()).toBe('https://www.mangapark.me/rss/latest.xml');
    expect(genUrlFunc(123)).toBe('https://www.mangapark.me/rss/latest.xml');
  });
  test('extractFunc', () => {
    const mockEl = $(iterateDomEle)[0];
    const expected = {
      title: 'Tsurezure Children',
      latest: 8,
    };
    expect(extractFunc(3, mockEl, $)).toMatchObject(expected);
  });
  test('type & source', () => {
    expect(type).toBe('latest');
    expect(source).toBe('mangapark');
  });
  test('iterateCheck', () => {
    expect(iterateCheck()).toBe(false);
  });
});
