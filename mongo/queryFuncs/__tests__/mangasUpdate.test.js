const mongoose = require('mongoose');
const MongodbMemoryServer = require('mongodb-memory-server');

const Manga = require('../../../mongo/mangaSchema');

const {
  addFollower,
  subscribeFollower,
  unsubscribeFollower,
  retrieveMangas,
  pullFollower,
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
  beforeEach(async () => {
    await Manga.findByIdAndUpdate(mangaId, {
      $pull: { followerList: {} },
      $set: { followerCount: 0 },
    });
  });
  afterAll(async () => {
    try {
      await Manga.collection.drop();
    } catch (err) {
      console.error(err);
    }
  });

  test('addFollower false subscriber, increments followerCount', async () => {
    const expected = { userId, subscribed: false };

    expect.assertions(3);
    await addFollower(mangaId, userId);
    const result = await Manga.findById(mangaId);
    expect(result.followerCount).toBe(1);
    expect(result.followerList.length).toBe(1);
    expect(result.followerList[0]).toEqual(expect.objectContaining(expected));
  });

  test('addFollower true subscriber, increments followerCount', async () => {
    const expected = { userId, subscribed: true };

    expect.assertions(3);
    await addFollower(mangaId, userId, true);
    const result = await Manga.findById(mangaId);
    expect(result.followerCount).toBe(1);
    expect(result.followerList.length).toBe(1);
    expect(result.followerList[0]).toEqual(expect.objectContaining(expected));
  });

  test('subscribeFollower', async () => {
    expect.assertions(3);
    await Promise.all([
      addFollower(mangaId, 'poggers'),
      addFollower(mangaId, 'swiftrage'),
      addFollower(mangaId, 'wutface'),
    ]);
    await subscribeFollower(mangaId, 'swiftrage');
    const result1 = await Manga.findOne({ 'followerList.userId': 'swiftrage' }, { 'followerList.$': 1 });
    const result2 = await Manga.findOne({ 'followerList.userId': 'poggers' }, { 'followerList.$': 1 });
    const result3 = await Manga.findOne({ 'followerList.userId': 'wutface' }, { 'followerList.$': 1 });
    expect(result1.followerList[0].subscribed).toBe(true);
    expect(result2.followerList[0].subscribed).toBe(false);
    expect(result3.followerList[0].subscribed).toBe(false);
  });


  test('unsubscribeFollower', async () => {
    expect.assertions(3);
    await Promise.all([
      addFollower(mangaId, 'poggers', true),
      addFollower(mangaId, 'swiftrage', true),
      addFollower(mangaId, 'wutface', true),
    ]);
    await unsubscribeFollower(mangaId, 'swiftrage');
    const result1 = await Manga.findOne({ 'followerList.userId': 'swiftrage' }, { 'followerList.$': 1 });
    const result2 = await Manga.findOne({ 'followerList.userId': 'poggers' }, { 'followerList.$': 1 });
    const result3 = await Manga.findOne({ 'followerList.userId': 'wutface' }, { 'followerList.$': 1 });
    expect(result1.followerList[0].subscribed).toBe(false);
    expect(result2.followerList[0].subscribed).toBe(true);
    expect(result3.followerList[0].subscribed).toBe(true);
  });

  test('pullFollower, decrements followerCount', async () => {
    expect.assertions(4);
    await Promise.all([
      addFollower(mangaId, 'poggers', true),
      addFollower(mangaId, 'swiftrage', true),
      addFollower(mangaId, 'wutface', true),
    ]);
    await pullFollower(mangaId, 'swiftrage');
    const result = await Manga.findById(mangaId);
    expect(result.followerList.length).toBe(2);
    expect(result.followerCount).toBe(2);
    expect(result.followerList[0].userId).not.toBe('swiftrage');
    expect(result.followerList[1].userId).not.toBe('swiftrage');
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
