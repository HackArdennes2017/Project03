/**
 * MapController
 *
 * @description :: Server-side logic for managing maps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function(req, res) {
    Stand.find().exec(function (err, stands) {
      if (err) return res.serverError(err);
      return res.view('homepage', {
        stands: stands
      });

    });
  }

};

