import "./styles/transactionInfoKey.css";
import HelpText from "./HelpText.jsx";

export default function TransactionInfoKey({ value, helpText }) {
    return (
        <div className={"transaction-info-key"}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <HelpText value={helpText} />
                <h6 className="transaction-info-key__title">{value}</h6>
            </div>
        </div>
    );
}
