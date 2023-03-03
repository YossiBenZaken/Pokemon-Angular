const express = require('express');
const router = express.Router();
const { query } = require('../services/db');
const { rank } = require('../services/helpers');
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
  const data = await query(
    'SELECT pok_gezien, pok_bezit, pok_gehad FROM gebruikers WHERE user_id = ?',
    [req.userId]
  );
  let hold = data[0].pok_bezit.split(',').includes(wild_id);
  let had = data[0].pok_gehad.split(',').includes(wild_id);
  let had_old = data[0].pok_gehad.split(',').includes(old_id);
  let seen = data[0].pok_gezien.split(',').includes(wild_id);
  let query;
  switch (wat) {
    case 'egg':
    case 'buy':
      if (!seen) query = "`pok_gezien`=concat(pok_gezien,'," + wild_id + "')";
      if (!hold) query += ",`pok_bezit`=concat(pok_bezit,'," + wild_id + "')";
      break;
    case 'see':
      if (!seen) query = "`pok_gezien`=concat(pok_gezien,'," + wild_id + "')";
      break;
    case 'catch':
      if (!hold) query = "`pok_bezit`=concat(pok_bezit,'," + wild_id + "')";
      break;
    case 'release':
      if (!had) query = "`pok_gehad`=concat(pok_gehad,'," + wild_id + "')";
      break;
    case 'evo':
      if (!seen) query = "`pok_gezien`=concat(pok_gezien,'," + wild_id + "')";
      if (!hold) query += ",`pok_bezit`=concat(pok_bezit,'," + wild_id + "')";
      if (!had_old) query += ",`pok_gehad`=concat(pok_gehad,'," + old_id + "')";
      break;
  }
  if (query) {
    await query('UPDATE gebruikers SET ' + query + ' WHERE user_id=?', [
      req.userId,
    ]);
  }
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
  rank(playerRank, async (err, rank) => {
    const result = Math.floor(((rank.ranknummer / 0.15) * kind) / 3);
    await query(
      'UPDATE `gebruikers` SET `rankexp`=`rankexp`-? WHERE `user_id`=?',
      [result, req.userId]
    );
    res.sendStatus(200);
  });
});
module.exports = router;
