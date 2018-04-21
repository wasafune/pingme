/* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */

const mongoose = require('mongoose');
const MongodbMemoryServer = require('mongodb-memory-server');

const User = require('../../../mongo/userSchema');

const {
  sendUserInfo,
  pushFollowing,
  subscribeFollowing,
  unsubscribeFollowing,
  pullFollowing,
  pushNotification,
  pullAllNotifications,
  retrieveNotifications,
} = require('../usersUpdate');

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

describe('usersUpdate funcs', () => {
  const mangaId = 'hehe123';
  let userId;
  beforeAll(async () => {
    const params = {
      userName: 'PoggestChampion321',
      password: 'password',
      age: 42,
    };
    const mockUser = new User(params);
    await mockUser.save();
    const result = await User.findOne({ userName: 'PoggestChampion321' });
    userId = result.id;
  });
  beforeEach(async () => {
    beforeEach(async () => {
      await User.findByIdAndUpdate(userId, {
        $pull: { followingList: {} },
        $set: { followingCount: 0 },
      });
    });
  });
  afterAll(async () => {
    try {
      await User.collection.drop();
    } catch (err) {
      console.error(err);
    }
  });

  test('sendUserInfo', async () => {
    expect.assertions(1);
    const expected = await User.findById(userId);
    const userInfo = await sendUserInfo(userId);
    expect(userInfo.toObject()).toEqual(expect.objectContaining(expected.toObject()));
  });

  test('pushFollowing with subscribed false, increments followingCount', async () => {
    const expected = { _id: mangaId, subscribed: false };

    expect.assertions(2);
    await pushFollowing(userId, mangaId);
    const result = await User.findById(userId);
    expect(result.followingCount).toBe(1);
    expect(result.followingList[0]).toEqual(expect.objectContaining(expected));
  });

  test('pushFollowing with subscribed true, increments followingCount', async () => {
    const expected = { _id: mangaId, subscribed: true };

    expect.assertions(2);
    await pushFollowing(userId, mangaId, true);
    const result = await User.findById(userId);
    expect(result.followingCount).toBe(1);
    expect(result.followingList[0]).toEqual(expect.objectContaining(expected));
  });

  test('subscribeFollowing', async () => {
    expect.assertions(3);
    await Promise.all([
      pushFollowing(userId, 'poggers'),
      pushFollowing(userId, 'swiftrage'),
      pushFollowing(userId, 'wutface'),
    ]);
    await subscribeFollowing(userId, 'swiftrage');
    const resArr = await Promise.all([
      User.findOne({ 'followingList._id': 'swiftrage' }, { 'followingList.$': 1 }),
      User.findOne({ 'followingList._id': 'poggers' }, { 'followingList.$': 1 }),
      User.findOne({ 'followingList._id': 'wutface' }, { 'followingList.$': 1 }),
    ]);
    expect(resArr[0].followingList[0].subscribed).toBe(true);
    expect(resArr[1].followingList[0].subscribed).toBe(false);
    expect(resArr[2].followingList[0].subscribed).toBe(false);
  });

  test('unsubscribeFollowing', async () => {
    expect.assertions(3);
    await Promise.all([
      pushFollowing(userId, 'poggers', true),
      pushFollowing(userId, 'swiftrage', true),
      pushFollowing(userId, 'wutface', true),
    ]);
    await unsubscribeFollowing(userId, 'swiftrage');
    const resArr = await Promise.all([
      User.findOne({ 'followingList._id': 'swiftrage' }, { 'followingList.$': 1 }),
      User.findOne({ 'followingList._id': 'poggers' }, { 'followingList.$': 1 }),
      User.findOne({ 'followingList._id': 'wutface' }, { 'followingList.$': 1 }),
    ]);
    expect(resArr[0].followingList[0].subscribed).toBe(false);
    expect(resArr[1].followingList[0].subscribed).toBe(true);
    expect(resArr[2].followingList[0].subscribed).toBe(true);
  });

  test('pullFollowing, decrements followingCount', async () => {
    expect.assertions(4);
    await Promise.all([
      pushFollowing(userId, 'poggers', true),
      pushFollowing(userId, 'swiftrage', true),
      pushFollowing(userId, 'wutface', true),
    ]);
    await pullFollowing(userId, 'swiftrage');
    const result = await User.findById(userId);
    expect(result.followingList.length).toBe(2);
    expect(result.followingCount).toBe(2);
    expect(result.followingList[0]._id).not.toBe('swiftrage');
    expect(result.followingList[1]._id).not.toBe('swiftrage');
  });

  test('pushNotification', async () => {
    const expected = { _id: mangaId, title: 'hidomo', latest: 213 };

    expect.assertions(1);
    await pushNotification(userId, mangaId, 'hidomo', 213);
    const result = await User.findById(userId);
    expect(result.notificationStack[0]).toEqual(expect.objectContaining(expected));
  });

  test('pullAllNotifications', async () => {
    expect.assertions(2);
    await User.findByIdAndUpdate(
      userId,
      { $pull: { notificationStack: {} } },
    );
    await pushNotification(userId, mangaId, 'hidomo', 213);
    await pushNotification(userId, 'haha321', 'coggers', 213);
    const result = await User.findById(userId);
    expect(result.notificationStack.length).toBe(2);
    await pullAllNotifications(userId);
    const result2 = await User.findById(userId);
    expect(result2.notificationStack.length).toBe(0);
  });

  test('retrieveNotifications', async () => {
    const expected1 = { _id: 'hehe123', title: 'hidomo', latest: 333 };
    const expected2 = { _id: 'haha321', title: 'coggers', latest: 213 };

    expect.assertions(3);
    await User.findByIdAndUpdate(
      userId,
      { $pull: { notificationStack: {} } },
    );
    await pushNotification(userId, mangaId, 'hidomo', 213);
    await pushNotification(userId, 'haha321', 'coggers', 213);
    await pushNotification(userId, mangaId, 'hidomo', 14);
    await pushNotification(userId, mangaId, 'hidomo', 333);
    const res = await retrieveNotifications(userId);
    expect(Object.keys(res).length).toBe(2);
    expect(res[mangaId]).toEqual(expect.objectContaining(expected1));
    expect(res.haha321).toEqual(expect.objectContaining(expected2));
  });
});
