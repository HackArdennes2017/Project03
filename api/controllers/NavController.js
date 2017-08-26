/**
 * NavController
 *
 * @description :: Server-side logic for managing navs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const moment = require('moment');

module.exports = {
	stand: function (req, res) {
	  Stand.findOne({where: {standId: req.params.standId}})
      .exec(function(err, stand){
        if (err) {
          res.status(500).send(err);
        }
        else if (typeof stand === 'undefined') {
          res.status(404).send(new Error ('No data found'));
        }
        else {
          const optionRequest = {
            'createdAt': {'>': moment().subtract(15, 'minutes').format()},
            voteTarget: req.params.standId
          };
          const hotness = {};
          hotness[req.params.standId] = {
            speedRate: [],
            environmentRate: [],
            qualityRate: []
          };

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
              console.log(hotness);
              res.view('stand', {stand: stand, stats: hotness[req.params.standId]});
            }
          });
        }
      });
  },

  vote: function (req, res) {
    User.findOrCreate({cookieId: req.cookies.visiteur}).exec(function afterFind(err, user) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        const newVote = {voter: user.userId, voteTarget: req.body.standId};
        newVote[req.body.typeVote] = req.body.rate;

        Vote.create(newVote).exec(function afterFind(err, vote) {
          if (err) {
            res.status(500).send(err);
          }
          else {
            res.redirect('/stand/'+req.body.standId);
          }
        });
      }
    });
  }
};

