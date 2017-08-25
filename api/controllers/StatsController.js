/**
 * StatsController
 *
 * @description :: Server-side logic for managing stats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const moment = require('moment');

module.exports = {
  hotpoint: (req, res) => {
    const optionRequest = {'createdAt': {'>': moment().subtract(15, 'minutes').format()}};

    if (req.params.standId) {
      optionRequest.voteTarget = req.params.standId;
    }

    console.log(optionRequest);

    Vote.find().where(optionRequest).exec(function afterFind(err, votes) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        const hotness = {};
        votes.forEach((vote) => {
          if (!hotness[vote.voteTarget]) {
            hotness[vote.voteTarget] = [];
          }
          hotness[vote.voteTarget].push(vote.speedRate);
        });
        Object.keys(hotness).forEach((key) => {
          console.log(hotness[key]);
          let sum = 0;
          hotness[key].forEach((speedRate) => {
            sum +=speedRate;
          });
          hotness[key] = sum / hotness[key].length;
        });
        res.json(hotness);
      }
    });
  }
};

