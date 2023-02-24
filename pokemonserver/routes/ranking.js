const express = require('express');
const router = express.Router();
const con = require('../services/db');
const { rank } = require('../services/helpers');

router.get('/getRankingList', (_, res) => {
  con.query(
    "SELECT username, premiumaccount, online, rank, land, admin  FROM gebruikers WHERE account_code='1' ORDER BY rank DESC, rankexp DESC, username ASC",
    (_, data) => res.send(data)
  );
});
module.exports = router;
