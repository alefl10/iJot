if (process.env.NODE_ENV === 'production') {
	module.exports = {
		db: {
			mongoURI: process.env.MONGODB_URI,
		},
	};
} else {
	module.exports = {
		db: {
			mongoURI: 'mongodb://localhost/iJot-dev',
			PORT: 5000,
		},
	};
}
