import Copy from "./Copy.jsx";

import "./styles/signature.css";

export default function Signature({ data }) {
    return (
        <table className={"signature__table"}>
            <tbody className={"transactions-page__table__body"}>
                {data?.map((value, index) => {
                    return (
                        <tr key={index} className="call-data__row">
                            <td className={"call-data__row-content"}>
                                <div
                                    className={"signature__row-content__value"}
                                >
                                    <code>{value}</code>
                                    <Copy value={value} />
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
