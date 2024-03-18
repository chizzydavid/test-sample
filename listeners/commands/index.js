const { unRepliedMessageHandler } = require('./unrepliedMessage');

module.exports.register = (app) => {
  app.command('/unreplied-messages2', unRepliedMessageHandler);
};
