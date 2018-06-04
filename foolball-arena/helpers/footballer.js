const { QueryBuilder } = rootRequire('utils');

/**
 * Mutable Map for all detailed information of Footballer.
 */
function getFootballerFields() {
  return {
    name: 'f.Name',
    nationality: 'f.Nationality',
    national_position: 'f.National_Position',
    national_kit: 'f.National_Kit',
    club: 'f.Club',
    club_position: 'f.Club_Position',
    club_kit: 'f.Club_Kit',
    Club_joining: 'f.Club_Joining',
    contract_expiry: 'f.Contract_Expiry',
    rating: 'f.Rating',
    height: 'f.Height',
    weight: 'f.Weight',
    preffered_foot: 'f.Preffered_Foot',
    birth_date: 'f.Birth_Date',
    age: 'f.Age',
    preffered_position: 'f.Preffered_Position',
    work_rate: 'f.Work_Rate',
    weak_foot: 'f.Weak_foot',
    skill_moves: 'f.Skill_Moves',
    ball_control: 'f.Ball_Control',
    dribbling: 'f.Dribbling',
    marking: 'f.Marking',
    sliding_Tackle: 'f.Sliding_Tackle',
    standing_Tackle: 'f.Standing_Tackle',
    aggression: 'f.Aggression',
    reactions: 'f.Reactions',
    attacking_position: 'f.Attacking_Position',
    interceptions: 'f.Interceptions',
    vision: 'f.Vision',
    composure: 'f.Composure',
    crossing: 'f.Crossing',
    short_pass: 'f.Short_Pass',
    long_pass: 'f.Long_Pass',
    acceleration: 'f.Acceleration',
    speed: 'f.Speed',
    stamina: 'f.Stamina',
    strength: 'f.Strength',
    balance: 'f.Balance',
    agility: 'f.Agility',
    jumping: 'f.Jumping',
    heading: 'f.Heading',
    shot_power: 'f.Shot_Power',
    finishing: 'f.Finishing',
    long_shots: 'f.Long_Shots',
    curve: 'f.Curve',
    freekick_accuracy: 'f.Freekick_Accuracy',
    penalties: 'f.Penalties',
    volleys: 'f.Volleys',
    gk_positioning: 'f.GK_Positioning',
    gk_diving: 'f.GK_Diving',
    gk_kicking: 'f.GK_Kicking',
    gk_handling: 'f.GK_Handling',
    gk_reflexes: 'f.GK_Reflexes',
  };
}

/**
 * 
 * @param {*} name : Name of Footballer
 * Desc: Function to get all the Details from the DB of a footballer
 */
async function getFootballerByName(name) {
  const { mysql } = rootRequire('db');
  const qb = new QueryBuilder();

  const columns = getFootballerFields();

  qb.select(columns)
    .from('footballers f')
    .where();

  qb.and().is(columns.name, name);

  return qb.query(mysql);
}

function getPaginationColumnList() {
  return {
    name: 'f.Name',
    nationality: 'f.Nationality',
    club: 'f.Club',
    rating: 'f.Rating',
    age: 'f.age',
  };
}

function getFilterColumnList() {
  return {
    ball_control: 'f.Ball_Control',
    dribbling: 'f.Dribbling',
    marking: 'f.Marking',
    sliding_Tackle: 'f.Sliding_Tackle',
    standing_Tackle: 'f.Standing_Tackle',
    shot_power: 'f.Shot_Power',
    finishing: 'f.Finishing',
    freekick_accuracy: 'f.Freekick_Accuracy',
  };
}

module.exports = {
  getFootballerByName,
  getPaginationColumnList,
  getFilterColumnList,
};