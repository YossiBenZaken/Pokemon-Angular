const express = require('express');
const router = express.Router();
const con = require('../services/db');
const { rand } = require('../services/helpers');
const middleware = require('../services/middleware');
router.use(middleware);
router.get('/getStarterPokemon/:world', (req, res) => {
  const { world } = req.params;
  con.query(
    `SELECT pokemon_nieuw_starter.wild_id, pokemon_wild.naam, pokemon_wild.type1, pokemon_wild.type2
             FROM pokemon_nieuw_starter
             INNER JOIN pokemon_wild ON pokemon_nieuw_starter.wild_id = pokemon_wild.wild_id
             WHERE pokemon_wild.wereld = ?
             ORDER BY pokemon_nieuw_starter.wild_id ASC`,
    [world],
    (err, starter) => {
      con.query(
        `SELECT pokemon_nieuw_gewoon.wild_id, pokemon_wild.naam, pokemon_wild.type1, pokemon_wild.type2
        FROM pokemon_nieuw_gewoon
          INNER JOIN pokemon_wild ON pokemon_nieuw_gewoon.wild_id = pokemon_wild.wild_id
       WHERE pokemon_wild.wereld = ?
          ORDER BY pokemon_nieuw_gewoon.wild_id ASC`,
        [world],
        (err, normal) => {
          con.query(
            `SELECT pokemon_nieuw_baby.wild_id, pokemon_wild.naam, pokemon_wild.type1, pokemon_wild.type2
            FROM pokemon_nieuw_baby
              INNER JOIN pokemon_wild ON pokemon_nieuw_baby.wild_id = pokemon_wild.wild_id
           WHERE pokemon_wild.wereld = ?
              ORDER BY pokemon_nieuw_baby.wild_id ASC`,
            [world],
            (err, babies) => {
              res.send({ starter, normal, babies });
            }
          );
        }
      );
    }
  );
});
router.post('/choosePokemon', (req, res) => {
  const { choose } = req.body;
  // Random pokemon loading, and its data
  con.query(
    'SELECT pw.wild_id, pw.naam, pw.groei, pw.attack_base, pw.defence_base, pw.speed_base, `pw`.`spc.attack_base`, `pw`.`spc.defence_base`, pw.hp_base, pw.aanval_1, pw.aanval_2, pw.aanval_3, pw.aanval_4 FROM pokemon_wild AS pw WHERE pw.wild_id = ? LIMIT 1',
    [choose],
    (err, pokemonQuery) => {
      // Put the random pokemon in the pokemon_speler table
      con.query(
        'INSERT INTO `pokemon_speler` (`wild_id`, `aanval_1`, `aanval_2`, `aanval_3`, `aanval_4`) (SELECT `wild_id`, `aanval_1`, `aanval_2`, `aanval_3`, `aanval_4` FROM `pokemon_wild` WHERE `wild_id`=?)',
        [choose],
        (err, update) => {
          let pokeId = update.insertId;
          con.query(
            "UPDATE `gebruikers` SET `aantalpokemon`=`aantalpokemon`+'1', `eigekregen`='1' WHERE `user_id`=?",
            [req.userId]
          );
          // Choose character
          con.query(
            'SELECT * FROM `karakters` ORDER BY rand() limit 1',
            (err, karakter) => {
              // Look up and save Exp Needed
              con.query(
                "SELECT `punten` FROM `experience` WHERE `soort`=? AND `level`='6'",
                [pokemonQuery[0].groei],
                (err, experience) => {
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
                    (((pokemonQuery[0]['attack_base'] * 2 + attack_iv) * 5) /
                      100 +
                      5) *
                      1 *
                      karakter[0]['attack_add']
                  );
                  let defenceStat = Math.round(
                    (((pokemonQuery[0]['defence_base'] * 2 + defence_iv) * 5) /
                      100 +
                      5) *
                      1 *
                      karakter[0]['defence_add']
                  );
                  let speedStat = Math.round(
                    (((pokemonQuery[0]['speed_base'] * 2 + speed_iv) * 5) /
                      100 +
                      5) *
                      1 *
                      karakter[0]['speed_add']
                  );
                  let spcattackstat = Math.round(
                    (((pokemonQuery[0]['spc.attack_base'] * 2 + spcattack_iv) *
                      5) /
                      100 +
                      5) *
                      1 *
                      karakter[0]['spc.attack_add']
                  );
                  let spcdefencestat = Math.round(
                    (((pokemonQuery[0]['spc.defence_base'] * 2 +
                      spcdefence_iv) *
                      5) /
                      100 +
                      5) *
                      1 *
                      karakter[0]['spc.defence_add']
                  );
                  let hpstat = Math.round(
                    ((pokemonQuery[0]['hp_base'] * 2 + hp_iv) * 5) / 100 +
                      5 +
                      10
                  );
                  // Save all pokemon data
                  con.query(
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
                    ],
                    (err, data) => {
                      if (err) res.send(err);
                      res.send(data);
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});

module.exports = router;
