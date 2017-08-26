/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    userId: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    cookieId: {
      type: 'string',
      unique: true
    },
    votes: {
      collection: 'vote',
      via: 'voter'
    }

  }
};

