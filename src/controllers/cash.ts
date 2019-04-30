import db from '../database';
import * as Koa from 'koa';
import * as _ from 'lodash';

export default async function(ctx: Koa.Context) {
	ctx.response.body = JSON.stringify(
		_.uniqBy(
			await db
				.select('source as name', 'cash')
				.from('portfolio_values')
				.orderBy('date', 'desc'),
			'name'
		)
	);
}
