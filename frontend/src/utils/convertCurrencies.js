function convertWEIToETH(wei) {
    let eth = wei / 1e18;
    eth = eth.toFixed(20);

    return eth;
}

function convertWEIToUSD(wei, WEIInUSD) {
    console.log(WEIInUSD);
    if (isNaN(wei) || isNaN(WEIInUSD)) {
        return "-";
    }

    let usd = wei / WEIInUSD;
    usd = usd.toFixed(20);

    return usd;
}

export { convertWEIToETH, convertWEIToUSD };
