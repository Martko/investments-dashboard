import db from '../database';
import * as Koa from 'koa';
import { uniqBy } from 'lodash';

export default async function(ctx: Koa.Context) {
    const dateStart = ctx.query.dateStart;
    const dateEnd = ctx.query.dateEnd;

    let response;

    if (ctx.query.type === 'by_month') {
        response = await db
            .select(db.raw('month(date) as month, source, max(value) as value'))
            .from('portfolio_values as pvs')
            // .whereBetween('date', [periodStart, periodEnd])
            .whereRaw(
                `date IN(SELECT MAX(date) FROM portfolio_values WHERE source = pvs.source AND date BETWEEN '${dateStart}' AND '${dateEnd}' group by month(date))`
                // `date IN(SELECT MAX(date) FROM portfolio_values WHERE source = pvs.source group by month(date))`
            )
            .groupByRaw('source, month(date)');
    } else {
        response = uniqBy(
            await db
                .select('source as name', 'value')
                .from('portfolio_values')
                .whereBetween('date', [dateStart, dateEnd])
                .orderBy('date', 'desc'),
            'name'
        );
    }

    ctx.response.body = JSON.stringify(response);
}
