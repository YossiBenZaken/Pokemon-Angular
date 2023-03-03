const express = require('express');
const router = express.Router();
const { query } = require('../services/db');

router.get('/pokemonInfo', async (_, res) => {
  const pokemons = await query(
    'SELECT wild_id, naam FROM pokemon_wild ORDER BY wild_id ASC'
  );
  res.send(pokemons);
});
router.get('/pokemonDetails/:id', async (req, res) => {
  const pokemonDetails = await query(
    'SELECT pokemon_wild.wild_id, naam, zeldzaamheid, type1, type2, gebied, wereld, COUNT(pokemon_speler.wild_id) AS hoeveelingame FROM pokemon_wild  LEFT JOIN pokemon_speler ON pokemon_wild.wild_id = pokemon_speler.wild_id  WHERE pokemon_wild.wild_id = ? GROUP BY pokemon_wild.wild_id',
    [req.params.id]
  );
  const levels = await query(
    'SELECT * FROM levelen WHERE wild_id = ? ORDER BY level ASC',
    [req.params.id]
  );
  res.send({ pokemonDetails, levels });
});
module.exports = router;
