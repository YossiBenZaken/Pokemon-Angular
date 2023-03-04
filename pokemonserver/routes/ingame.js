const express = require('express');
const router = express.Router();
const { query } = require('../services/db');
const { rank, updatePokedex } = require('../services/helpersv2');
const middleware = require('../services/middleware');
router.use(middleware);
router.get('/getSettings/:settings', async (req, res) => {
  const { settings } = req.params;
  if (!settings) res.sendStatus(500);
  const data = await query('SELECT * FROM settings WHERE setting = ?', [
    settings,
  ]);
  res.status(200).json({
    status: 'success',
    length: data?.length,
    data,
  });
});
router.post('/updatePokedex', async (req, res) => {
  const { wild_id, old_id, wat } = req.body;
  await updatePokedex(wild_id, old_id, wat, req.userId);
  res.sendStatus(200);
});
router.get('/updateOnline', async (req, res) => {
  await query("UPDATE `gebruikers` SET `online`='?' WHERE `user_id`=?", [
    new Date().getTime(),
    req.userId,
  ]);
  res.sendStatus(200);
});
router.get('/rankOff/:kind', async (req, res) => {
  let { kind } = req.params;
  switch (kind) {
    case 'werken':
    case 'race':
      kind = 1;
      break;
    case 'whoisitquiz':
    case 'attack_run':
      kind = 2;
      break;
    default:
      kind = 3;
  }
  const data = await query(
    'SELECT `rank` FROM `gebruikers` WHERE `user_id`= ?',
    [req.userId]
  );
  let playerRank = data[0].rank;
  const rankInfo = await rank(playerRank);
  const result = Math.floor(((rankInfo.ranknummer / 0.15) * kind) / 3);
  await query(
    'UPDATE `gebruikers` SET `rankexp`=`rankexp`-? WHERE `user_id`=?',
    [result, req.userId]
  );
  res.sendStatus(200);
});
module.exports = router;
