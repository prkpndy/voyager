import { useState, useEffect } from "react";

import Type from "../../components/Type.jsx";
import TransactionDetails from "../../components/TransactionDetails.jsx";
import DeveloperInfo from "../../components/DeveloperInfo.jsx";
import Copy from "../../components/Copy.jsx";
import HelpText from "../../components/HelpText.jsx";
import StatusAnimation from "../../components/StatusAnimation.jsx";
import Events from "../../components/Events.jsx";
import Loader from "../../components/Loader.jsx";

import URL_PREFIX from "../../api/config.js";
import convertTimestampToActualTime from "../../utils/convertTimeStampToActualTime.js";

import "./index.css";

export default function TransactionInfoPage() {
    // eslint-disable-next-line no-unused-vars
    const [transactionHash, setTransactionHash] = useState(
        window.location.href.split("transactions/")[1]
    );
    const [transactionDetails, setTransactionDetails] = useState(null);
    const [section, setSection] = useState("overview");

    useEffect(() => {
        reloadAPI();
    }, []);

    const reloadAPI = async () => {
        try {
            const response = await fetch(
                URL_PREFIX + `/transactions/${transactionHash}`
            );

            if (response.ok) {
                const data = await response.json();
                setTransactionDetails(data.transaction);
            } else {
                console.log(
                    "Response not OK for fetching transaction details --- reloadAPI"
                );
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={"transaction-info-page"}>
            <div className={"transaction-info-page__margin"}>
                <div className={"transaction-info-page__wrapper"}>
                    {!transactionDetails ? (
                        <Loader />
                    ) : (
                        <>
                            {/*Heading*/}
                            <div className={"transaction-info-page__heading"}>
                                <div dir="v">
                                    <h3>Transaction</h3>
                                </div>
                            </div>

                            <div
                                className={"transaction-info-page__subheading"}
                            >
                                {/*Hash*/}
                                <div
                                    className={
                                        "transaction-info-page__subheading__hash"
                                    }
                                >
                                    <p
                                        className={
                                            "transaction-info-page__subheading__heading"
                                        }
                                    >
                                        HASH
                                    </p>
                                    <div
                                        style={{ display: "flex", gap: "10px" }}
                                    >
                                        <p
                                            style={{
                                                fontSize: "16px",
                                                lineHeight: "32px",
                                                color: "rgb(255, 255, 255)",
                                            }}
                                        >
                                            {
                                                transactionDetails?.transaction_hash
                                            }
                                        </p>
                                        <Copy
                                            value={
                                                transactionDetails?.transaction_hash
                                            }
                                        />
                                    </div>
                                </div>

                                {/*Type*/}
                                <div
                                    className={
                                        "transaction-info-page__subheading__type"
                                    }
                                >
                                    <div
                                        style={{ display: "flex", gap: "10px" }}
                                    >
                                        <p
                                            className={
                                                "transaction-info-page__subheading__heading"
                                            }
                                        >
                                            TYPE
                                        </p>
                                        <HelpText value={"Transaction Type"} />
                                    </div>

                                    <Type value={transactionDetails?.type} />
                                </div>

                                {/*Timestamp*/}
                                <div
                                    className={
                                        "transaction-info-page__subheading__timestamp"
                                    }
                                >
                                    <p
                                        className={
                                            "transaction-info-page__subheading__heading"
                                        }
                                    >
                                        TIMESTAMP
                                    </p>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-end",
                                            gap: "0.5rem",
                                        }}
                                    >
                                        <HelpText
                                            value={
                                                convertTimestampToActualTime(
                                                    transactionDetails?.timestamp
                                                ).date
                                            }
                                        >
                                            <div style={{ cursor: "default" }}>
                                                {
                                                    convertTimestampToActualTime(
                                                        transactionDetails?.timestamp
                                                    ).date
                                                }
                                            </div>
                                        </HelpText>
                                        <HelpText
                                            value={
                                                convertTimestampToActualTime(
                                                    transactionDetails?.timestamp
                                                ).time
                                            }
                                        >
                                            <div
                                                style={{
                                                    fontSize: "12px",
                                                    fontWeight: 400,
                                                    cursor: "default",
                                                }}
                                            >
                                                {
                                                    convertTimestampToActualTime(
                                                        transactionDetails?.timestamp
                                                    ).time
                                                }
                                            </div>
                                        </HelpText>
                                    </div>
                                </div>

                                {/*Status*/}
                                <div
                                    className={
                                        "transaction-info-page__subheading__status"
                                    }
                                >
                                    <p
                                        className={
                                            "transaction-info-page__subheading__heading"
                                        }
                                    >
                                        STATUS
                                    </p>
                                    <StatusAnimation />
                                    {/* <div>PUT THE GRAPH HERE</div> */}
                                </div>
                            </div>

                            {/*Buttons*/}
                            <div
                                style={{
                                    display: "flex",
                                    gap: "40px",
                                    marginBlock: "30px",
                                }}
                            >
                                <div
                                    className={`transaction-info-page__section-button ${section === "overview" ? "transaction-info-page__section-button--active" : "transaction-info-page__section-button--dormant"}`}
                                    onClick={() => {
                                        if (section !== "overview") {
                                            setSection("overview");
                                        }
                                    }}
                                >
                                    Overview
                                </div>
                                <div
                                    className={`transaction-info-page__section-button ${section === "events" ? "transaction-info-page__section-button--active" : "transaction-info-page__section-button--dormant"}`}
                                    onClick={() => {
                                        if (section !== "events") {
                                            setSection("events");
                                        }
                                    }}
                                >
                                    Events
                                    <div className="transaction-info-page__section-button-info">
                                        {transactionDetails?.num_events || 0}
                                    </div>
                                </div>
                            </div>

                            <div className={"transaction-info-page__content"}>
                                {section === "overview" ? (
                                    <div>
                                        <TransactionDetails
                                            transactionDetails={
                                                transactionDetails
                                            }
                                        />

                                        <div
                                            className={
                                                "transaction-info-page__content__developer-info"
                                            }
                                        >
                                            <DeveloperInfo
                                                transactionDetails={
                                                    transactionDetails
                                                }
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <Events
                                        transactionDetails={transactionDetails}
                                    />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
