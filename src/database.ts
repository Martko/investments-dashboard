const knex = require('knex');
import * as Knex from 'knex';

const db: Knex = knex({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	},
	debug: process.env.DB_DEBUG === 'true',
});

export default db;
