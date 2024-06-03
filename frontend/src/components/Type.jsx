import "./styles/type.css";

export default function Type({ value, customIdentifier }) {
    return (
        <div
            className={`transactions-page__table__type transactions-page__table__type--${customIdentifier ? customIdentifier : value?.toLowerCase()?.replaceAll("_", "-")}`}
        >
            {value}
        </div>
    );
}
