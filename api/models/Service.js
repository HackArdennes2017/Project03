/**
 * Service.js
 *
 * @description :: Model of all service you can find in a festival
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    serviceId: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    name: {
      type: 'string'
    },
    stands: {
      collection: 'stand',
      via: 'type'
    }
  }
};

