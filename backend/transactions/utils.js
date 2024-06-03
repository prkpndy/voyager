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
            headers: {
                "Content-Type": "application/json",
            },
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

            if (transaction.events) {
                result.num_events = transaction?.events?.length || 0;
            } else {
                result.num_events = 0;
            }

            result.execution_resources = transaction.execution_resources;
            result.fetched_all = true;

            await fastify.db.voyager.Transaction.updateOne(
                { transaction_hash: transactionHash },
                result,
                { upsert: true }
            );
        } else {
            fastify.log.error(
                `Response for GET Transaction NOT OK for transactionHash: ${transactionHash}`
            );
        }
    } catch (error) {
        fastify.log.error(
            `Error fetching the GET Transaction for transactionHash = ${transactionHash}`
        );
        fastify.log.error(error);
    }
}

async function fetchAndSaveConversionData(fastify, result) {
    const conversionData = await fastify.db.voyager.Conversion.findOne({
        id: 1,
    });

    if (
        !conversionData ||
        conversionData.wei_in_usd_fetch_time <
            Date.now() - fastify.CONVERSION_FETCH_GAP
    ) {
        fastify.log.info(
            "Conversion data is either stale or absent. Fetching new data from COINGECKO API..."
        );

        try {
            const response = await fetch(fastify.COINGECKO_API_URL);

            if (response.ok) {
                const data = await response.json();
                const usd_in_eth = data.ethereum.usd;

                const wei_in_usd = 1e18 / usd_in_eth;
                result.wei_in_usd = wei_in_usd;

                if (!conversionData) {
                    fastify.log.info(
                        "Conversion data is absent. Creating new one..."
                    );
                    await fastify.db.voyager.Conversion.create({
                        id: 1,
                        wei_in_usd: wei_in_usd,
                        wei_in_usd_fetch_time: Date.now(),
                    });
                } else {
                    fastify.log.info(
                        "Conversion data is stale. Updating it..."
                    );
                    await fastify.db.voyager.Conversion.updateOne(
                        { id: 1 },
                        {
                            wei_in_usd: wei_in_usd,
                            wei_in_usd_fetch_time: Date.now(),
                        },
                        { upsert: true }
                    );
                }
            } else {
                fastify.log.error(`Response for GET Conversion Data NOT OK`);
            }
        } catch (error) {
            fastify.log.error(`Error fetching the GET Conversion Data`);
            fastify.log.error(error);
        }
    } else {
        fastify.log.info("Conversion data is available");
        result.wei_in_usd = conversionData.wei_in_usd;
    }
}

module.exports = { fetchAndSaveTransaction, fetchAndSaveConversionData };
