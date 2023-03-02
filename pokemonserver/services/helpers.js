const con = require('./db');
const ranker = (kind, txt, userId) => {
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
  con.query(
    'SELECT `land`, `rankexp`, `rankexpnodig`, `rank` FROM `gebruikers` WHERE `user_id`= ?',
    [userId],
    (err, playerrank) => {
      rank(playerrank[0].rank, (err, rank) => {
        const result = Math.round(((rank.ranknummer / 0.11) * kind) / 3);
        con.query(
          'UPDATE `gebruikers` SET `rankexp`=`rankexp`+? WHERE `user_id`=?',
          [result, userId]
        );
        playerrank[0].rankexp = playerrank[0].rankexp + result;
        if (playerrank[0].rankexpnodig <= playerrank[0].rankexp) {
          let rankExpOver = playerrank[0].rankexp - playerrank[0].rankexpnodig;
          let brandNew = playerrank[0].rank + 1;
          con.query(
            'SELECT `naam`, `punten`, `naam` FROM `rank` WHERE `ranknummer`=?',
            [brandNew],
            (err, rankResult) => {
              if (brandNew == 34) {
                con.query(
                  "UPDATE `gebruikers` SET `rank`='33', `rankexp`='1', `rankexpnodig`='170000000' WHERE `user_id`=?",
                  [userId]
                );
              } else {
                con.query(
                  'UPDATE `gebruikers` SET `rank`=?, `rankexp`=?, `rankexpnodig`=? WHERE `user_id`=?',
                  [brandNew, rankExpOver, rankResult[0].punten, userId]
                );
              }
            }
          );
        }
      });
    }
  );
};
const rank = (rankNumber, callback) => {
  con.query(
    'SELECT `naam` FROM `rank` WHERE `ranknummer`=?',
    [rankNumber],
    (err, rank) => {
      if (err) callback(err, null);
      else {
        rank = rank[0];
        rank.ranknummer = rankNumber;
        rank.ranknaam = rank.naam;
        callback(null, rank);
      }
    }
  );
};

const pokemonInHouse = (userId, callback) => {
  con.query(
    "SELECT COUNT(`id`) AS `aantal` FROM `pokemon_speler` WHERE `user_id`=? AND (opzak = 'nee' OR opzak = 'tra')",
    [userId],
    (err, data) => {
      if (err) callback(err, null);
      callback(null, data[0].aantal);
    }
  );
};

const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
module.exports = {
  rank,
  ranker,
  rand,
  pokemonInHouse,
};
