const genRandomInt = (min, max) => Math.floor((Math.random() * Math.floor(max - min)) + min);

const delay = ms => new Promise(res => setTimeout(res, ms));

// database format title
const parseTitle = (str) => {
  const parsedArr = [];
  str.split('&').forEach((ele, i) => {
    if (!i) {
      parsedArr.push(ele);
      return;
    }
    const splitStart = ele.lastIndexOf(';') + 1;
    parsedArr.push(ele.slice(splitStart));
  });
  // rid extra spaces and convert spaces, underscore, and dashes into space
  let tempStr = parsedArr.join('').trim().toLowerCase();
  tempStr = tempStr.replace(/-|_/g, ' ');
  tempStr = tempStr.replace(/[^\w\s]/gi, '');
  return tempStr.replace(/\s+/g, ' ');
};

const dbTitleToSearchStr = str => str.split(' ').join('_');

const combineAndKeepUniq = (arr1, arr2) => {
  const combined = arr1.concat(arr2);
  return combined.filter((str, i) => combined.indexOf(str) === i);
};

const pushIfNotIncludes = (arr, str) => {
  const result = arr.slice();
  if (!result.includes(str)) result.push(str);
  return result;
};

const notificationStackToObj = arr => arr.reduce((acc, ele) => {
  if (acc[ele._id]) {
    if (acc[ele._id].latest < ele.latest) acc[ele._id].latest = ele.latest;
    return acc;
  }
  acc[ele._id] = ele;
  return acc;
}, {});


module.exports = {
  genRandomInt,
  delay,
  parseTitle,
  dbTitleToSearchStr,
  combineAndKeepUniq,
  pushIfNotIncludes,
  notificationStackToObj,
};
