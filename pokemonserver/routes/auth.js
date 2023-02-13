var express = require('express');
var router = express.Router();
const con = require('../services/db');
const jwt = require('jsonwebtoken');
/* GET home page. */
router.post('/register', (req, res) => {
  const { land, userCharacter, inlognaam, wachtwoordmd5, email, wereld } =
    req.body;
  con.query(
    'INSERT INTO `gebruikers` (`account_code`, `land`, `profielfoto`, `username`, `datum`, `aanmeld_datum`, `wachtwoord`, `email`, `wereld`) VALUES (1, ?, ?, ?, NOW(),NOW(), ?, ? , ?)',
    [land, userCharacter, inlognaam, wachtwoordmd5, email, wereld],
    (err, data) => {
      if (err) {
        res.status(400).send(err);
        return;
      }
      // console.log(err);
      let userId = data.insertId;
      con.query(
        'INSERT INTO `gebruikers_item` (`user_id`) VALUES (?)',
        [userId, userId, userId],
        (err, data) => {
          if (err) res.sendStatus(500);
        }
      );
      con.query(
        'INSERT INTO `gebruikers_badges` (`user_id`) VALUES (?)',
        [userId, userId, userId],
        (err, data) => {
          if (err) res.sendStatus(500);
        }
      );
      con.query(
        'INSERT INTO `gebruikers_tmhm` (`user_id`) VALUES (?)',
        [userId, userId, userId],
        (err, data) => {
          if (err) res.sendStatus(500);
          res.sendStatus(200);
        }
      );
    }
  );
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  con.query(
    'SELECT `username`, `wachtwoord`, `user_id` FROM `gebruikers` WHERE `username` = ?',
    [username],
    (err, data) => {
      if (err) res.sendStatus(500);
      if (data.length > 0) {
        let pass = data[0].wachtwoord;
        if (pass !== password) {
          res.sendStatus(400);
        } else {
          con.query(
            'SELECT gebruiker FROM ban WHERE gebruiker = ?',
            [username],
            (err, hasBan) => {
              if (err) res.sendStatus(500);
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
          );
        }
      } else {
        res.sendStatus(404);
      }
    }
  );
});

router.get('/getCharacters', (req, res) => {
  con.query(
    'SELECT naam FROM characters ORDER BY id ASC',
    (err, characters) => {
      res.send(characters);
    }
  );
});

module.exports = router;
