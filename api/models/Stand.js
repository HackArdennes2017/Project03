/**
 * Stand.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    standId: {
      type: 'integer',
      autoIncrement: true
    },
    name: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    type: {
      model: 'service'
    },
    GPSlongitude: {
      type: 'string'
    },
    GPSlatitude: {
      type: 'string'
    },
    badgeLink: {
      type: 'string'
    },
    votes: {
      collection: 'vote',
      via: 'voteTarget'
    }
  }
};

