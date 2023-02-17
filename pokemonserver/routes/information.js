const express = require('express');
const router = express.Router();
const con = require('../services/db');
router.get('/pokemonInfo', (req, res) => {
  con.query(
    'SELECT wild_id, naam FROM pokemon_wild ORDER BY wild_id ASC',
    (err, pokemons) => {
      res.send(pokemons);
    }
  );
});
router.get('/pokemonDetails/:id', (req, res) => {
  con.query(
    'SELECT pokemon_wild.wild_id, naam, zeldzaamheid, type1, type2, gebied, wereld, COUNT(pokemon_speler.wild_id) AS hoeveelingame FROM pokemon_wild  LEFT JOIN pokemon_speler ON pokemon_wild.wild_id = pokemon_speler.wild_id  WHERE pokemon_wild.wild_id = ? GROUP BY pokemon_wild.wild_id',
    [req.params.id],
    (err, pokemonDetails) => {
      con.query(
        'SELECT * FROM levelen WHERE wild_id = ? ORDER BY level ASC',
        [req.params.id],
        (err, levels) => {
          res.send({ pokemonDetails, levels });
        }
      );
    }
  );
});
module.exports = router;
