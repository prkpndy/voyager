const mongoose = require("mongoose");

const executionResourcesSchema = new mongoose.Schema({
    steps: {
        type: Number,
        required: false,
    },
    pedersen_builtin_applications: {
        type: Number,
        required: false,
    },
    range_check_builtin_applications: {
        type: Number,
        required: false,
    },
    ec_op_builtin_applications: {
        type: Number,
        required: false,
    },
});

const transactionSchema = new mongoose.Schema({
    transaction_hash: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: false,
    },
    timestamp: {
        type: Number,
        required: false,
    },
    max_fee: {
        type: Number,
        required: false,
    },
    l1_gas_price: {
        type: Number,
        required: false,
    },
    sender_address: {
        type: String,
        required: false,
    },
    nonce: {
        type: Number,
        required: false,
    },
    version: {
        type: Number,
        required: false,
    },
    calldata: {
        type: [String],
        required: false,
    },
    signature: {
        type: [String],
        required: false,
    },
    position: {
        type: Number,
        required: false,
    },
    block_number: {
        type: Number,
        required: false,
    },

    actual_fee: {
        type: Number,
        required: false,
    },
    gas_consumed: {
        type: mongoose.Types.Decimal128,
        required: false,
    }, // actual_fee / l1_gas_price
    execution_resources: {
        type: executionResourcesSchema,
        required: false,
    },
    num_events: {
        type: Number,
        required: false,
    },

    fetched_all: {
        type: Boolean,
        required: false,
        default: false,
    },
});

module.exports = mongoose.model("Transaction", transactionSchema);
