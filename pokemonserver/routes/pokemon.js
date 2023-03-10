const express = require('express');
const router = express.Router();
const { query } = require('../services/db');
const {
  rand,
  countPokemonsInHouse,
  updatePokedex,
} = require('../services/helpersv2');
const middleware = require('../services/middleware');
router.use(middleware);

router.get('/getStarterPokemon/:world', async (req, res) => {
  const { world } = req.params;
  const starter = await query(
    `SELECT pokemon_nieuw_starter.wild_id, pokemon_wild.naam, pokemon_wild.type1, pokemon_wild.type2
             FROM pokemon_nieuw_starter
             INNER JOIN pokemon_wild ON pokemon_nieuw_starter.wild_id = pokemon_wild.wild_id
             WHERE pokemon_wild.wereld = ?
             ORDER BY pokemon_nieuw_starter.wild_id ASC`,
    [world]
  );
  const normal = await query(
    `SELECT pokemon_nieuw_gewoon.wild_id, pokemon_wild.naam, pokemon_wild.type1, pokemon_wild.type2
      FROM pokemon_nieuw_gewoon
        INNER JOIN pokemon_wild ON pokemon_nieuw_gewoon.wild_id = pokemon_wild.wild_id
     WHERE pokemon_wild.wereld = ?
        ORDER BY pokemon_nieuw_gewoon.wild_id ASC`,
    [world]
  );
  const babies = await query(
    `SELECT pokemon_nieuw_baby.wild_id, pokemon_wild.naam, pokemon_wild.type1, pokemon_wild.type2
        FROM pokemon_nieuw_baby
          INNER JOIN pokemon_wild ON pokemon_nieuw_baby.wild_id = pokemon_wild.wild_id
       WHERE pokemon_wild.wereld = ?
          ORDER BY pokemon_nieuw_baby.wild_id ASC`,
    [world]
  );
  res.send({ starter, normal, babies });
});

router.post('/choosePokemon', async (req, res) => {
  const { choose } = req.body;
  // Random pokemon loading, and its data
  const pokemonQuery = await query(
    'SELECT pw.wild_id, pw.naam, pw.groei, pw.attack_base, pw.defence_base, pw.speed_base, `pw`.`spc.attack_base`, `pw`.`spc.defence_base`, pw.hp_base, pw.aanval_1, pw.aanval_2, pw.aanval_3, pw.aanval_4 FROM pokemon_wild AS pw WHERE pw.wild_id = ? LIMIT 1',
    [choose]
  );
  // Put the random pokemon in the pokemon_speler table
  const update = await query(
    'INSERT INTO `pokemon_speler` (`wild_id`, `aanval_1`, `aanval_2`, `aanval_3`, `aanval_4`) (SELECT `wild_id`, `aanval_1`, `aanval_2`, `aanval_3`, `aanval_4` FROM `pokemon_wild` WHERE `wild_id`=?)',
    [choose]
  );
  let pokeId = update.insertId;
  await query(
    "UPDATE `gebruikers` SET `aantalpokemon`=`aantalpokemon`+'1', `eigekregen`='1' WHERE `user_id`=?",
    [req.userId]
  );
  // Choose character
  const karakter = await query(
    'SELECT * FROM `karakters` ORDER BY rand() limit 1'
  );
  // Look up and save Exp Needed
  const experience = await query(
    "SELECT `punten` FROM `experience` WHERE `soort`=? AND `level`='6'",
    [pokemonQuery[0].groei]
  );
  // Create and save Pokemon IV
  // Iv random number between 1.31. I take 2 because 1 is too little
  let attack_iv = rand(2, 31);
  let defence_iv = rand(2, 31);
  let speed_iv = rand(2, 31);
  let spcattack_iv = rand(2, 31);
  let spcdefence_iv = rand(2, 31);
  let hp_iv = rand(2, 31);
  // Calculate stats
  let attackStat = Math.round(
    (((pokemonQuery[0]['attack_base'] * 2 + attack_iv) * 5) / 100 + 5) *
      1 *
      karakter[0]['attack_add']
  );
  let defenceStat = Math.round(
    (((pokemonQuery[0]['defence_base'] * 2 + defence_iv) * 5) / 100 + 5) *
      1 *
      karakter[0]['defence_add']
  );
  let speedStat = Math.round(
    (((pokemonQuery[0]['speed_base'] * 2 + speed_iv) * 5) / 100 + 5) *
      1 *
      karakter[0]['speed_add']
  );
  let spcattackstat = Math.round(
    (((pokemonQuery[0]['spc.attack_base'] * 2 + spcattack_iv) * 5) / 100 + 5) *
      1 *
      karakter[0]['spc.attack_add']
  );
  let spcdefencestat = Math.round(
    (((pokemonQuery[0]['spc.defence_base'] * 2 + spcdefence_iv) * 5) / 100 +
      5) *
      1 *
      karakter[0]['spc.defence_add']
  );
  let hpstat = Math.round(
    ((pokemonQuery[0]['hp_base'] * 2 + hp_iv) * 5) / 100 + 5 + 10
  );
  // Save all pokemon data
  const data = await query(
    "UPDATE `pokemon_speler` SET `level`='5', `karakter`=?, `expnodig`=?, `user_id`=?, `opzak`='ja', `opzak_nummer`='1', `gehecht` = '1', `ei`='0', `ei_tijd`= NOW(), `attack_iv`=?, `defence_iv`=?, `speed_iv`=?, `spc.attack_iv`=?, `spc.defence_iv`=?, `hp_iv`=?, `attack`=?, `defence`=?, `speed`=?, `spc.attack`=?, `spc.defence`=?, `levenmax`=?, `leven`=? WHERE `id`=?",
    [
      karakter[0]['karakter_naam'],
      experience[0]['punten'],
      req.userId,
      attack_iv,
      defence_iv,
      speed_iv,
      spcattack_iv,
      spcdefence_iv,
      hp_iv,
      attackStat,
      defenceStat,
      speedStat,
      spcattackstat,
      spcdefencestat,
      hpstat,
      hpstat,
      pokeId,
    ]
  );
  res.send(data);
});

router.post('/modifyOrder', async (req, res) => {
  let { wat, teller, pokemonId } = req.body;
  if (wat === 'down') {
    teller += 1;
    await query(
      "UPDATE `pokemon_speler` SET `opzak_nummer`=`opzak_nummer`-'1' WHERE `user_id`=? AND `opzak`='ja' AND `opzak_nummer`=?",
      [req.userId, teller]
    );
    await query(
      "UPDATE `pokemon_speler` SET `opzak_nummer`=`opzak_nummer`+'1' WHERE `id`=?",
      [pokemonId]
    );
  } else if (wat === 'up') {
    teller -= 1;
    await query(
      "UPDATE `pokemon_speler` SET `opzak_nummer`=`opzak_nummer`+'1' WHERE `user_id`=? AND `opzak`='ja' AND `opzak_nummer`=?",
      [req.userId, teller]
    );
    await query(
      "UPDATE `pokemon_speler` SET `opzak_nummer`=`opzak_nummer`-'1' WHERE `id`=?",
      [pokemonId]
    );
  }
  const data = await query(
    "SELECT pw.wereld, pw.naam, pw.type1, pw.type2, pw.zeldzaamheid, pw.groei, pw.aanval_1, pw.aanval_2, pw.aanval_3, pw.aanval_4, ps.* FROM pokemon_wild AS pw INNER JOIN pokemon_speler AS ps ON ps.wild_id = pw.wild_id WHERE ps.user_id=? AND ps.opzak='ja' ORDER BY ps.opzak_nummer ASC",
    [req.userId]
  );
  res.send(data);
});

router.get('/pocketPokemons', async (req, res) => {
  const data = await countPokemonsInHouse(req.userId);
  res.json(data);
});

router.post('/takeAwayPokemon', async (req, res) => {
  const { id } = req.body;
  const data = await countPokemonsInHouse(req.userId);
  await query(
    "UPDATE `pokemon_speler` SET `opzak`='nee', `opzak_nummer`='' WHERE `id`=?",
    [id]
  );
  const p = await query(
    "SELECT `id`,`opzak_nummer` FROM `pokemon_speler` WHERE `user_id`=? AND `id`!=? AND `opzak`='ja' ORDER BY `opzak_nummer` ASC",
    [req.userId, id]
  );
  for (let i = 1; i <= p.length; i++) {
    await query(
      'UPDATE `pokemon_speler` SET `opzak_nummer`= ? WHERE `id`= ? ',
      [i, p[i - 1].id]
    );
  }
  res.json(data - 1);
});

router.get('/homePokemons', async (req, res) => {
  let count = await query(
    "SELECT COUNT(*) AS c FROM `pokemon_speler` WHERE `user_id`=? AND `opzak`='nee'",
    [req.userId]
  );
  count = count[0].c;
  const poke = await query(
    "SELECT pokemon_speler.*, `pokemon_wild`.`naam`, `pokemon_wild`.`type1`, `pokemon_wild`.`type2`  FROM `pokemon_speler` INNER JOIN `pokemon_wild` ON `pokemon_speler`.`wild_id` = `pokemon_wild`.`wild_id` WHERE `pokemon_speler`.`user_id`=? AND `pokemon_speler`.`opzak`='nee' ORDER BY `pokemon_speler`.`wild_id` ASC",
    [req.userId]
  );
  res.send({ poke, count });
});

router.post('/pickupPokemon', async (req, res) => {
  const { id, numInBag } = req.body;
  await query(
    "UPDATE `pokemon_speler` SET `opzak`='ja', `opzak_nummer`= ? WHERE `id` = ?",
    [numInBag, id]
  );
  res.send({});
});

router.post('/release', async (req, res) => {
  const { id, wild_id } = req.body;
  const selectedPokemon = await query(
    'SELECT wild_id, user_id, gehecht, gevongenmet FROM pokemon_speler WHERE id = ?',
    [id]
  )[0];
  await query("UPDATE gebruikers_item SET ?=?+'1' WHERE `user_id`=?", [
    selectedPokemon.gevongenmet,
    selectedPokemon.gevongenmet,
    req.userId,
  ]);
  await updatePokedex(wild_id, '', 'release', req.userId);
  await query('DELETE FROM pokemon_speler WHERE id = ?', [id]);
  await query('DELETE FROM transferlijst WHERE id = ?', [id]);
  await query(
    "UPDATE `gebruikers` SET `aantalpokemon`=`aantalpokemon`-'1' WHERE `user_id` = ?",
    [req.userId]
  );
  res.send({});
});

module.exports = router;
