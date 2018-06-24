const nodemailer = require('nodemailer');

const { notificationStackToObj } = require('./helpers');

const { GMAIL_ACCT, GMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_ACCT,
    pass: GMAIL_PASS,
  },
});

console.log(GMAIL_ACCT, GMAIL_PASS)

const emailUsers = (usersArr) => {
  const promiseArr = [];
  usersArr.forEach((obj) => {
    const nofitificationObj = notificationStackToObj(obj.notificationStack);
    const notificationArr = Object.values(nofitificationObj)
      .map(notifObj => `${notifObj.title} ch: ${notifObj.latest}`);
    const subject = Object.keys(nofitificationObj).length > 1
      ? `${obj.notificationStack[0].title} and others titles updated!`
      : `${obj.notificationStack[0].title} updated!`;
    const html =
      '<p>The following titles have been updated:</p>' +
      `<p>${notificationArr.join('</p><p>')}</p>` +
      '<br>' +
      '<p>Best,</p>' +
      '<p>Peter from PingMe</p>';
    const mailOptions = {
      from: GMAIL_ACCT,
      to: obj.email,
      subject,
      html,
    };
    promiseArr.push(transporter.sendMail(mailOptions));
  });
  return promiseArr;
};

module.exports = {
  emailUsers,
};
