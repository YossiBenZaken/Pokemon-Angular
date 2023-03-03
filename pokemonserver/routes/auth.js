const express = require('express');
const router = express.Router();
const { query } = require('../services/db');
const jwt = require('jsonwebtoken');
/* GET home page. */
router.post('/register', async (req, res) => {
  const { land, userCharacter, inlognaam, wachtwoordmd5, email, wereld } =
    req.body;
  const data = await query(
    'INSERT INTO `gebruikers` (`account_code`, `land`, `profielfoto`, `username`, `datum`, `aanmeld_datum`, `wachtwoord`, `email`, `wereld`) VALUES (1, ?, ?, ?, NOW(),NOW(), ?, ? , ?)',
    [land, userCharacter, inlognaam, wachtwoordmd5, email, wereld]
  );
  let userId = data.insertId;
  await query('INSERT INTO `gebruikers_item` (`user_id`) VALUES (?)', [userId]);
  await query('INSERT INTO `gebruikers_badges` (`user_id`) VALUES (?)', [
    userId,
  ]);
  await query('INSERT INTO `gebruikers_tmhm` (`user_id`) VALUES (?)', [userId]);
  res.sendStatus(200);
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const data = await query(
    'SELECT `username`, `wachtwoord`, `user_id` FROM `gebruikers` WHERE `username` = ?',
    [username]
  );
  if (data.length > 0) {
    let pass = data[0].wachtwoord;
    if (pass !== password) {
      res.sendStatus(400);
    } else {
      const hasBan = await query(
        'SELECT gebruiker FROM ban WHERE gebruiker = ?',
        [username]
      );
      if (hasBan.length > 0) {
        res.status(200).json({
          message: 'You are temporarily banned.',
        });
      } else {
        const { user_id, username } = data[0];
        let jwtToken = jwt.sign(
          {
            user_id,
            username,
          },
          'supersecret',
          {
            expiresIn: '1d',
          }
        );
        res.status(200).json({
          info: 'User Login successful',
          username,
          token: jwtToken,
        });
      }
    }
  } else {
    res.sendStatus(404);
  }
});

router.get('/getCharacters', async (_, res) => {
  const characters = await query('SELECT naam FROM characters ORDER BY id ASC');
  res.send(characters);
});

router.get('/getOnline', async (_, res) => {
  let date = new Date().getTime();
  const data = await query(
    "SELECT user_id, username, premiumaccount, admin, online, buddy, blocklist,ismobile FROM gebruikers WHERE online+'8000'>'" +
      Math.round(date / 1000) +
      "' ORDER BY rank DESC, rankexp DESC, username ASC"
  );
  res.send(data);
});

module.exports = router;
