const router = require('express').Router();
const con = require('../services/db');
const middleware = require('../services/middleware');
router.use(middleware);

router.get('/premiumMarket', (_, res) => {
  con.query(
    "SELECT `id`, `naam`, `silver`, `gold`, `omschrijving_en` FROM `markt` WHERE `soort`='premium'",
    (err, data) => {
      if (err) res.sendStatus(500);
      res.send(data);
    }
  );
});
module.exports = router;
