const express = require('express');
const router = express.Router();
const { query } = require('../services/db');

router.get('/getRankingList', async (_, res) => {
  const data = await query(
    "SELECT username, premiumaccount, online, rank, land, admin  FROM gebruikers WHERE account_code='1' ORDER BY rank DESC, rankexp DESC, username ASC"
  );
  res.send(data);
});
module.exports = router;
