const { Activity } = require('../db.js');

const deleteActivity = async (req, res) => {
	const id = req.params.id;
	try {
		const deletedActivity = await Activity.findByPk(id);
		await Activity.destroy({
			where: { id: id },
		});
		res.status(200).json({ deletedActivity: deletedActivity });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = { deleteActivity };