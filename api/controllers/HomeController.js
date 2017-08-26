/**
 * MapController
 *
 * @description :: Server-side logic for managing maps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const moment = require('moment');

module.exports = {

  index: function(req, res) {
    Stand.find().exec(function (err, categories) {
      if (err) return res.serverError(err);

      const optionRequest = {
        'createdAt': {'>': moment().subtract(15, 'minutes').format()}
      };
      const hotness = {};

      Vote.find().where(optionRequest).exec(function afterFind(err, votes) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          votes.forEach((vote) => {
            if (!hotness[vote.voteTarget]) {
              hotness[vote.voteTarget] = {
                speedRate: [],
                environmentRate: [],
                qualityRate: []
              };
            }
            hotness[vote.voteTarget].speedRate.push(vote.speedRate);
            hotness[vote.voteTarget].environmentRate.push(vote.environmentRate);
            hotness[vote.voteTarget].qualityRate.push(vote.qualityRate);
          });
          Object.keys(hotness).forEach((key) => {
            Object.keys(hotness[key]).forEach((fieldRate) => {
              let sum = 0;
              hotness[key][fieldRate] = hotness[key][fieldRate].filter((rate) => {
                return typeof rate === 'number';
              });

              hotness[key][fieldRate].forEach((rate) => {
                sum +=rate;
              });
              if (sum !== 0 || typeof sum !== 'number') {
                const average = sum / hotness[key][fieldRate].length;
                hotness[key][fieldRate] = {
                  average: average
                };
                if (average >= 2.5) {
                  hotness[key][fieldRate].color = 'vert';
                }
                else if (average >= 1.5) {
                  hotness[key][fieldRate].color = 'jaune';
                }
                else {
                  hotness[key][fieldRate].color = 'rouge';
                }
              }
              else {
                hotness[key][fieldRate] = {
                  average: 0,
                  color: 'gris'
                }
              }
            });
          });
          Object.keys(categories).forEach((standId) => {
            categories[standId].rates = hotness[standId];
          });
          return res.view('homepage', { stands: categories });
        }
      });
    });
  }

};

