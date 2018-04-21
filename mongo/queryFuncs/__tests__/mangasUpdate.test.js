/* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */

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
    const resArr = await Promise.all([mockManga.save(), mockManga2.save(), mockManga3.save()]);
    mangaId = resArr[0].id;
    mangaId2 = resArr[1].id;
    mangaId3 = resArr[2].id;
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
    const expected = { _id: userId, subscribed: false };

    expect.assertions(3);
    await addFollower(mangaId, userId);
    const result = await Manga.findById(mangaId).lean();
    expect(result.followerCount).toBe(1);
    expect(result.followerList.length).toBe(1);
    expect(result.followerList[0]).toEqual(expect.objectContaining(expected));
  });

  test('addFollower true subscriber, increments followerCount', async () => {
    const expected = { _id: userId, subscribed: true };

    expect.assertions(3);
    await addFollower(mangaId, userId, true);
    const result = await Manga.findById(mangaId).lean();
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
    const resArr = await Promise.all([
      Manga.findOne({ 'followerList._id': 'swiftrage' }, { 'followerList.$': 1 }).lean(),
      Manga.findOne({ 'followerList._id': 'poggers' }, { 'followerList.$': 1 }).lean(),
      Manga.findOne({ 'followerList._id': 'wutface' }, { 'followerList.$': 1 }).lean(),
    ]);
    expect(resArr[0].followerList[0].subscribed).toBe(true);
    expect(resArr[1].followerList[0].subscribed).toBe(false);
    expect(resArr[2].followerList[0].subscribed).toBe(false);
  });

  test('unsubscribeFollower', async () => {
    expect.assertions(3);
    await Promise.all([
      addFollower(mangaId, 'poggers', true),
      addFollower(mangaId, 'swiftrage', true),
      addFollower(mangaId, 'wutface', true),
    ]);
    await unsubscribeFollower(mangaId, 'swiftrage');
    const resArr = await Promise.all([
      Manga.findOne({ 'followerList._id': 'swiftrage' }, { 'followerList.$': 1 }).lean(),
      Manga.findOne({ 'followerList._id': 'poggers' }, { 'followerList.$': 1 }).lean(),
      Manga.findOne({ 'followerList._id': 'wutface' }, { 'followerList.$': 1 }).lean(),
    ]);
    expect(resArr[0].followerList[0].subscribed).toBe(false);
    expect(resArr[1].followerList[0].subscribed).toBe(true);
    expect(resArr[2].followerList[0].subscribed).toBe(true);
  });

  test('pullFollower, decrements followerCount', async () => {
    expect.assertions(4);
    await Promise.all([
      addFollower(mangaId, 'poggers', true),
      addFollower(mangaId, 'swiftrage', true),
      addFollower(mangaId, 'wutface', true),
    ]);
    await pullFollower(mangaId, 'swiftrage');
    const result = await Manga.findById(mangaId).lean();
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
