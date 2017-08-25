/**
 * MapController
 *
 * @description :: Server-side logic for managing maps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function(req, res) {
    json = "{\"GPSlongitude\": \"49.765190\",\"GPSlatitude\": \"4.709390\"}";
    res.view('map', {
      stds: json
    });
  }

};

