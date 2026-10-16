const User = require('../model/user');

const handleAsync = (handler) => (req, res, next) =>
	Promise.resolve(handler(req, res, next)).catch(next);

exports.createUser = handleAsync(async (req, res) => {
	const user = await User.create(req.body);
	res.status(201).json(user);
});

exports.getUsers = handleAsync(async (_req, res) => {
	const users = await User.find();
	res.status(200).json(users);
});

exports.getUserById = handleAsync(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user) return res.status(404).json({ message: 'User not found' });
	res.status(200).json(user);
});

exports.updateUser = handleAsync(async (req, res) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!user) return res.status(404).json({ message: 'User not found' });
	res.status(200).json(user);
});

exports.deleteUser = handleAsync(async (req, res) => {
	const user = await User.findByIdAndDelete(req.params.id);
	if (!user) return res.status(404).json({ message: 'User not found' });
	res.status(200).json({ message: 'User deleted successfully' });
});
