// const axios = require('axios');
const curl = require('curlrequest');

const url = 'https://myanimelist.net/api/anime/search.xml?q=naruto';

const user = 'misterfune';
const pass = 'Peterlee93';

curl.request({
  url,
  user: `${user}:${pass}`,
}, function (err, response) {
  if (err) throw err;
  console.log(response);
});
