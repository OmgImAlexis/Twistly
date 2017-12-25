const paginate = require('koa-ctx-paginate');

const { TumblrAccount, Queue } = require('../../../models');

const list = async ctx => {
  try {
    const [queues, itemCount, tumblrAccounts] = await Promise.all([
      Queue.find({
        owner: ctx.state.user.id
      })
        .limit(ctx.query.limit)
        .skip(ctx.paginate.skip)
        .lean()
        .sort('-created_at')
        .exec(),
      Queue.count({
        owner: ctx.state.user.id
      }),
      TumblrAccount.find({
        owner: ctx.state.user.id
      })
        .lean()
        .sort('-created_at')
        .exec()
    ]);

    const pageCount = Math.ceil(itemCount / ctx.query.limit);
    const now = new Date();

    await ctx.render('queues/index', {
      queues: [
        {
          name: 'Test Queue',
          startTime: 0,
          endTime: 86400000,
          postcount: 100,
          lastRun: now - 60 * 60,
          nextRun: now + 60 * 60,
          accounts: [
            {
              type: 'tumblr',
              url: 'staff'
            }
          ]
        },
        {
          name: 'Indie Queue',
          startTime: 0,
          endTime: 86400000,
          postcount: 250,
          lastRun: now - 60 * 60,
          nextRun: now + 60 * 60,
          accounts: [
            {
              type: 'tumblr',
              url: 'reblogalert'
            }
          ]
        },
        {
          name: 'Random Queue',
          startTime: 0,
          endTime: 86400000,
          postcount: 250,
          lastRun: now - 60 * 60,
          nextRun: now + 60 * 60,
          accounts: [
            {
              type: 'facebook',
              username: 'omgimalexis'
            }
          ]
        },
        {
          name: 'Random Queue',
          startTime: 0,
          endTime: 86400000,
          postcount: 250,
          lastRun: now - 60 * 60,
          nextRun: now + 60 * 60,
          accounts: [
            {
              type: 'tumblr',
              url: 'reblogalert'
            },
            {
              type: 'twitter',
              username: 'omgimalexis'
            }
          ]
        },
        {
          name: 'Random Queue',
          startTime: 0,
          endTime: 86400000,
          postcount: 250,
          lastRun: now - 60 * 60,
          nextRun: now + 60 * 60,
          accounts: [
            {
              type: 'tumblr',
              url: 'reblogalert'
            },
            {
              type: 'twitter',
              username: 'omgimalexis'
            }
          ]
        }
      ],
      pageCount,
      itemCount,
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
