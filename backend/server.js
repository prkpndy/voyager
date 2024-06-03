require("dotenv").config();

const Fastify = require("fastify");

const transactionsController = require("./transactions/controllers");

const fastify = Fastify({
    logger:
        process.env.NODE_ENV === "development"
            ? {
                  transport: {
                      target: "pino-pretty",
                      options: {
                          translateTime: "HH:MM:ss Z",
                          ignore: "pid,hostname",
                      },
                  },
              }
            : true,
    ajv: {
        customOptions: {
            allErrors: true,
        },
    },
    pluginTimeout: 200000,
});

// database plugin
fastify.register(require("./plugins/fastifyMongoose"));

// hooks
fastify.addHook("onRequest", require("./hooks/cors"));

// controllers
fastify.register(transactionsController, { prefix: "/api/v1/transactions" });

try {
    fastify.listen({
        host: process.env.HOST || "127.0.0.1",
        port: process.env.PORT || 3000,
    });
} catch (error) {
    fastify.log.error(error);
    process.exit(1);
}
