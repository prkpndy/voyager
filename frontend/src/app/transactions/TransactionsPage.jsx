import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import URL_PREFIX from "../../api/config.js";
import Row from "../../components/Row.jsx";
import Loader from "../../components/Loader.jsx";

import "./index.css";

const PAGINATION_LIMIT = 50;

export default function TransactionsPage() {
    const [sectionOn, setSectionOn] = useState("All");
    const [lastBlock, setLastBlock] = useState(1e9);
    const [lastPosition, setLastPosition] = useState(-1);
    const [transactions, setTransactions] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    // Getting data from the backend once
    useEffect(() => {
        reloadAPI();
    }, []);

    useEffect(() => {
        reloadAPI();
    }, [sectionOn]);

    const buttons = [
        "All",
        "declare",
        "deploy",
        "deploy_account",
        "invoke",
        "l1_handler",
    ];

    const headers = ["STATUS", "HASH", "TYPE", "OPERATIONS", "BLOCK", "AGE"];

    const reloadAPI = async () => {
        try {
            const response = await fetch(
                URL_PREFIX +
                    `/transactions${sectionOn !== "All" ? `?type=${sectionOn}` : ""}`
            );

            if (response.ok) {
                const data = await response.json();
                setTransactions(data.transactions);
                setLastBlock(data.block_number);
                setLastPosition(data.position);

                data.transactions?.length < PAGINATION_LIMIT
                    ? setHasMore(false)
                    : setHasMore(true);
            } else {
                console.log(
                    "Response not OK for fetching transactions --- reloadAPI"
                );
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMoreData = async () => {
        try {
            const response = await fetch(
                URL_PREFIX +
                    `/transactions?block_number=${lastBlock}&position=${lastPosition}${sectionOn !== "All" ? `&type=${sectionOn}` : ""}`
            );

            if (response.ok) {
                const data = await response.json();
                setTransactions((prevTransactions) => [
                    ...prevTransactions,
                    ...data.transactions,
                ]);
                setLastBlock(data.block_number);
                setLastPosition(data.position);

                data.transactions?.length < PAGINATION_LIMIT
                    ? setHasMore(false)
                    : setHasMore(true);
            } else {
                console.log(
                    "Request not OK for fetching transactions --- fetchMoreData"
                );
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={"transactions-page"}>
            <div className={"transactions-page__margin"}>
                <div className={"transactions-page__wrapper"}>
                    {/*Heading*/}
                    <div className={"transactions-page__heading"}>
                        <div dir="v">
                            <h3>Transactions</h3>
                            <p>A list of transactions on Starknet</p>
                        </div>
                    </div>

                    {/*Buttons*/}
                    <div className={"transactions-page__buttons"}>
                        <div
                            dir={"ltr"}
                            className={"transactions-page__buttons__div"}
                        >
                            {buttons.map((button, index) => {
                                return (
                                    <button
                                        className={`transactions-page__button ${sectionOn === button ? "transactions-page__button--on" : "transactions-page__button--off"}`}
                                        key={index}
                                        onClick={() => setSectionOn(button)}
                                    >
                                        {button}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/*Table*/}
                    <InfiniteScroll
                        dataLength={transactions.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<Loader />}
                    >
                        <table className={"transactions-page__table"}>
                            <thead
                                className={"transactions-page__table__header"}
                            >
                                <tr>
                                    {headers.map((header, index) => {
                                        return <th key={index}>{header}</th>;
                                    })}
                                </tr>
                            </thead>
                            <tbody className={"transactions-page__table__body"}>
                                {transactions.map((data, index) => {
                                    return <Row data={data} key={index} />;
                                })}
                            </tbody>
                        </table>
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
}

/**
 * TODO
 * Fix table row hover
 */
