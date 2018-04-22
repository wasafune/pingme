const mongoose = require('mongoose');
const MongodbMemoryServer = require('mongodb-memory-server');

const User = require('../../../mongo/userSchema');

const {
  getUserInfo,
  getUserInfoWithId,
} = require('../usersQuery');

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

describe('usersQuery funcs', () => {
  let user1;
  beforeAll(async () => {
    try {
      user1 = await User.create({ userName: 'meruem', password: 'komugi', age: 21 });
      user1 = user1.toObject();
      delete user1.password;
    } catch (err) {
      console.error(err);
    }
  });
  afterAll(async () => {
    try {
      await User.collection.drop();
    } catch (err) {
      console.error(err);
    }
  });
  test('getUserInfo', async () => {
    expect.assertions(1);
    await expect(getUserInfo('meruem')).resolves.toEqual(expect.objectContaining(user1));
  });
  test('getUserInfoWithId', async () => {
    expect.assertions(1);
    await expect(getUserInfoWithId(user1._id)).resolves.toEqual(expect.objectContaining(user1));
  });
});
