const { handleEdgeCase } = require('../handleEdgeCase');

describe('handleEdgeCase', () => {
  test('should return title if no case matched', () => {
    expect(handleEdgeCase('pingme')).toBe('pingme');
  });
  test('should return modified if case matched', () => {
    expect(handleEdgeCase('One-Punch Man')).toBe('Onepunch-Man');
  });
});
