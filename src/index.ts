const Koa = require('koa');
const Router = require('koa-router');
import portfolio from './controllers/portfolio';
import interests from './controllers/interests';
import cash from './controllers/cash';
import passiveIncome from './controllers/passive-income';
const cors = require('@koa/cors');

const api = new Koa();
const router = new Router();

router.get('/api/portfolio-value', portfolio);
router.get('/api/passive-income', passiveIncome);
router.get('/api/interests', interests);
router.get('/api/cash', cash);

api.use(
	cors({
		origin: process.env.ALLOWED_ORIGIN,
	})
)
	.use(router.routes())
	.use(router.allowedMethods())
	.listen(3000);
