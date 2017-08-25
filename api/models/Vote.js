/**
 * Vote.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    voteId: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    qualityRate: {
      type: 'integer'
    },
    speedRate: {
      type: 'integer'
    },
    environmentRate: {
      type: 'integer'
    },
    impactRate: {
      type: 'integer'
    },
    voter: {
      model: 'user'
    },
    voteTarget: {
      model: 'stand'
    }
  }
};
