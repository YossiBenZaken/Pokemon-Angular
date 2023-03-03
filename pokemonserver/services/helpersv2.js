const { query } = require('./db');

const rank = async (rankNumber) => {
  const rows = await query('SELECT `naam` FROM `rank` WHERE `ranknummer`=?', [
    rankNumber,
  ]);
  const rankInfo = {
    ranknummer: rankNumber,
    ranknaam: rows[0].naam,
  };
  return rankInfo;
};
const getRankPoints = async (rankNumber) => {
  const rows = await query('SELECT `punten` FROM `rank` WHERE `ranknummer`=?', [
    rankNumber,
  ]);
  return rows[0].punten;
};
const updateRank = async (userId, rankNumber, rankExpOver, rankExpNeeded) => {
  if (rankNumber === 34) {
    await query(
      "UPDATE `gebruikers` SET `rank`='33', `rankexp`='1', `rankexpnodig`='170000000' WHERE `user_id`=?",
      [userId]
    );
  } else {
    await query(
      'UPDATE `gebruikers` SET `rank`=?, `rankexp`=?, `rankexpnodig`=? WHERE `user_id`=?',
      [rankNumber, rankExpOver, rankExpNeeded, userId]
    );
  }
};

const ranker = async (kind, txt, userId) => {
  switch (kind) {
    case 'race':
    case 'standaard':
      kind = 1;
      break;
    case 'werken':
    case 'whoisitquiz':
      kind = 2;
      break;
    case 'attack':
    case 'jail':
      kind = 3;
      break;
    case 'trainer':
      kind = 4;
      break;
    case 'gym':
    case 'duel':
      kind = 5;
      break;
  }

  const rows = await query(
    'SELECT `land`, `rankexp`, `rankexpnodig`, `rank` FROM `gebruikers` WHERE `user_id`= ?',
    [userId]
  );

  const playerRank = rows[0];

  const rankInfo = await rank(playerRank.rank);

  const result = Math.round(((rankInfo.ranknummer / 0.11) * kind) / 3);

  await query(
    'UPDATE `gebruikers` SET `rankexp`=`rankexp`+? WHERE `user_id`=?',
    [result, userId]
  );

  playerRank.rankexp += result;

  if (playerRank.rankexpnodig <= playerRank.rankexp) {
    const rankExpOver = playerRank.rankexp - playerRank.rankexpnodig;
    const brandNew = playerRank.rank + 1;

    const rankExpNeeded = await getRankPoints(brandNew);

    await updateRank(userId, brandNew, rankExpOver, rankExpNeeded);
  }
};

const countPokemonsInHouse = async (userId) => {
  const rows = await query(
    "SELECT COUNT(`id`) AS `aantal` FROM `pokemon_speler` WHERE `user_id`=? AND (opzak = 'nee' OR opzak = 'tra')",
    [userId]
  );

  return rows[0].aantal;
};
const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
module.exports = {
  rank,
  ranker,
  rand,
  countPokemonsInHouse,
};
