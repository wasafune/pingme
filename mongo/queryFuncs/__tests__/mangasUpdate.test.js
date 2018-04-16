const mongoose = require('mongoose');
const MongodbMemoryServer = require('mongodb-memory-server');

const Manga = require('../../../mongo/mangaSchema');

const {
  pushToMangaSubList,
  incrementMangaSubCt,
} = require('../mangasUpdate');

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

describe('mangasUpdate funcs', () => {
  const userId = 'hehe123';
  let mangaId;
  beforeAll(async () => {
    const params = {
      title: 'Benders Game',
    };
    const mockManga = new Manga(params);
    await mockManga.save();
    const result = await Manga.findOne({ title: 'Benders Game' });
    mangaId = result.id;
  });
  afterAll(async () => {
    try {
      await Manga.collection.drop();
    } catch (err) {
      console.error(err);
    }
  });

  test('pushToMangaSubList', async () => {
    const expected = [userId];

    expect.assertions(1);
    await pushToMangaSubList(mangaId, userId);
    const result = await Manga.findById(mangaId);
    expect(result.subscriberList).toEqual(expect.arrayContaining(expected));
  });
  test('incrementMangaSubCt', async () => {
    expect.assertions(1);
    await incrementMangaSubCt(mangaId);
    const result = await Manga.findById(mangaId);
    expect(result.subscriberCount).toBe(1);
  });
});
