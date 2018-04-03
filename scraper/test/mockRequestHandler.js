const validUrls = {
  '/anime': true,
  '/manga': true,
};

const mockRequestHandler = url => (
  new Promise((resolve, reject) => {
    process.nextTick(() => {
      console.log(url);
      if (validUrls[url]) {
        console.log('resolving');
        resolve({ data: 'hi domo' });
      } else {
        console.log('failing');
        // eslint-disable-next-line
        reject({ error: 'bad url' });
      }
    });
  })
);

module.exports = mockRequestHandler;
