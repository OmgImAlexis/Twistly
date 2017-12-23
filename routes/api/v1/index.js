const Router = require('koa-router');

const { policies } = require('../../../helpers');
const { api } = require('../../../app/controllers');

const router = new Router({
  prefix: '/v1'
});

/*
 * @api [post] /v1/user
 * description: "Creates a new user"
 * responses:
 *   "200":
 *     description: "A user object."
 *     schema:
 *       type: "String"
 */
router.post('/user', api.v1.users.create);

/*
 * @api [get] /v1/user
 * description: "Returns details for current user"
 * responses:
 *   "200":
 *     description: "A user object."
 *     schema:
 *       type: "String"
 */
router.get('/user', policies.ensureApiToken, api.v1.users.retrieve);

/*
 * @api [put] /v1/user
 * description: "Update account details for current user"
 * responses:
 *   "200":
 *     description: "A user object."
 *     schema:
 *       type: "String"
 */
router.put('/user', policies.ensureApiToken, api.v1.users.update);

module.exports = router;
