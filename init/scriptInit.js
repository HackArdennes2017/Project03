'use strict';

const request = require('request');
const async = require('async');

const serviceData = require('./service.json');
const standData = require('./stand.json');
const zoneData = require('./zone.json');

const config = {
  protocol: 'http',
  host: 'localhost',
  port: 1337
};

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

const run = () => {
  async.series([
    (callback) => {
      async.eachSeries(serviceData, (service, next) => {
        req('service', service)
          .then((resultCreation) => {
            next();
          })
          .catch((err) => {
            next(err);
          });
      }, (err) => {
        if (err) {
          callback(err);
        }
        else {
          callback();
        }
      });
    },
    (callback) => {
      async.eachSeries(zoneData, (zone, next) => {
        req('zone', zone)
          .then((resultCreation) => {
            next();
          })
          .catch((err) => {
            next(err);
          });
      }, (err) => {
        if (err) {
          callback(err);
        }
        else {
          callback();
        }
      });
    },
    (callback) => {
      async.eachSeries(standData, (stand, next) => {
        req('stand', stand)
          .then((resultCreation) => {
            next();
          })
          .catch((err) => {
            next(err);
          });
      }, (err) => {
        if (err) {
          callback(err);
        }
        else {
          callback();
        }
      });
    }
  ]);
};

run ();
