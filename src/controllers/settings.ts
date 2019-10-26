import db from '../database';
import * as Koa from 'koa';
import * as _ from 'lodash';

export default async function(ctx: Koa.Context) {
    const components: any[] = await db
        .distinct('source')
        .from('portfolio_values');

    ctx.response.body = {
        components: components.map(component => component.source),
    };
}
