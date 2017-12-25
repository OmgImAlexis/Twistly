const Router = require('koa-router');
const paginate = require('koa-ctx-paginate');

const { policies } = require('../../helpers');
const { web } = require('../../app/controllers');

const router = new Router({ prefix: '/queues' });

router.use(policies.ensureLoggedIn);
router.get('/', paginate.middleware(10, 50), web.queues.list);
router.get('/:queueId', paginate.middleware(10, 50), web.queues.info);

module.exports = router;
