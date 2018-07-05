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

const signupEmail = (email, name, hash) => {
  const subject = 'Welcome to PingMe! Please verify your email.';
  const verifyLink = `https://www.pingme.me/verify?${email}#${hash}`;
  const html = '<p>Welcome!</p>' +
    '<p>Please verify your email by clicking the link provided below:</p>' +
    `<p>${verifyLink}</p>` +
    '<br>' +
    '<p>Best,</p>' +
    '<p>Peter</p>' +
    '<p>from PingMe</p>' +
    '<br>';
  const mailOptions = {
    from: GMAIL_ACCT,
    to: email,
    subject,
    html,
  };
  transporter.sendMail(mailOptions);
};

const emailUsers = (usersArr) => {
  const promiseArr = [];
  usersArr.forEach((obj) => {
    const nofitificationObj = notificationStackToObj(obj.notificationStack);
    const notificationArr = Object.values(nofitificationObj)
      .map(notifObj => `${notifObj.title} ch: ${notifObj.latest}`);
    const subject = Object.keys(nofitificationObj).length > 1
      ? `${obj.notificationStack[0].title} and others titles updated!`
      : `${obj.notificationStack[0].title} updated!`;
    const unsubLink = `"https://www.pingme.me/unsub?${obj.email}#${obj.password}"`;
    const html =
      '<p>The following titles have been updated:</p>' +
      `<p>${notificationArr.join('</p><p>')}</p>` +
      '<br>' +
      '<p>Best,</p>' +
      '<p>Peter</p>' +
      '<p>from PingMe</p>' +
      '<br>' +
      `<a href=${unsubLink}>Unsubsribe</a>`;
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
  signupEmail,
  emailUsers,
};
