const commandsListener = require('./commands');
const eventsListener = require('./events');

module.exports.registerListeners = (app) => {
  commandsListener.register(app);
  eventsListener.register(app);
};
