import db from '../database';
import * as Koa from 'koa';
import * as _ from 'lodash';

export default async function(ctx: Koa.Context) {
	const now = new Date();

	ctx.response.body = JSON.stringify(
		await db.from('monthly_interests').where('month', now.getMonth())
	);
}
