const { load } = require('cheerio');

const { scrapeLatestConfig } = require('../mangastream');

const mockDom = require('../__mockDom__/mangastream');

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
    expect(genUrlFunc()).toBe('https://readms.net/rss');
    expect(genUrlFunc(123)).toBe('https://readms.net/rss');
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
    expect(source).toBe('mangastream');
  });
  test('iterateCheck', () => {
    expect(iterateCheck()).toBe(false);
  });
});
