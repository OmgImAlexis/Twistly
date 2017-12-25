const paginate = require('koa-ctx-paginate');
const _ = require('lodash');
const { TumblrAccount } = require('../../../models');
const env = require('../../../../config/env');

const list = async ctx => {
  try {
    const [tumblrAccounts, itemCount] = await Promise.all([
      TumblrAccount.find({
        owner: ctx.state.user.id
      })
        .limit(ctx.query.limit)
        .skip(ctx.paginate.skip)
        .lean()
        .sort('-created_at')
        .exec(),
      TumblrAccount.count({
        owner: ctx.state.user.id
      })
    ]);

    const pageCount = Math.ceil(itemCount / ctx.query.limit);

    await ctx.render('accounts/index', {
      env: _.pick(env, [
        'AUTH_LOCAL_ENABLED',
        'AUTH_FACEBOOK_ENABLED',
        'AUTH_TWITTER_ENABLED',
        'AUTH_GOOGLE_ENABLED',
        'AUTH_GITHUB_ENABLED',
        'AUTH_LINKEDIN_ENABLED',
        'AUTH_INSTAGRAM_ENABLED',
        'AUTH_STRIPE_ENABLED',
        'AUTH_TUMBLR_ENABLED'
      ]),
      accounts: [
        {
          type: 'tumblr',
          id: 1,
          url: 'reblogalert'
        },
        {
          type: 'twitter',
          id: 2,
          username: 'omgimalexis'
        },
        {
          type: 'facebook',
          id: 3,
          username: 'omgimalexis'
        }
      ],
      pageCount,
      itemCount,
      pages: paginate.getArrayPages(ctx)(3, pageCount, ctx.query.page)
    });
  } catch (err) {
    ctx.throw(err);
  }
};

const info = ctx => {
  ctx.throw('coming soon');
};

const update = ctx => {
  ctx.throw('coming soon');
};

const remove = ctx => {
  ctx.throw('coming soon');
};

module.exports = { list, info, update, remove };
