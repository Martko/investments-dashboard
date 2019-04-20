import db from '../database';
import * as _ from 'lodash';

export default async function(ctx: any) {
	ctx.response.body = JSON.stringify(
		_.uniqBy(
			await db
				.select('source as name', 'value')
				.from('portfolio_values')
				.orderBy('id', 'desc')
				.limit(5),
			'name'
		)
	);
}
