const { Activity } = require('../db');

const getAllActivities = async ({ order = 'ASC', limit = 10, offset = 0 } = {}) => {
const activities = await Activity.findAll({
order: [['id', order]],
limit,
offset,
});
return activities;
};

module.exports = { getAllActivities };

// const { Activity } = require('../db');

// const getAllActivities = async () => {
//   const activities = await Activity.findAll();
//   return activities;
// };

// module.exports = { getAllActivities };