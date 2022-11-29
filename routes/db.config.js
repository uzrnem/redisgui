'user strict';

const redis = require("redis");

//'redis://username:password@redis_host:6380'
const uri = process.env.CONFIG_REDIS_URI || "redis://localhost:6379"

const client = redis.createClient({
  url: uri
});
client.on('error', err => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client connect'));


module.exports = client;
