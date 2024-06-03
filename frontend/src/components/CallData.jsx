import { useState, useEffect } from "react";

import Copy from "./Copy.jsx";
import Link from "./Link.jsx";
import RowTransactionInfoPage from "./RowTransactionInfoPage.jsx";

import hexToText from "../utils/hexToText.js";

import "../app/transactions/index.css";
import "./styles/callData.css";

export default function CallData({ data }) {
    const [selectedButton, setSelectedButton] = useState("Hex");
    const [callData, setCallData] = useState(data);

    useEffect(() => {
        if (selectedButton === "Hex") {
            setCallData(data);
        } else if (selectedButton === "Dec") {
            setCallData(data.map((value) => BigInt(value)?.toString()));
        } else if (selectedButton === "Text") {
            setCallData(data.map((value) => hexToText(value)));
        }
    }, [data, selectedButton]);

    const buttons = ["Hex", "Dec", "Text"];

    const headers = ["INPUT", "VALUE"];

    return (
        <div className={"call-data"}>
            <div className={"call-data__buttons"}>
                <div dir={"ltr"} className={"call-data__buttons__div"}>
                    {["Calls", "Transactions"].map((button, index) => {
                        return (
                            <button
                                className={`call-data__button ${"Transactions" === button ? "call-data__button--on" : "call-data__button--off"}`}
                                key={index}
                            >
                                {button}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className={"call-data-content"}>
                <div className={"call-data-content__execute"}>
                    <div
                        style={{
                            color: "rgb(191, 67, 202)",
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        __execute__
                        <Copy value={"__execute__"} />
                    </div>
                    (
                    <div
                        style={{
                            color: "rgb(185, 28, 28)",
                            display: "inline-block",
                            textAlign: "left",
                        }}
                    >
                        calls
                    </div>
                    )
                    <div
                        style={{ marginLeft: "4px", color: "rgb(77, 77, 213)" }}
                    >
                        {" "}
                        →{" "}
                    </div>
                    <div style={{ display: "flex", gap: "5px" }}>
                        {" "}
                        123456789 <Copy value={"123456789"} />{" "}
                    </div>
                </div>

                <div className={"call-data-content__address"}>
                    Address:
                    <div style={{ display: "flex" }}>
                        <Link
                            href={"google.com"}
                            displayString={"Ardent"}
                            popoverValue={"1234567"}
                        />
                        <Copy value={"Ardent"} />
                    </div>
                </div>

                <div className={"call-data-content__data"}>
                    {/*Buttons*/}
                    <div style={{ display: "flex", gap: "40px" }}>
                        <div className={"call-data__buttons"}>
                            <div
                                dir={"ltr"}
                                className={"call-data__buttons__div"}
                            >
                                <button
                                    className={`call-data__button call-data__button--off`}
                                >
                                    <Copy
                                        value={JSON.stringify(
                                            callData?.map((value, index) => {
                                                return { index, value };
                                            })
                                        )}
                                        type={"bold"}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className={"call-data__buttons"}>
                            <div
                                dir={"ltr"}
                                className={"call-data__buttons__div"}
                            >
                                {buttons.map((button, index) => {
                                    return (
                                        <button
                                            className={`call-data__button ${selectedButton === button ? "call-data__button--on" : "call-data__button--off"}`}
                                            key={index}
                                            onClick={() =>
                                                setSelectedButton(button)
                                            }
                                        >
                                            {button}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className={"call-data__buttons"}>
                            <div
                                dir={"ltr"}
                                className={"call-data__buttons__div"}
                            >
                                {["Decoded", "Raw"].map((button, index) => {
                                    return (
                                        <button
                                            className={`call-data__button ${"Raw" === button ? "call-data__button--on" : "call-data__button--off"}`}
                                            key={index}
                                        >
                                            {button}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/*Table*/}
                    <table className={"call-data__table"}>
                        <thead className={"transactions-page__table__header"}>
                            <tr>
                                {headers.map((header, index) => {
                                    return <th key={index}>{header}</th>;
                                })}
                            </tr>
                        </thead>
                        <tbody className={"transactions-page__table__body"}>
                            {callData?.map((value, index) => {
                                return (
                                    <RowTransactionInfoPage
                                        key={value}
                                        data={[index, `"${value}"`]}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
