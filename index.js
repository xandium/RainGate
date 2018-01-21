const config = require('./config/config');
let RainCache = require('raincache');
let AmqpConnector = require('raincache').Connectors.AmqpConnector;
let Redis = require('raincache').Engines.RedisStorageEngine;
let con = new AmqpConnector(config.amqp);
let cache = new RainCache({storage: {default: new Redis(config.redis)}, debug: false}, con, con);
let init = async () => {
    await cache.initialize();
};
cache.on('debug', (data) => {
    console.log(data);
});
init().then(async () => {
    console.log('Initialized successfully');

}).catch(e => console.error(e));
