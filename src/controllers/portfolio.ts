import db from '../database';

export default async function(ctx: any) {
	const results = await db.select().from('portfolio_values');

	ctx.response.body = JSON.stringify(results);
}
