import "./styles/transactionInfoValue.css";

export default function TransactionInfoValue({ children }) {
    return (
        <div className={"transaction-info-value"}>
            <div className={"transaction-info-value__div"}>{children}</div>
        </div>
    );
}
