import db from '../database';
import * as Koa from 'koa';
import * as Knex from 'knex';

export default async function(ctx: Koa.Context) {
	const type = ctx.query.type || 'daily_interests';
	const year = ctx.query.year;
	const start = ctx.query.start || undefined;
	const end = ctx.query.end || undefined;
	const groupBy = ctx.query.groupBy;

	await db
		.from(type)
		.modify((queryBuilder: Knex.QueryBuilder) => {
			if (year && type !== 'daily_interests') {
				queryBuilder.where('year', year);
			} else if (year && type == 'daily_interests') {
				queryBuilder
					.select(
						db.raw(
							[
								'DAY(date) as day',
								'MONTH(date) as month',
								'sum(total) as total',
								'sum(loss) as loss',
								'sum(net) as net',
							].join(',')
						)
					)
					.whereRaw(`YEAR(date) = ${parseInt(year)}`)
					.groupBy(['day', 'month']);
			}
			if (start && type == 'daily_interests') {
				queryBuilder.whereRaw('date >= ?', [start]);
			}

			if (groupBy) {
				queryBuilder.groupBy(groupBy);
			}
		})
		.then((results) => {
			ctx.response.body = JSON.stringify(results);
		});
}
