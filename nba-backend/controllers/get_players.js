let Player = require("../models/Players");

exports.getPlayers= function (req, res) {
    Player.find({}, function (err, result) {
      if (err) {
        return res.send(err);
      }
      res.setHeader("Content-Range", `${result.length}`);
      res.json(result);
    });
  };