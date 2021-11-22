var express = require('express');
var router = express.Router();

var GetFavoritePlayers=require('../controllers/get_players')
var AddNewPlayer= require('../controllers/add_new_player')

router.get('/',GetFavoritePlayers.getPlayers);
router.post('/',AddNewPlayer.addPlayer);

module.exports = router;