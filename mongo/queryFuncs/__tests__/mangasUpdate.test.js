/* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */

const mongoose = require('mongoose');
const MongodbMemoryServer = require('mongodb-memory-server');

const Manga = require('../../../mongo/mangaSchema');
const User = require('../../../mongo/userSchema');

const {
  addFollower,
  subscribeFollower,
  unsubscribeFollower,
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
  let userId;
  let userId2;
  let userId3;
  let mangaId;
  const params = { title: 'Benders Game', latest: 12 };
  beforeAll(async () => {
    const mockUser = new User({ userName: 'ender', password: 'wiggins', age: 21 });
    const mockUser2 = new User({ userName: 'peter', password: 'wiggins', age: 23 });
    const mockUser3 = new User({ userName: 'valentine', password: 'wiggins', age: 22 });
    const mockManga = new Manga(params);
    const resArr = await Promise.all([
      mockUser.save(),
      mockUser2.save(),
      mockUser3.save(),
      mockManga.save(),
    ]);
    userId = resArr[0]._id;
    userId2 = resArr[1]._id;
    userId3 = resArr[2]._id;
    mangaId = resArr[3].id;
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
      addFollower(mangaId, userId),
      addFollower(mangaId, userId2),
      addFollower(mangaId, userId3),
    ]);
    await subscribeFollower(mangaId, userId2);
    const resArr = await Promise.all([
      Manga.findOne({ 'followerList._id': userId }, { 'followerList.$': 1 }).lean(),
      Manga.findOne({ 'followerList._id': userId2 }, { 'followerList.$': 1 }).lean(),
      Manga.findOne({ 'followerList._id': userId3 }, { 'followerList.$': 1 }).lean(),
    ]);
    expect(resArr[0].followerList[0].subscribed).toBe(false);
    expect(resArr[1].followerList[0].subscribed).toBe(true);
    expect(resArr[2].followerList[0].subscribed).toBe(false);
  });

  test('unsubscribeFollower', async () => {
    expect.assertions(3);
    await Promise.all([
      addFollower(mangaId, userId, true),
      addFollower(mangaId, userId2, true),
      addFollower(mangaId, userId3, true),
    ]);
    await unsubscribeFollower(mangaId, userId2);
    const resArr = await Promise.all([
      Manga.findOne({ 'followerList._id': userId }, { 'followerList.$': 1 }).lean(),
      Manga.findOne({ 'followerList._id': userId2 }, { 'followerList.$': 1 }).lean(),
      Manga.findOne({ 'followerList._id': userId3 }, { 'followerList.$': 1 }).lean(),
    ]);
    expect(resArr[0].followerList[0].subscribed).toBe(true);
    expect(resArr[1].followerList[0].subscribed).toBe(false);
    expect(resArr[2].followerList[0].subscribed).toBe(true);
  });

  test('pullFollower, decrements followerCount', async () => {
    expect.assertions(4);
    await Promise.all([
      addFollower(mangaId, userId, true),
      addFollower(mangaId, userId2, true),
      addFollower(mangaId, userId3, true),
    ]);
    await pullFollower(mangaId, userId2);
    const result = await Manga.findById(mangaId).lean();
    expect(result.followerList.length).toBe(2);
    expect(result.followerCount).toBe(2);
    expect(result.followerList[0]._id).toEqual(expect.objectContaining(userId));
    expect(result.followerList[1]._id).toEqual(expect.objectContaining(userId3));
  });
});
