const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');

import { portfolio, passiveIncome, interests, cash, rent, loans } from './controllers';

const api = new Koa();
const router = new Router();

router.get('/api/portfolio-value', portfolio);
router.get('/api/passive-income', passiveIncome);
router.get('/api/interests', interests);
router.get('/api/cash', cash);
router.get('/api/rent', rent);
router.get('/api/loans', loans);

api.use(
	cors({
		origin: process.env.ALLOWED_ORIGIN,
	})
)
	.use(router.routes())
	.use(router.allowedMethods())
	.listen(3000);
