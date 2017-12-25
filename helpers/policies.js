const Policies = require('@ladjs/policies');
const Boom = require('boom');
const { Users } = require('../app/models');
const { appName } = require('../config');

const policies = new Policies({ appName }, api_token => Users.findOne({ api_token }));

policies.hasAccess = accessLevel => {
  return (ctx, next) => {
    if (ctx.state.user && ctx.state.user.hasAccess(accessLevel)) {
      return next();
    }
    return ctx.throw(Boom.unauthorized(ctx.translate(`IS_NOT_${accessLevel.toUpperCase()}`)));
  };
};

module.exports = policies;
