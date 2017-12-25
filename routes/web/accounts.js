const Router = require('koa-router');
const paginate = require('koa-ctx-paginate');

const { policies } = require('../../helpers');
const { web } = require('../../app/controllers');

const router = new Router({ prefix: '/accounts' });

router.use(policies.ensureLoggedIn);
router.get('/', paginate.middleware(10, 50), web.accounts.list);
router.get('/:accountId', paginate.middleware(10, 50), web.accounts.info);

module.exports = router;
