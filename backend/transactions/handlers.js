const {
    fetchAndSaveTransaction,
    fetchAndSaveConversionData,
} = require("./utils");

/**
 * Handler to get N transactions starting from the given block_number and position of transaction
 * @param {import("fastify").FastifyRequest} req Request object
 * @param {import("fastify").FastifyReply} reply Reply object
 */
async function handleGetTransactions(req, reply) {
    const PAGINATION_LIMIT = 50;

    const block_number = req.query.block_number || 1e9;
    const position = req.query.position || 0;
    const type = req.query.type || null;

    const findConditions = {
        $or: [
            { block_number: block_number, position: { $gt: position } },
            { block_number: { $lt: block_number } },
        ],
    };

    // Fetch PAGINATION_LIMIT transactions from MongoDB starting from the given block_number and position of transaction
    if (type !== null) {
        findConditions.type = {
            $regex: new RegExp("^" + type.toLowerCase() + "$", "i"),
        };
    }

    const result = await this.db.voyager.Transaction.find(findConditions)
        .limit(PAGINATION_LIMIT)
        .sort({ block_number: -1, position: 1 });

    const length = result.length;
    const lastBlockNumber = length > 0 ? result[length - 1].block_number : 0;
    const lastPosition = length > 0 ? result[length - 1].position : 0;

    return {
        transactions: result,
        block_number: lastBlockNumber,
        position: lastPosition,
    };
}

/**
 * Handler to get a single transaction
 * @param {import("fastify").FastifyRequest} req Request object
 * @param {import("fastify").FastifyReply} reply Reply object
 */
async function handleGetTransaction(req, reply) {
    const transactionHash = req.params.transactionHash;

    let result = await this.db.voyager.Transaction.findOne({
        transaction_hash: transactionHash,
    });

    result = result.toObject();

    if (result.fetched_all === false) {
        this.log.info(`Fetching transaction: ${transactionHash}`);
        await fetchAndSaveTransaction(this, result, transactionHash);
    } else {
        this.log.info(`Transaction already fetched: ${transactionHash}`);
    }

    await fetchAndSaveConversionData(this, result);

    return {
        transaction: result,
    };
}

module.exports = {
    handleGetTransactions,
    handleGetTransaction,
};
