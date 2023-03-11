const router = require('express').Router();
const { query } = require('../services/db');
const middleware = require('../services/middleware');
router.use(middleware);

router.get('/premiumMarket', async (_, res) => {
  const data = await query(
    "SELECT `id`, `naam`, `silver`, `gold`, `omschrijving_en` FROM `markt` WHERE `soort`='premium'"
  );
  res.send(data);
});

router.get('/areaMarket', async (_, res) => {
  const data = await query('SELECT * FROM premium');
  res.send(data);
});

router.get('/items', async (_, res) => {
  const market = await query(
    'SELECT m.id, m.soort, m.naam, m.silver, m.gold, m.omschrijving_en, t.type2 FROM markt as m Left JOIN tmhm as t on t.naam = m.naam ORDER BY soort ASC, id ASC'
  );
  res.send(market);
});

module.exports = router;
