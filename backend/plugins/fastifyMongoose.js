const fp = require("fastify-plugin");
const mongoose = require("mongoose");

function fastifySequelizePlugin(fastify) {
    return mongoose
        .connect(
            `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@node-rest-shop.jqorjie.mongodb.net/?retryWrites=true&w=majority&appName=node-rest-shop`,
            {
                dbName: "voyager",
            }
        )
        .then(async () => await decorate())
        .catch((error) => console.log(error));

    async function decorate() {
        console.log("*** MongoDB connected ***");

        fastify.decorate("CONVERSION_FETCH_GAP", 5 * 60 * 1e3);
        fastify.decorate(
            "COINGECKO_API_URL",
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        );

        fastify.decorate(
            "STARKNET_API_URL",
            "https://starknet-mainnet.blastapi.io/95849ee8-09e9-4e3d-88f6-8581b800c6bb/rpc/v0_7"
        );
        fastify.decorate("BLOCKS_TO_FETCH", 10);

        fastify.decorate("lastBlockFetched", null);

        fastify.decorate("db", require("../database/models"));
        fastify.decorate("getData", require("./getData"));

        await fastify.getData();
    }
}

module.exports = fp(fastifySequelizePlugin);
