import TransactionInfoKey from "./TransactionInfoKey.jsx";
import TransactionInfoValue from "./TransactionInfoValue.jsx";
import Link from "./Link.jsx";
import Copy from "./Copy.jsx";

import convertTimestampToActualTime from "../utils/convertTimeStampToActualTime.js";
import convertTimestampToAge from "../utils/convertTimestampToAge.js";
import {
    convertWEIToETH,
    convertWEIToUSD,
} from "../utils/convertCurrencies.js";

import "./styles/transactionDetails.css";

export default function TransactionDetails({ transactionDetails }) {
    return (
        <div className={"transaction-info-page__content__transaction-details"}>
            {/* Heading */}
            <h3 className={"transaction-info-page__content__heading"}>
                Transaction Details
            </h3>

            {/* Details */}
            <div
                className={
                    "transaction-info-page__content__transaction-details"
                }
            >
                {/* BLOCK NUMBER */}
                <div
                    className={
                        "transaction-info-page__content__transaction-details__row"
                    }
                >
                    <TransactionInfoKey
                        value={"BLOCK NUMBER: "}
                        helpText={
                            "Unique number of the block in which the transaction is processed"
                        }
                    />
                    <TransactionInfoValue>
                        <div style={{ display: "flex" }}>
                            <Link
                                href={transactionDetails?.transaction_hash}
                                displayString={transactionDetails?.block_number}
                                popoverValue={
                                    transactionDetails?.transaction_hash
                                }
                            />
                        </div>
                    </TransactionInfoValue>
                </div>

                {/* TIMESTAMP */}
                <div
                    className={
                        "transaction-info-page__content__transaction-details__row"
                    }
                >
                    <TransactionInfoKey
                        value={"TIMESTAMP: "}
                        helpText={"Time at which the transaction was processed"}
                    />
                    <TransactionInfoValue>
                        <p>{`${convertTimestampToAge(transactionDetails?.timestamp)} ( ${convertTimestampToActualTime(transactionDetails?.timestamp).date} ${convertTimestampToActualTime(transactionDetails?.timestamp).time} )`}</p>
                    </TransactionInfoValue>
                </div>

                {/* ACTUAL FEE */}
                <div
                    className={
                        "transaction-info-page__content__transaction-details__row"
                    }
                >
                    <TransactionInfoKey
                        value={"ACTUAL FEE: "}
                        helpText={
                            "Actual fee paid for executing the transaction"
                        }
                    />
                    <TransactionInfoValue>
                        <div style={{ display: "flex", gap: "15px" }}>
                            <div style={{ display: "flex", gap: "5px" }}>
                                <p>{`${convertWEIToETH(transactionDetails?.actual_fee)} ETH`}</p>
                                <Copy
                                    value={convertWEIToETH(
                                        transactionDetails?.actual_fee
                                    )}
                                />
                            </div>
                            <div style={{ display: "flex", gap: "5px" }}>
                                <p>{`($${convertWEIToUSD(transactionDetails?.actual_fee, transactionDetails?.wei_in_usd)})`}</p>
                                <Copy
                                    value={convertWEIToUSD(
                                        transactionDetails?.actual_fee,
                                        transactionDetails?.wei_in_usd
                                    )}
                                />
                            </div>
                        </div>
                    </TransactionInfoValue>
                </div>

                {/* MAX FEE */}
                <div
                    className={
                        "transaction-info-page__content__transaction-details__row"
                    }
                >
                    <TransactionInfoKey
                        value={"MAX FEE: "}
                        helpText={"Max fee set when submitting the transaction"}
                    />
                    <TransactionInfoValue>
                        <div style={{ display: "flex", gap: "15px" }}>
                            <div style={{ display: "flex", gap: "5px" }}>
                                <p>{`${convertWEIToETH(transactionDetails?.max_fee)} ETH`}</p>
                                <Copy
                                    value={convertWEIToETH(
                                        transactionDetails?.max_fee
                                    )}
                                />
                            </div>
                            <div style={{ display: "flex", gap: "5px" }}>
                                <p>{`($${convertWEIToUSD(transactionDetails?.max_fee, transactionDetails?.wei_in_usd)})`}</p>
                                <Copy
                                    value={convertWEIToUSD(
                                        transactionDetails?.max_fee,
                                        transactionDetails?.wei_in_usd
                                    )}
                                />
                            </div>
                        </div>
                    </TransactionInfoValue>
                </div>

                {/* GAS CONSUMED */}
                <div
                    className={
                        "transaction-info-page__content__transaction-details__row"
                    }
                >
                    <TransactionInfoKey
                        value={"GAS CONSUMED: "}
                        helpText={"Gas consumed for the transaction execution"}
                    />
                    <TransactionInfoValue>
                        <p>
                            {transactionDetails?.gas_consumed?.$numberDecimal ||
                                "-"}
                        </p>
                    </TransactionInfoValue>
                </div>

                {/* SENDER ADDRESS */}
                <div
                    className={
                        "transaction-info-page__content__transaction-details__row"
                    }
                >
                    <TransactionInfoKey
                        value={"SENDER ADDRESS: "}
                        helpText={"Sending party of the transaction"}
                    />
                    <TransactionInfoValue>
                        {transactionDetails?.sender_address ? (
                            <div style={{ display: "flex", gap: "10px" }}>
                                <p>{transactionDetails?.sender_address}</p>
                                <Copy
                                    value={transactionDetails?.sender_address}
                                />
                            </div>
                        ) : (
                            <p> - </p>
                        )}
                    </TransactionInfoValue>
                </div>
            </div>
        </div>
    );
}
