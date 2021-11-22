let Player = require("../models/Players");


exports.addPlayer = function (req, res) {
  console.log(req.body)
    const newPlayer = {
      id: "",
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      team: req.body.team,
      playerid: req.body.playerid
    };
    Player.create(newPlayer, function (err, result) {
      if (err) {
        return res.send(err);
      } else {
        result.id = String(result._id);
        Player.findByIdAndUpdate(
          { _id: result.id },
          result,
          function (err, result) {
            if (err) {
              return res.send(err);
            }
            else
              return res.json(result);
          }
        );
      }
    });
  };