const { fetchAndSaveTransaction } = require("./utils");

/**
 * Handler to get N transactions starting from the given block_number and position of transaction
 * @param {import("fastify").FastifyRequest} req Request object
 * @param {import("fastify").FastifyReply} reply Reply object
 */
async function handleGetTransactions(req, reply) {
    const PAGINATION_LIMIT = 10;

    const block_number = req.query.block_number;
    const position = req.query.position;

    // const orderBy = ["block_number", "position"];

    // Fetch PAGINATION_LIMIT transactions from MongoDB starting from the given block_number and position of transaction
    const result = await this.db.voyager.Transaction.find({
        block_number: { $gte: block_number },
        position: { $gt: position },
    })
        .limit(PAGINATION_LIMIT)
        .sort({ block_number: 1, position: 1 });

    console.log(result);

    return {
        transactions: result,
        block_number: block_number,
        position: position,
    };
}

/**
 * Handler to get a single transaction
 * @param {import("fastify").FastifyRequest} req Request object
 * @param {import("fastify").FastifyReply} reply Reply object
 */
async function handleGetTransaction(req, reply) {
    const transactionHash = req.params.transactionHash;

    const result = await this.db.voyager.Transaction.findOne({
        transaction_hash: transactionHash,
    });

    if (result.fetched_all === false) {
        this.log.info(`Fetching transaction: ${transactionHash}`);
        await fetchAndSaveTransaction(this, result, transactionHash);
    } else {
        this.log.info(`Transaction already fetched: ${transactionHash}`);
    }

    return {
        transaction: result,
    };
}

module.exports = {
    handleGetTransactions,
    handleGetTransaction,
};
