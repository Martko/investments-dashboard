import db from '../database';
import * as Koa from 'koa';
import * as Knex from 'knex';

export default async function(ctx: Koa.Context) {
	const type = ctx.query.type || 'daily_interests';
	const year = ctx.query.year;
	const groupBy = ctx.query.groupBy;

	await db
		.select()
		.from(type)
		.modify((queryBuilder: Knex.QueryBuilder) => {
			if (year && type !== 'daily_interests') {
				queryBuilder.where('year', year);
			} else if (year && type == 'daily_interests') {
				queryBuilder.whereRaw(`YEAR(date) = ${parseInt(year)}`);
			}

			if (groupBy) {
				queryBuilder.groupBy(groupBy);
			}
		})
		.then((results) => {
			ctx.response.body = JSON.stringify(results);
		});
}
