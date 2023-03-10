const express = require('express');
const router = express.Router();
const { query } = require('../services/db');

router.get('/top6Strongest', async (_, res) => {
  const data = await query(
    "SELECT pokemon_speler.*, pokemon_wild.wild_id, pokemon_wild.naam, pokemon_wild.type1, pokemon_wild.type2, gebruikers.username,   SUM(`attack` + `defence` + `speed` + `spc.attack` + `spc.defence`) AS strongestpokemon FROM pokemon_speler INNER JOIN pokemon_wild ON pokemon_speler.wild_id = pokemon_wild.wild_id INNER JOIN gebruikers ON pokemon_speler.user_id = gebruikers.user_id WHERE gebruikers.account_code = '1' GROUP BY pokemon_speler.id ORDER BY strongestpokemon DESC LIMIT 12"
  );
  res.send(data);
});

router.get('/topStats', async (_, res) => {
  const data = await query(
    "SELECT SUM(silver + bank) AS rubytotal, SUM(gewonnen + verloren) AS matchestotal, SUM(aantalpokemon) AS pokemontotal, COUNT(user_id) AS userstotal FROM gebruikers WHERE account_code = '1'"
  );
  res.send(data);
});

router.get('/top5Silver', async (_, res) => {
  const data = await query(
    "SELECT username, premiumaccount, SUM(silver + bank) AS totaal FROM gebruikers WHERE account_code='1' GROUP BY user_id ORDER BY totaal DESC LIMIT 5"
  );
  res.send(data);
});

router.get('/top5NumberOfPokemon', async (_, res) => {
  const data = await query(
    "SELECT username, premiumaccount, aantalpokemon FROM gebruikers WHERE account_code='1' ORDER BY aantalpokemon DESC LIMIT 5"
  );
  res.send(data);
});

router.get('/top5Fights', async (_, res) => {
  const data = await query(
    "SELECT username, premiumaccount, SUM(gewonnen - verloren) AS gevechten FROM gebruikers WHERE account_code='1' GROUP BY user_id ORDER BY gevechten DESC LIMIT 5"
  );
  res.send(data);
});

router.get('/top10NewsMembers', async (_, res) => {
  const data = await query(
    "SELECT username, premiumaccount, aanmeld_datum FROM gebruikers WHERE account_code='1' ORDER BY aanmeld_datum DESC LIMIT 0,10"
  );
  res.send(data);
});

module.exports = router;
