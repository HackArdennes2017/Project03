'use strict';

const request = require('request');
var CronJob = require('cron').CronJob;

const config = {
  protocol: 'http',
  host: 'localhost',
  port: 1337
};

const userLimit = 100;
const standLimit = 56;

const req = (name, bodyReq) => {
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      uri: config.protocol+'://'+config.host+':'+config.port+'/'+name,
      json: true,
      body: bodyReq
    }, (error, response, body) => {
      if (error) {
        reject(error);
      }
      else {
        resolve(body);
      }
    });
  });
};

const reqGet = (name) => {
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      uri: config.protocol+'://'+config.host+':'+config.port+'/'+name,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject(error);
      }
      else {
        resolve(body);
      }
    });
  });
};

new CronJob('* * * * * *', function() {
  const userId = Math.round(Math.random() * userLimit + 1);
  const standID = Math.round(Math.random() * standLimit + 1);

  const rateSpeed = Math.round(Math.random() * 3 + 1);
  const rateQuality = Math.round(Math.random() * 3 + 1);

  req('user', {
    userId: userId,
    cookieId: 5546846648,
  })
    .then(() => {
      req('vote', {
        qualityRate: rateQuality,
        speedRate: rateSpeed,
        impactRate: 1,
        voter: userId,
        voteTarget: standID
      })
        .then(() => console.log(userId+' voted on stand id '+standID))
        .catch(err => console.error(err));
    })
    .catch((err) => {
      console.error('Error on user push' + err);
      req('vote', {
        qualityRate: rateQuality,
        speedRate: rateSpeed,
        impactRate: 1,
        voter: userId,
        voteTarget: standID
      }).then(() => console.log(userId+' voted on stand id '+standID))
        .catch(err => console.error(err));;
    })

}, null, true, 'America/Los_Angeles');
