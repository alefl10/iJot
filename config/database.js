import { mlab } from './private';

if (process.env.node_env === 'production') {
	module.exports = {
		db: {
			mongoURI: `mongodb://${mlab.user}:${mlab.password}@ds125489.mlab.com:25489/ijot-prod`,
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
