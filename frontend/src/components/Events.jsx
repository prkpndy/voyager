import Copy from "./Copy";

import convertTimestampToAge from "../utils/convertTimestampToAge";

import "./styles/events.css";

export default function Events({ transactionDetails }) {
    const headers = ["ID", "BLOCK", "AGE"];

    return (
        <table className={"events__table"}>
            <thead className={"transactions-page__table__header"}>
                <tr>
                    {headers.map((header, index) => {
                        return <th key={index}>{header}</th>;
                    })}
                </tr>
            </thead>
            <tbody className={"transactions-page__table__body"}>
                {Array.apply(null, Array(transactionDetails?.num_events || 0))
                    .map(function (x, i) {
                        return i;
                    })
                    ?.map((value, index) => {
                        return (
                            <tr key={index} className="call-data__row">
                                <td className={"call-data__row-content"}>
                                    <div
                                        style={{ display: "flex", gap: "10px" }}
                                    >
                                        <p>{`${transactionDetails?.block_number}_${transactionDetails?.position}_${value}`}</p>{" "}
                                        <Copy
                                            value={`${transactionDetails?.block_number}_${transactionDetails?.position}_${value}`}
                                        />
                                    </div>
                                </td>
                                <td className={"call-data__row-content"}>
                                    <div
                                        style={{ display: "flex", gap: "10px" }}
                                    >
                                        <p>
                                            {transactionDetails?.block_number ||
                                                "-"}
                                        </p>
                                        <Copy
                                            value={
                                                transactionDetails?.block_number ||
                                                "-"
                                            }
                                        />
                                    </div>
                                </td>
                                <td className={"call-data__row-content"}>
                                    <div
                                        style={{ display: "flex", gap: "10px" }}
                                    >
                                        <p>
                                            {convertTimestampToAge(
                                                transactionDetails?.timestamp
                                            )}
                                        </p>{" "}
                                        <Copy
                                            value={convertTimestampToAge(
                                                transactionDetails?.timestamp
                                            )}
                                        />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
}
