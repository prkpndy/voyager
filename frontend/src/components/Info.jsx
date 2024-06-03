import "./styles/info.css";

export default function Info({ key, children, helpText }) {
    return (
        <div className={"info"}>
            <div className={"info__key"}>
                <div style={{ marginTop: "10px" }}>
                    <span className={"info__key__help-text-span"}>
                        <div className={"info__key__help-text-div"}>?</div>
                    </span>
                </div>
            </div>

            <div className={"info__value"}>
                <div className={"info__value__div"}>{children}</div>
            </div>
        </div>
    );
}
