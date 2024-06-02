const getTransactionsSchema = {
    query: {
        type: "object",
        properties: {
            block_number: {
                type: "number",
            },
            position: {
                type: "number",
            },
        },
    },
};

const getTransactionSchema = {
    params: {
        type: "object",
        properties: {
            transactionHash: {
                type: "string",
            },
        },
    },
};

module.exports = { getTransactionsSchema, getTransactionSchema };
