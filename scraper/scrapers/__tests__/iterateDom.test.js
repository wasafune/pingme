const mockDom = require('../__mockDom__');
const iterateDom = require('../iterateDom');

// mock modules
jest.mock('../mongoHandler');
const mongoHandler = require('../mongoHandler');

// disable console.log
const blankFunc = () => {};
global.console.log = blankFunc;
global.console.error = blankFunc;

test('iterateDom should loop through each .class and return true if full loop', async () => {
  const extractFunc = jest.fn();
  const iterateCheck = jest.fn();
  iterateCheck.mockReturnValue(true);
  extractFunc.mockReturnValue({ title: 'testu' });
  const mockConfig = {
    extractFunc,
    iterateDomEle: '.mada',
    iterateCheck,
  };

  expect.assertions(6);
  // test on positives
  await expect(iterateDom(mockDom.classMada3, mockConfig))
    .resolves.toBe(true);
  expect(extractFunc).toHaveBeenCalledTimes(3);
  expect(iterateCheck).toHaveBeenCalledTimes(1);
  // test on negatives
  await expect(iterateDom(mockDom.tagDiv3, mockConfig))
    .resolves.toBe(false);
  expect(extractFunc).toHaveBeenCalledTimes(3);
  expect(iterateCheck).toHaveBeenCalledTimes(1);
});

test('iterateDom should loop through each tag and return true if full loop', async () => {
  const extractFunc = jest.fn();
  const iterateCheck = jest.fn();
  iterateCheck.mockReturnValue(true);
  extractFunc.mockReturnValue({ title: 'testu' });
  const mockConfig = {
    extractFunc,
    iterateDomEle: 'div',
    iterateCheck,
  };

  expect.assertions(6);
  // test on positives
  await expect(iterateDom(mockDom.tagDiv3, mockConfig))
    .resolves.toBe(true);
  expect(extractFunc).toHaveBeenCalledTimes(3);
  expect(iterateCheck).toHaveBeenCalledTimes(1);
  // test on negatives
  await expect(iterateDom(mockDom.classMada3, mockConfig))
    .resolves.toBe(false);
  expect(extractFunc).toHaveBeenCalledTimes(3);
  expect(iterateCheck).toHaveBeenCalledTimes(1);
});

test('iterateDom should call handleFirst if "type" is latest and "page" is 1', async () => {
  const extractFunc = jest.fn();
  const iterateCheck = jest.fn();
  extractFunc.mockReturnValue({ title: 'testu' });
  const mockConfig = {
    extractFunc,
    iterateCheck,
    iterateDomEle: 'div',
    type: 'latest',
  };

  expect.assertions(1);
  await iterateDom(mockDom.tagDiv3, mockConfig, 1);
  expect(mongoHandler.handleFirst).toHaveBeenCalledTimes(1);
  jest.resetAllMocks();
});

test('iterateDom should break loop if break condition met and resolve false', async () => {
  const extractFunc = jest.fn();
  extractFunc
    .mockReturnValueOnce({ title: 'Avatar', latest: '123' })
    .mockReturnValueOnce({ title: 'Hunter X Hunter', latest: '123' })
    .mockReturnValueOnce({ title: 'Regular Show', latest: '123' });

  const mockConfig = {
    extractFunc,
    iterateDomEle: 'div',
    breakVal: 'Hunter X Hunter 123',
  };

  expect.assertions(2);
  await expect(iterateDom(mockDom.tagDiv3, mockConfig, 1))
    .resolves.toBe(false);
  expect(extractFunc).toHaveBeenCalledTimes(2);
});

test('iterateDom should full loop, if iterateCheck not met and resolve false', async () => {
  const extractFunc = jest.fn();
  const iterateCheck = jest.fn();
  iterateCheck.mockReturnValue(false);
  extractFunc
    .mockReturnValueOnce({ title: 'Avatar', latest: '123' })
    .mockReturnValueOnce({ title: 'Hunter X Hunter', latest: '123' })
    .mockReturnValueOnce({ title: 'Regular Show', latest: '123' });

  const mockConfig = {
    extractFunc,
    iterateCheck,
    iterateDomEle: 'div',
    breakVal: 'PogChamp 123',
  };

  expect.assertions(2);
  await expect(iterateDom(mockDom.tagDiv3, mockConfig, 1))
    .resolves.toBe(false);
  expect(extractFunc).toHaveBeenCalledTimes(3);
});

test('iterateDom should full loop if break condition not met and resolve true', async () => {
  const extractFunc = jest.fn();
  const iterateCheck = jest.fn();
  iterateCheck.mockReturnValue(true);
  extractFunc
    .mockReturnValueOnce({ title: 'Avatar', latest: '123' })
    .mockReturnValueOnce({ title: 'Hunter X Hunter', latest: '123' })
    .mockReturnValueOnce({ title: 'Regular Show', latest: '123' });

  const mockConfig = {
    extractFunc,
    iterateCheck,
    iterateDomEle: 'div',
    breakVal: 'PogChamp 123',
  };

  expect.assertions(2);
  await expect(iterateDom(mockDom.tagDiv3, mockConfig, 1))
    .resolves.toBe(true);
  expect(extractFunc).toHaveBeenCalledTimes(3);
});
