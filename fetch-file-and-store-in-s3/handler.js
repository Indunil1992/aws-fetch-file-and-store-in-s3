'use strict';

const fetch = require('node-fetch');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const s3 = new AWS.S3();

module.exports.save = (event, context, callback) => {
  fetch('https://drive.google.com/open?id=1qUQdLIvOW_SdYl_64afr09mX5lSo99eL')
    .then((response) => {
      if (response.ok) {
        return response;
      }
      return Promise.reject(new Error(
        `Failed to fetch ${response.url}: ${response.status} ${response.statusText}`));
    })
    .then(response => response.buffer())
    .then(buffer => (
      s3.putObject({
        "Body": buffer,
        "Bucket": "indunil.trigger",
        "Key": event.key
      }).promise()
    ))
    .then(v => callback(null, v), callback);
};
