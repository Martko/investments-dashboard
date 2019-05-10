import db from '../database';
import * as Koa from 'koa';
import * as _ from 'lodash';

export default async function(ctx: Koa.Context) {
	let response;

	if (ctx.query.type === 'by_month') {
		response = await db
			.select(db.raw('month(date) as month, source, max(value) as value'))
			.from('portfolio_values as pvs')
			.whereRaw(
				'date IN(SELECT MAX(date) FROM portfolio_values WHERE source = pvs.source group by month(date))'
			)
			.groupByRaw('source, month(date)');
	} else {
		response = _.uniqBy(
			await db
				.select('source as name', 'value')
				.from('portfolio_values')
				.orderBy('date', 'desc'),
			'name'
		);
	}

	ctx.response.body = JSON.stringify(response);
}
