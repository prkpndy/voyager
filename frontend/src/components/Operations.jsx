import "./styles/operations.css";

export default function Operations({ value }) {
    const n = value.length;
    const displayString = value.slice(0, 6) + "..." + value.slice(n - 3, n);
    return (
        <div className={"operations"}>
            {displayString}
            {/* <a href={window.location.href + `transaction/${value}`}>
                {displayString}
            </a> */}
        </div>
    );
}
