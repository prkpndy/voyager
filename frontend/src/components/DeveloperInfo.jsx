import TransactionInfoKey from "./TransactionInfoKey.jsx";
import TransactionInfoValue from "./TransactionInfoValue.jsx";
import Copy from "./Copy.jsx";
import Type from "./Type.jsx";
import CallData from "./CallData.jsx";
import Signature from "./Signature.jsx";

import "./styles/transactionDetails.css";

export default function DeveloperInfo({ transactionDetails }) {
    const executionResourcesMap = {
        steps: "STEPS",
        pedersen_builtin_applications: "PEDERSEN_BUILTIN",
        range_check_builtin_applications: "RANGE_CHECK_BUILTIN",
        ec_op_builtin_applications: "EC_OP_BUILTIN",
    };

    return (
        <div className={"transaction-info-page__content__transaction-details"}>
            {/* Heading */}
            <h3 className={"transaction-info-page__content__heading"}>
                Developer Info
            </h3>

            {/* Details */}
            <div
                className={
                    "transaction-info-page__content__transaction-details"
                }
            >
                {/* UNIX TIMESTAMP */}
                <div
                    className={
                        "transaction-info-page__content__transaction-details__row"
                    }
                >
                    <TransactionInfoKey
                        value={"UNIX TIMESTAMP: "}
                        helpText={
                            "Unix timestamp at which the transaction was processed"
                        }
                    />
                    <TransactionInfoValue>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <p>{transactionDetails?.timestamp}</p>
                            <Copy value={transactionDetails?.timestamp} />
                        </div>
                    </TransactionInfoValue>
                </div>

                {/* NONCE */}
                <div
                    className={
                        "transaction-info-page__content__transaction-details__row"
                    }
                >
                    <TransactionInfoKey
                        value={"NONCE: "}
                        helpText={"Nonce of the transaction"}
                    />
                    <TransactionInfoValue>
                        <p>{transactionDetails?.nonce}</p>
                    </TransactionInfoValue>
                </div>

                {/* POSITION */}
                <div
                    className={
                        "transaction-info-page__content__transaction-details__row"
                    }
                >
                    <TransactionInfoKey
                        value={"POSITION: "}
                        helpText={"Index of the transaction within the block"}
                    />
                    <TransactionInfoValue>
                        <p>{transactionDetails?.position}</p>
                    </TransactionInfoValue>
                </div>

                {/* VERSION */}
                <div
                    className={
                        "transaction-info-page__content__transaction-details__row"
                    }
                >
                    <TransactionInfoKey
                        value={"VERSION: "}
                        helpText={"Version of the transaction"}
                    />
                    <TransactionInfoValue>
                        <p>{transactionDetails?.version}</p>
                    </TransactionInfoValue>
                </div>

                {/* EXECUTION RESOURCES */}
                <div
                    className={
                        "transaction-info-page__content__transaction-details__row"
                    }
                >
                    <TransactionInfoKey
                        value={"EXECUTION RESOURCES: "}
                        helpText={
                            "Resources utilized to execute the transaction"
                        }
                    />
                    <TransactionInfoValue>
                        <div
                            style={{
                                marginBlock: "10px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            {transactionDetails?.execution_resources?.steps && (
                                <Type
                                    value={`${transactionDetails?.execution_resources?.steps} ${executionResourcesMap["steps"]}`}
                                    customIdentifier={"invoke"}
                                />
                            )}
                            <div style={{ display: "flex", gap: "10px" }}>
                                {transactionDetails?.execution_resources
                                    ?.pedersen_builtin_applications && (
                                    <Type
                                        value={`${transactionDetails?.execution_resources?.pedersen_builtin_applications} ${executionResourcesMap["pedersen_builtin_applications"]}`}
                                        customIdentifier={"execution-resources"}
                                    />
                                )}
                                {transactionDetails?.execution_resources
                                    ?.range_check_builtin_applications && (
                                    <Type
                                        value={`${transactionDetails?.execution_resources?.range_check_builtin_applications} ${executionResourcesMap["range_check_builtin_applications"]}`}
                                        customIdentifier={"execution-resources"}
                                    />
                                )}
                                {transactionDetails?.execution_resources
                                    ?.ec_op_builtin_applications && (
                                    <Type
                                        value={`${transactionDetails?.execution_resources?.ec_op_builtin_applications} ${executionResourcesMap["ec_op_builtin_applications"]}`}
                                        customIdentifier={"execution-resources"}
                                    />
                                )}
                            </div>
                        </div>
                    </TransactionInfoValue>
                </div>

                {/* CALL DATA */}
                <div
                    className={
                        "transaction-info-page__content__transaction-details__row"
                    }
                >
                    <TransactionInfoKey
                        value={"CALLDATA:"}
                        helpText={"Calldata that was sent in the transaction"}
                    />
                    <TransactionInfoValue>
                        <CallData data={transactionDetails?.calldata} />
                    </TransactionInfoValue>
                </div>

                {/* SIGNATURE */}
                <div
                    className={
                        "transaction-info-page__content__transaction-details__row"
                    }
                >
                    <TransactionInfoKey
                        value={"SIGNATURE(S):"}
                        helpText={"Signature(s) of the transaction"}
                    />
                    <TransactionInfoValue>
                        <Signature data={transactionDetails?.signature} />
                    </TransactionInfoValue>
                </div>
            </div>
        </div>
    );
}
