function cleanAndSaveTransactions(fastify, transactions) {
    for (let transaction of transactions) {
        transaction.max_fee = Number(transaction.max_fee) || null;
        transaction.l1_gas_price = Number(transaction.l1_gas_price) || null;
        transaction.nonce = Number(transaction.nonce) || null;
        transaction.version = Number(transaction.version) || null;
    }

    console.log(`--->>> Saving all transactions to MongoDB...`);

    return fastify.db.voyager.Transaction.insertMany(transactions)
        .then((docs) => {
            console.log(`--->>> Transactions saved!`);
        })
        .catch((error) => {
            console.log(error);
        });
}

async function fetchAndSaveTransactions(fastify, startBlock, endBlock) {
    let transactions = [];

    for (let blockNumber = startBlock; blockNumber <= endBlock; blockNumber++) {
        try {
            console.log(`--->>> Fetching data for block ${blockNumber}`);

            const response = await fetch(fastify.STARKNET_API_URL, {
                method: "POST",
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    method: "starknet_getBlockWithTxs",
                    params: [
                        {
                            block_number: blockNumber,
                        },
                    ],
                    id: 1,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();

                const l1_gas_price = data.result.l1_gas_price?.price_in_wei;
                const timestamp = data.result.timestamp;
                const blockTransactions = data.result.transactions;
                const blockNumber = data.result.block_number;

                blockTransactions.map((txn, i) => {
                    txn.l1_gas_price = l1_gas_price;
                    txn.timestamp = timestamp;
                    txn.position = i;
                    txn.block_number = blockNumber;
                });

                transactions.push(...blockTransactions);
            } else {
                console.log(
                    `Response for GET Block Data NOT OK for blockNumber: ${blockNumber}`
                );
            }
        } catch (error) {
            console.log(
                `Error fetching the GET Block Data for blockNumber = ${blockNumber}: `,
                error
            );
        }
    }

    console.log(`--->>> Total transactions fetched = ${transactions.length}`);

    await cleanAndSaveTransactions(fastify, transactions);
}

async function getData() {
    let latestBlockNumber;

    try {
        const response = await fetch(this.STARKNET_API_URL, {
            method: "POST",
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "starknet_blockNumber",
                params: [],
                id: 1,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            latestBlockNumber = data.result;
        } else {
            console.log("Response for GET Latest Block Number NOT OK");
            process.exit(1);
        }
    } catch (error) {
        console.log("Error fetching the Latest Block Number: ", error);
    }

    if (this.lastBlockFetched === null) {
        this.log.info("Fetching for the first time...");
        this.lastBlockFetched = latestBlockNumber - this.BLOCKS_TO_FETCH - 1;
    }

    await fetchAndSaveTransactions(
        this,
        this.lastBlockFetched + 1,
        latestBlockNumber - 1
    );
    this.lastBlockFetched = latestBlockNumber - 1;
}

module.exports = getData;
