const Rollbar = require('rollbar');
const Router = require('koa-router');
const render = require('koa-views-render');
const { web } = require('../../app/controllers');
const { policies } = require('../../helpers');
const config = require('./../../config');
const admin = require('./admin');
const auth = require('./auth');
const dashboard = require('./dashboard');
const myAccount = require('./my-account');
const queues = require('./queues');
const accounts = require('./accounts');

const router = new Router({ prefix: '/:locale' });

// Errors handling using Rollbar as first middleware to catch exception
const rollbar = new Rollbar(config.rollbar.token);
router.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    rollbar.error(
      err,
      Object.assign({}, ctx.request, {
        user: ctx.state.user
      })
    );
    // Rethrow so Lad can pick it back up.
    throw err;
  }
});

router
  .get('/', web.auth.homeOrDashboard)
  .get('/about', render('about'))
  .get('/404', render('404'))
  .get('/500', render('500'))
  .get('/terms', render('terms'))
  .get('/privacy', render('privacy'))
  .get('/support', render('support'))
  .post('/support', web.support)
  .get('/forgot-password', render('forgot-password'))
  .post('/forgot-password', web.auth.forgotPassword)
  .get('/reset-password/:token', render('reset-password'))
  .post('/reset-password/:token', web.auth.resetPassword)
  .get('/logout', policies.ensureLoggedIn, web.auth.logout)
  .get('/login', policies.ensureLoggedOut, web.auth.registerOrLogin)
  .post('/login', policies.ensureLoggedOut, web.auth.login)
  .get('/register', policies.ensureLoggedOut, web.auth.registerOrLogin)
  .post(
    '/register',
    policies.ensureLoggedOut,
    web.auth.register
    // we handle `ctx.login` in the previous middleware
    // passport.authenticate('local', config.passportCallbackOptions)
  );

router.use(auth.routes());
router.use(dashboard.routes());
router.use(myAccount.routes());
router.use(queues.routes());
router.use(accounts.routes());
router.use(admin.routes());

module.exports = router;
