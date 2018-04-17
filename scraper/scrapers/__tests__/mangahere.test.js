const { load } = require('cheerio');

const {
  scrapeAllConfig,
  scrapeCompletedConfig,
  scrapeLatestConfig,
} = require('../mangahere.js');
const {
  allDom,
  latestDom,
  nextDom,
} = require('../__mockDom__/mangahere');

const $all = load(allDom);
const $next = load(nextDom);
const $latest = load(latestDom);

describe('scrapeAll Functionality', () => {
  const {
    genUrlFunc,
    extractFunc,
    iterateDomEle,
    iterateCheck,
    source,
    type,
  } = scrapeAllConfig;
  test('genUrlFunc', () => {
    expect(genUrlFunc(2)).toBe('http://www.mangahere.cc/directory/2.htm?name.az');
    expect(genUrlFunc(500)).toBe('http://www.mangahere.cc/directory/500.htm?name.az');
  });

  test('extractFunc', () => {
    const mockEl = $all(iterateDomEle)[1];
    const expected = {
      title: 'Dancer no Kioku',
      htmlTitle: 'Dancer no Kioku',
      genres: ['one shot', 'sci-fi', 'seinen'],
      latest: 1,
    };
    expect(extractFunc(1, mockEl, $all)).toMatchObject(expected);
  });
  test('type & source', () => {
    expect(type).toBe('all');
    expect(source).toBe('mangahere');
  });
  test('iterateCheck', () => {
    expect(iterateCheck($next)).toBeTruthy();
  });
});

describe('scrapeCompleted Functionality', () => {
  const {
    genUrlFunc,
    extractFunc,
    iterateDomEle,
    iterateCheck,
    source,
    type,
  } = scrapeCompletedConfig;
  test('genUrlFunc', () => {
    expect(genUrlFunc(5)).toBe('http://www.mangahere.cc/completed/5.htm?name.az');
    expect(genUrlFunc(42)).toBe('http://www.mangahere.cc/completed/42.htm?name.az');
  });

  test('extractFunc', () => {
    const mockEl = $all(iterateDomEle)[1];
    const expected = {
      title: 'Dancer no Kioku',
    };
    expect(extractFunc(1, mockEl, $all)).toMatchObject(expected);
  });
  test('type & source', () => {
    expect(type).toBe('completed');
    expect(source).toBe('mangahere');
  });
  test('iterateCheck', () => {
    expect(iterateCheck($next)).toBeTruthy();
  });
});

describe('scrapeLatest Functionality', () => {
  const {
    genUrlFunc,
    extractFunc,
    iterateDomEle,
    iterateCheck,
    source,
    type,
  } = scrapeLatestConfig;
  test('genUrlFunc', () => {
    expect(genUrlFunc(5)).toBe('http://www.mangahere.cc/latest/5/');
    expect(genUrlFunc(42)).toBe('http://www.mangahere.cc/latest/42/');
  });

  test('extractFunc', () => {
    const mockEl = $latest(iterateDomEle)[0];
    const expected = {
      title: 'Kare no Shousou to Koi ni Tsuite',
      latest: 12,
    };
    expect(extractFunc(1, mockEl, $all)).toMatchObject(expected);
  });
  test('type & source', () => {
    expect(type).toBe('latest');
    expect(source).toBe('mangahere');
  });
  test('iterateCheck', () => {
    expect(iterateCheck($next)).toBe(false);
  });
});
