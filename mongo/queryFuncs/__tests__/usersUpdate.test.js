const mongoose = require('mongoose');
const MongodbMemoryServer = require('mongodb-memory-server');

const User = require('../../../mongo/userSchema');

const {
  pushToUserSubList,
  incrementUserSubCt,
  pullFromUserSubList,
  decrementUserSubCt,
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

describe('mangasUpdate funcs', () => {
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
  afterAll(async () => {
    try {
      await User.collection.drop();
    } catch (err) {
      console.error(err);
    }
  });

  test('pushToUserSubList', async () => {
    const expected = [mangaId];

    expect.assertions(1);
    await pushToUserSubList(userId, mangaId);
    const result = await User.findById(userId);
    expect(result.subscribedList).toEqual(expect.arrayContaining(expected));
  });
  test('incrementUserSubCt', async () => {
    expect.assertions(1);
    await incrementUserSubCt(userId);
    const result = await User.findById(userId);
    expect(result.subscribedCount).toBe(1);
  });
  test('pullFromUserSubList', async () => {
    expect.assertions(2);
    let result = await User.findById(userId);
    expect(result.subscribedList.length).toBe(1);
    await pullFromUserSubList(userId, mangaId);
    result = await User.findById(userId);
    expect(result.subscribedList.length).toBe(0);
  });
  test('decrementUserSubCt', async () => {
    expect.assertions(2);
    let result = await User.findById(userId);
    expect(result.subscribedCount).toBe(1);
    await decrementUserSubCt(userId);
    result = await User.findById(userId);
    expect(result.subscribedCount).toBe(0);
  });
});
