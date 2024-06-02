const { handleGetTransactions, handleGetTransaction } = require("./handlers");
const { getTransactionsSchema, getTransactionSchema } = require("./schemas");

/**
 * Controller for routing the GET transactions request to proper handler
 * @param {import("fastify").FastifyInstance} fastify
 * @param {object} options
 * @param {Function} done
 */
function transactionsController(fastify, options, done) {
    fastify.get("/", { schema: getTransactionsSchema }, handleGetTransactions);
    fastify.get(
        "/:transactionHash",
        { schema: getTransactionSchema },
        handleGetTransaction
    );

    done();
}

module.exports = transactionsController;
