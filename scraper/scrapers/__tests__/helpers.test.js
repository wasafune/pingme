const {
  genRandomInt,
  delay,
  parseTitle,
  combineAndKeepUniq,
  pushIfNotIncludes,
} = require('../helpers');

test('genRandomInt should generate random int between min/max', () => {
  const min = 123;
  const max = 54321;
  let randomNum = 0;
  for (let i = 0; i < 42; i += 1) {
    randomNum = genRandomInt(min, max);
    expect(randomNum).toBeGreaterThan(min);
    expect(randomNum).toBeLessThan(max);
  }
});

test('delay should delay approx input milliseconds', async () => {
  expect.assertions(1);
  const startTime = Date.now();
  await delay(50);
  const afterTime = Date.now();
  const lowerThreshold = startTime + 50;
  const upperThreshold = startTime + 80;
  const check = afterTime >= lowerThreshold && afterTime < upperThreshold;
  expect(check).toBeTruthy();
});

test('parseTitle keeps lowercased alphanumeric + space + hyphen/underscore and changes hyphen/underscore into spaces', () => {
  const mockStr = '&quot;Aishi_teru&quot;, Uso Dak-edo.';
  const expectedStr = 'aishi teru uso dak edo';
  expect(parseTitle(mockStr)).toBe(expectedStr);
});

test('combineAndKeepUniq returns concatinated array with unique elements, keeping order of input', () => {
  const mockArr1 = ['hello', 'there', 'cat'];
  const mockArr2 = ['hello', 'there', 'doge'];
  const expectedArr = ['hello', 'there', 'cat', 'doge'];
  expect(combineAndKeepUniq(mockArr1, mockArr2)).toEqual(expectedArr);
});

test('pushIfNotIncludes pushes arg if not included', () => {
  const mockArr1 = ['hello', 'there', 'cat'];
  const mockStr1 = 'doge';
  const mockStr2 = 'cat';
  const expectedArr = ['hello', 'there', 'cat', 'doge'];
  expect(pushIfNotIncludes(mockArr1, mockStr1)).toEqual(expectedArr);
  expect(pushIfNotIncludes(mockArr1, mockStr2)).toEqual(mockArr1);
});
