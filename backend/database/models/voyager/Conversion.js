const mongoose = require("mongoose");

const conversionSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: false,
    },
    wei_in_usd: {
        type: Number,
        required: false,
    },
    wei_in_usd_fetch_time: {
        type: Number,
        required: false,
    },
});

module.exports = mongoose.model("Conversion", conversionSchema);
