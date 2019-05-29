const config = require("./config/config");
const RainCache = require("@xandium/raincache");
const AmqpConnector = require("./DetailedAmqpConnector");
const Redis = require("raincache").Engines.RedisStorageEngine;
let StatsD;
let statsClient;
try {
  StatsD = require("hot-shots");
} catch (e) {}
if (StatsD && config.statsD && config.statsD.enabled) {
  statsClient = new StatsD(config.statsD);
}
const con = new AmqpConnector(config.amqp, statsClient);
const cache = new RainCache(
  { storage: { default: new Redis(config.redis) }, debug: false },
  con,
  con
);
const init = async () => {
  await cache.initialize();
};
init()
  .then(async () => {
    console.log("Initialized successfully");
  })
  .catch(e => console.error(e));
