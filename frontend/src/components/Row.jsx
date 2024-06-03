import Hash from "./Hash.jsx";
import Operations from "./Operations.jsx";
import Block from "./Block.jsx";
import Status from "./Status.jsx";
import Type from "./Type.jsx";

import convertTimestampToAge from "../utils/convertTimestampToAge.js";

import "./styles/row.css";

export default function Row({ data }) {
    return (
        <tr className="row">
            <td className={"row-content"}>
                <Status />
            </td>
            <td className={"row-content"}>
                <Hash value={data?.transaction_hash} />
            </td>
            <td className={"row-content"}>
                <Type value={data?.type} />
            </td>
            <td className={"row-content"}>
                <Operations value={data?.transaction_hash} />
            </td>
            <td className={"row-content"}>
                <Block value={data?.block_number} />
            </td>
            <td className={"row-content"}>
                {convertTimestampToAge(data?.timestamp)}
            </td>
        </tr>
    );
}
