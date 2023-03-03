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
module.exports = router;
