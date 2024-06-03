import Input from "./Input.jsx";
import Value from "./Value.jsx";

import "./styles/rowTransactionInfoPage.css";

export default function RowTransactionInfoPage({ data }) {
    return (
        <tr className="call-data__row">
            {data.map((item, i) => {
                if (i === 0) {
                    return (
                        <td key={i} className={"call-data__row-content"}>
                            <Input value={item} />
                        </td>
                    );
                } else if (i === 1) {
                    return (
                        <td key={i} className={"call-data__row-content"}>
                            <Value value={item} />
                        </td>
                    );
                }

                return (
                    <td key={i} className={"call-data__row-content"}>
                        {item}
                    </td>
                );
            })}
        </tr>
    );
}
