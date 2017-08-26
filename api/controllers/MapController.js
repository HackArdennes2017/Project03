/**
 * MapController
 *
 * @description :: Server-side logic for managing maps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function(req, res) {
    Stand.find().exec(function (err, categories) {
      if (err) return res.serverError(err);
      return res.view('map', {
        stands: categories
      });

    });
  }

};

