/* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */

const mongoose = require('mongoose');
const MongodbMemoryServer = require('mongodb-memory-server');

const Manga = require('../../../mongo/mangaSchema');

const {
  retrieveMangas,
  searchMangas,
} = require('../mangasQuery');

// eslint-disable-next-line
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

let mongoServer;

const MONGO_DB_NAME = 'jest';
beforeAll(async () => {
  mongoServer = new MongodbMemoryServer.default({
    instance: {
      dbName: MONGO_DB_NAME,
    },
    binary: {
      version: '3.2.19',
    },
  });
  try {
    const mongoUri = await mongoServer.getConnectionString();
    await mongoose.connect(mongoUri);
  } catch (err) {
    console.error(err);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('mangasQuery', () => {
  let [manga1, manga2, manga3, manga4] = [];

  beforeAll(async () => {
    manga1 = new Manga({ title: 'mushishi', latest: 1 });
    manga2 = new Manga({ title: 'made in abyss', latest: 1 });
    manga3 = new Manga({ title: 'kimi no na wa', latest: 1 });
    manga4 = new Manga({ title: 'mushishi zoku shou', latest: 1 });
    const resArr = await Promise.all([
      manga1.save(),
      manga2.save(),
      manga3.save(),
      manga4.save(),
    ]);
    [manga1, manga2, manga3, manga4] = resArr;
    // add text index
    await Manga.collection.createIndex({ title: 'text' });
  });

  test('retrieveMangas', async () => {
    expect.assertions(7);
    const mangaObj1 = { _id: manga1._id, subscribed: true };
    const mangaObj2 = { _id: manga2._id, subscribed: false };
    const mangaObj3 = { _id: manga3._id, subscribed: true };
    const result = await retrieveMangas([mangaObj1, mangaObj2, mangaObj3]);
    expect(result.length).toBe(3);
    expect(result[0].title).toBe(manga1.title);
    expect(result[0].subscribed).toBe(true);
    expect(result[1].title).toBe(manga2.title);
    expect(result[1].subscribed).toBe(false);
    expect(result[2].title).toBe(manga3.title);
    expect(result[2].subscribed).toBe(true);
  });

  test('searchMangas', async () => {
    expect.assertions(5);
    const res1 = await searchMangas('kimi');
    expect(res1.length).toBe(1);
    expect(res1[0].title).toBe(manga3.title);
    const res2 = await searchMangas('mushishi');
    expect(res2.length).toBe(2);
    expect(res2[0].title).toBe(manga1.title);
    expect(res2[1].title).toBe(manga4.title);
  });
});
