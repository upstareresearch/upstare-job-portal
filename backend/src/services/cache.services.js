const Redis = require("ioredis");

// -----------------------------
// redis host, port and password
// ----------------------------------
const cacheClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});

module.exports = cacheClient;