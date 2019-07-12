import jwt from 'jsonwebtoken';

export default (req, requireAuth = true) => {
	const header = req.request
		? req.request.headers.authorization
		: req.connection.context.Authorization;

	if (header) {
		const token = header.replace('Bearer ', '');
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return decoded.userId;
	}

	if (requireAuth) {
		throw new Error('Not authenticated');
	}

	return null;
};
