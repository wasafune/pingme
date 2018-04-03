const validUrls = {
  'manga.com': true,
  'anime.com': true,
};

const mockRequestHandler = url => (
  new Promise((resolve, reject) => {
    process.nextTick(() => {
      console.log(url);
      if (validUrls[url]) {
        resolve({ data: 'hi domo' });
      } else {
        // eslint-disable-next-line
        reject({ error: 'bad url' });
      }
    });
  })
);

module.exports = mockRequestHandler;
