const Slack = require('slack-node');

const mangahere = require('./mangahere').scrapeLatest;
const mangapark = require('./mangapark').scrapeLatest;
const mangastream = require('./mangastream').scrapeLatest;
const nineanime = require('./nineanime').scrapeLatest;
const {
  updatedMangasCheck,
  updatedMangasDrop,
  updatedMangasRetrieve,
} = require('./mongoHandler.js');
const { pushNotifications, purgeAllNotifications } = require('../../mongo/queryFuncs/usersUpdate');
const { getNotifyList } = require('../../mongo/queryFuncs/usersQuery');
const { emailUsers } = require('./emailFuncs');

const { SLACK_URI } = process.env;

// slack logic
const slack = new Slack();
slack.setWebhook(SLACK_URI);

// aggregates and handles the latest updates from the sources
const updater = async (req, res) => {
  res.send('updater route');
  try {
    const initCheck = await updatedMangasCheck();
    if (initCheck) await updatedMangasDrop();
    await mangahere();
    await mangapark();
    await mangastream();
    await nineanime();
    const updatedArr = await updatedMangasRetrieve();
    await pushNotifications(updatedArr);
    const notifyList = await getNotifyList();
    await emailUsers(notifyList);
    await purgeAllNotifications();
    slack.webhook({
      channel: 'update-notifs',
      username: 'notifbot',
      text: 'Finished updater',
    }, (err) => {
      if (err) console.error(err);
    });
    console.log('Finished updater.');
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  updater,
};
