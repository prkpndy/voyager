import Copy from "./Copy.jsx";

export default function Value({ value }) {
    return (
        <div className={"call-data__row-content__value"}>
            <code>{value}</code>
            <Copy value={value} />
        </div>
    );
}
