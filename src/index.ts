const Koa = require('koa');
const Router = require('koa-router');
import portfolio from './controllers/portfolio';
import interests from './controllers/interests';

const api = new Koa();
const router = new Router();

router.get('/api/portfolio-value', portfolio);
router.get('/api/interests', interests);

api.use(router.routes())
	.use(router.allowedMethods())
	.listen(3000);
