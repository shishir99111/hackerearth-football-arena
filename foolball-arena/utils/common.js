const axios = require('axios');
const uuid = require('uuid');
const crypto = require('crypto');
const fs = require('fs');
const moment = require('moment');

/* ========================== Basic Utilities ============================ */

function isValidEmailAddress(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function trimObject(obj) {
  let value;
  Object.keys(obj).forEach((key) => {
    value = obj[key];
    if (value && typeof value === 'string') {
      obj[key] = value.trim();
    } else if (value && value.constructor === Object && typeof value === 'object') {
      obj[key] = trimObject(value);
    }
  });
  return obj;
}

function getErrorMessages(error) {
  if (error.details && error.details.length > 0) {
    return error.details.reduce((p, v) => {
      return `${p}${v.message} </br>`;
    }, '');
  }
  return error.message;
}

function sanitizeObj(obj) {
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (typeof val !== 'boolean') {
      if (val) {
        obj[key] = val || '';
      } else {
        delete obj[key];
      }
    }
  });
  return obj;
}

function generateCorellationId() {
  return `DEMO-${uuid.v1()}`;
}

function getJoiErrors(error) {
  if (error && error.isJoi) {
    const errors = error.details.map((error) => {
      return error.message;
    });
    return errors.join(',');
  }
  return '';
}

/** MANUAL * */

function fixLength(content, fixLen) {
  const len = content.length;
  let c = content;
  const maxLenString = Array(100).join('X');
  if (len > fixLen) {
    c = content.substring(0, fixLen);
  } else if (len < fixLen) {
    c = c.concat(maxLenString);
    c = c.substring(0, fixLen);
  }
  return c;
}

function getAppName() {
  return require('../package.json').name;
}

function toUTCDate(date) {
  return moment.utc(date).format('DD-MM-YYYYTHH:mm:ss');
}

module.exports = function (obj) {
  obj.fixLength = fixLength;
  obj.isValidEmailAddress = isValidEmailAddress;
  obj.trimObject = trimObject;
  obj.getErrorMessages = getErrorMessages;
  obj.sanitizeObj = sanitizeObj;
  obj.generateCorellationId = generateCorellationId;
  obj.getJoiErrors = getJoiErrors;
  obj.getAppName = getAppName;
  obj.toUTCDate = toUTCDate;
};