const router = require('express').Router();
const con = require('../services/db');
const middleware = require('../services/middleware');
router.use(middleware);

router.post('/personal', (req, res) => {
  const {
    firstname,
    lastname,
    teamzien,
    buddieszien,
    badgeszien,
    dueluitnodiging,
    battleScreen,
  } = req.body;
  con.query(
    'UPDATE `gebruikers` SET `voornaam`=?, `achternaam`=?, `buddieszien`=?, `teamzien`=?, `badgeszien`=?, `dueluitnodiging`=?, `battleScreen`=? WHERE `user_id`=?',
    [
      firstname,
      lastname,
      buddieszien,
      teamzien,
      badgeszien,
      dueluitnodiging,
      battleScreen,
      req.userId,
    ],
    (err, data) => {
      if (err) res.sendStatus(500);
      res.send(data);
    }
  );
});
router.post('/password', (req, res) => {
  const { newPass } = req.body;
  con.query(
    'UPDATE `gebruikers` SET `wachtwoord`=? WHERE `user_id`=?',
    [newPass, req.userId],
    (err, data) => {
      if (err) res.sendStatus(500);
      res.send(data);
    }
  );
});
router.post('/restart', (req, res) => {
  const { world } = req.body;
  con.query('DELETE FROM `gebruikers_tmhm` WHERE `user_id`=?;', [req.userId]);
  con.query('DELETE FROM `gebruikers_badges` WHERE `user_id`=?;', [req.userId]);
  con.query('DELETE FROM `gebruikers_item` WHERE `user_id`=?;', [req.userId]);
  con.query('DELETE FROM `pokemon_speler` WHERE `user_id`=?;', [req.userId]);
  con.query('DELETE FROM `transferlijst` WHERE `user_id`=?;', [req.userId]);
  con.query('DELETE FROM `daycare` WHERE `user_id`=?;', [req.userId]);

  con.query('INSERT INTO `gebruikers_item` (`user_id`) VALUES (?)', [
    req.userId,
  ]);
  con.query('INSERT INTO `gebruikers_badges` (`user_id`) VALUES (?)', [
    req.userId,
  ]);
  con.query('INSERT INTO `gebruikers_tmhm` (`user_id`) VALUES (?)', [
    req.userId,
  ]);
  con.query(
    "UPDATE `gebruikers` SET `datum`=NOW(), `wereld`=?, `silver`=75, `bank`=0, `storten`='3', `huis`='doos', `geluksrad`='1', `rank`='1', `rankexp`='0', `rankexpnodig`='245', `aantalpokemon`='0', `badges`='0', `captcha_tevaak_fout`='0', `werkervaring`='0', `gewonnen`='0', `verloren`='0', `eigekregen`='0', `lvl_choose`='', `wiequiz`='0000-00-00 00:00:00', `werktijd`='0', `pokecentertijd`='0', `gevangenistijd`='0', `geluksrad`='3', `races_winst`='3', `races_verlies`='3', `pok_gezien`='', `pok_bezit`='', `pok_gehad`='' WHERE `user_id`=?",
    [world, req.userId],
    (err, data) => {
      if (err) res.sendStatus(500);
      res.send(data);
    }
  );
});
module.exports = router;
