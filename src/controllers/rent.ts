import db from '../database';
import * as Koa from 'koa';
import * as _ from 'lodash';

export default async function(ctx: Koa.Context) {
	const limit = ctx.query.limit || 6;

	ctx.response.body = JSON.stringify(
		await db
			.select('date', 'net')
			.from('rental_payments')
			.orderBy('date', 'desc')
			.limit(limit)
	);
}
