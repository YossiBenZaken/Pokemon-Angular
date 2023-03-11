const express = require('express');
const router = express.Router();
const { query } = require('../services/db');
const middleware = require('../services/middleware');
const { ranker } = require('../services/helpers');
router.use(middleware);
router.get('/getUserInfo', async (req, res) => {
  const data = await query(
    "SELECT g.*, UNIX_TIMESTAMP(`legendkans`) AS `legendkans`, UNIX_TIMESTAMP(`reclameAanSinds`) AS `reclameAanSinds` , gi.*, SUM(`Poke ball` + `Great ball` + `Ultra ball` + `Premier ball` + `Net ball` + `Dive ball` + `Nest ball` + `Repeat ball` + `Timer ball` + `Master ball` + `Potion` + `Super potion` + `Hyper potion` + `Full heal` + `Revive` + `Max revive` + `Pokedex` + `Pokedex chip` + `Pokedex zzchip` +`Fishing rod` + `Cave suit` + `Bike` + `Protein` + `Iron` + `Carbos` + `Calcium` + `HP up` + `Rare candy` + `Duskstone` + `Firestone` + `Leafstone` + `Moonstone` + `Ovalstone` + `Shinystone` + `Sunstone` + `Thunderstone` + `Waterstone` + `Dawnstone` + `TM01` + `TM02` + `TM03` + `TM04` + `TM05` + `TM06` + `TM07` + `TM08` + `TM09` + `TM10` + `TM11` + `TM12` + `TM13` + `TM14` + `TM15` + `TM16` + `TM17` + `TM18` + `TM19` + `TM20` + `TM21` + `TM22` + `TM23` + `TM24` + `TM25` + `TM26` + `TM27` + `TM28` + `TM29` + `TM30` + `TM31` + `TM32` + `TM33` + `TM34` + `TM35` + `TM36` + `TM37` + `TM38` + `TM39` + `TM40` + `TM41` + `TM42` + `TM43` + `TM44` + `TM45` + `TM46` + `TM47` + `TM48` + `TM49` + `TM50` + `TM51` + `TM52` + `TM53` + `TM54` + `TM55` + `TM56` + `TM57` + `TM58` + `TM59` + `TM60` + `TM61` + `TM62` + `TM63` + `TM64` + `TM65` + `TM66` + `TM67` + `TM68` + `TM69` + `TM70` + `TM71` + `TM72` + `TM73` + `TM74` + `TM75` + `TM76` + `TM77` + `TM78` + `TM79` + `TM80` + `TM81` + `TM82` + `TM83` + `TM84` + `TM85` + `TM86` + `TM87` + `TM88` + `TM89` + `TM90` + `TM91` + `TM92` + `HM01` + `HM02` + `HM03` + `HM04` + `HM05` + `HM06` + `HM07` + `HM08`) AS items FROM gebruikers AS g INNER JOIN gebruikers_item AS gi ON g.user_id = gi.user_id  INNER JOIN gebruikers_tmhm AS gtmhm ON g.user_id = gtmhm.user_id WHERE g.user_id = '?' GROUP BY g.user_id",
    [req.userId]
  );
  let user = data[0];
  res.send(user);
  if (user.rankexpnodig <= user.rankexp) {
    await ranker('standaard', req.userId);
  }
});
router.get('/getUserPokemon', async (req, res) => {
  const data = await query(
    "SELECT pw.naam, pw.type1, pw.type2, pw.zeldzaamheid, pw.groei, pw.aanval_1, pw.aanval_2, pw.aanval_3, pw.aanval_4, ps.* FROM pokemon_wild AS pw INNER JOIN pokemon_speler AS ps ON ps.wild_id = pw.wild_id WHERE ps.user_id=? AND ps.opzak='ja' ORDER BY ps.opzak_nummer ASC",
    [req.userId]
  );
  res.send(data);
});
router.get('/getAllUserPokemon', async (req, res) => {
  const data = await query(
    'SELECT pw.naam, pw.type1, pw.type2, pw.zeldzaamheid, pw.groei, pw.aanval_1, pw.aanval_2, pw.aanval_3, pw.aanval_4, ps.* FROM pokemon_wild AS pw INNER JOIN pokemon_speler AS ps ON ps.wild_id = pw.wild_id WHERE ps.user_id=?',
    [req.userId]
  );
  if (data.length === 0) res.sendStatus(404);
  else res.send(data);
});
router.get('/getUserMessages', async (req, res) => {
  const results = await query(
    'SELECT * FROM `berichten` WHERE `ontvanger_id`=?',
    [req.userId]
  );
  res.send(results);
});
router.get('/getUserBuddies', async (req, res) => {
  const data = await query(
    'SELECT * FROM `friends` WHERE `to` = ? AND `status` = 0',
    [req.userId]
  );
  const myfriends = await query(
    "SELECT * FROM gebruikers G, friends F WHERE CASE WHEN F.to = ? THEN F.from = G.user_id WHEN F.from = ? THEN F.to = G.user_id END AND F.status='1'",
    [req.userId, req.userId]
  );
  res.send({
    requested: data,
    myfriends,
  });
});

router.get('/getUserItems', async (req, res) => {
  const items = await query(
    'SELECT gebruikers_item.*, gebruikers_tmhm.* FROM gebruikers_item INNER JOIN gebruikers_tmhm ON gebruikers_item.user_id = gebruikers_tmhm.user_id WHERE gebruikers_item.user_id = ?',
    [req.userId]
  );
  res.send(items[0]);
});

module.exports = router;
