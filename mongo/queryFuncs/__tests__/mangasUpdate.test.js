const mongoose = require('mongoose');
const MongodbMemoryServer = require('mongodb-memory-server');

const Manga = require('../../../mongo/mangaSchema');

const {
  pushToMangaSubList,
  incrementMangaSubCt,
  retrieveMangas,
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
  let mangaId2;
  let mangaId3;
  const params = { title: 'Benders Game', latest: 12 };
  const params2 = { title: 'Game of Drones', latest: 34 };
  const params3 = { title: 'Rack and Dorthy', latest: 56 };
  beforeAll(async () => {
    const mockManga = new Manga(params);
    const mockManga2 = new Manga(params2);
    const mockManga3 = new Manga(params3);
    await Promise.all([mockManga.save(), mockManga2.save(), mockManga3.save()]);
    const result = await Manga.findOne({ title: 'Benders Game' });
    const result2 = await Manga.findOne({ title: 'Game of Drones' });
    const result3 = await Manga.findOne({ title: 'Rack and Dorthy' });
    mangaId = result.id;
    mangaId2 = result2.id;
    mangaId3 = result3.id;
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
  test('retrieveMangas', async () => {
    expect.assertions(4);
    const result = await retrieveMangas([mangaId, mangaId2, mangaId3]);
    result.sort((a, b) => a.latest < b.latest);
    expect(result.length).toBe(3);
    expect(result[0].title).toBe(params3.title);
    expect(result[1].title).toBe(params2.title);
    expect(result[2].title).toBe(params.title);
  });
});
