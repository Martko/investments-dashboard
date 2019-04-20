import db from '../database';

export default async function(ctx: any) {
	const results = await db.select().from('daily_interests');

	ctx.response.body = JSON.stringify(results);
}
