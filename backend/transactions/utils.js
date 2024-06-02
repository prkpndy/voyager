// Function to fetch transaction data from the StarkNet API and save it to MongoDB
async function fetchAndSaveTransaction(fastify, result, transactionHash) {
    try {
        const response = await fetch(fastify.STARKNET_API_URL, {
            method: "POST",
            body: JSON.stringify({
                params: [transactionHash],
                jsonrpc: "2.0",
                method: "starknet_getTransactionReceipt",
                id: 1,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            const transaction = data.result;

            result.actual_fee = Number(transaction.actual_fee?.amount) || null;

            if (
                result.actual_fee === null ||
                result.l1_gas_price === null ||
                result.l1_gas_price === 0
            ) {
                result.gas_consumed = null;
            } else {
                result.gas_consumed = result.actual_fee / result.l1_gas_price;
            }

            result.execution_resources = transaction.execution_resources;
            result.fetched_all = true;

            await fastify.db.voyager.Transaction.updateOne(
                { transaction_hash: transactionHash },
                result,
                { upsert: true }
            );
        } else {
            console.log(
                `Response for GET Transaction NOT OK for transactionHash: ${transactionHash}`
            );
        }
    } catch (error) {
        console.log(
            `Error fetching the GET Transaction for transactionHash = ${transactionHash}: `,
            error
        );
    }
}

module.exports = { fetchAndSaveTransaction };
