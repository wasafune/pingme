const axios = {};
const validUrls = {
  'http://manga.com': true,
  'http://anime.com': true,
};

axios.get = url => (
  new Promise((resolve, reject) => {
    process.nextTick(() => {
      if (validUrls[url]) {
        resolve({ data: 'hi domo' });
      } else {
        // eslint-disable-next-line
        reject({ message: 'bad url' });
      }
    });
  })
);


module.exports = axios;
