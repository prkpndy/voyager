import "./styles/loader.css";

export default function Loader({ size = "60px" }) {
    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
            }}
        >
            <div className="loader" style={{ width: size, height: size }}></div>
        </div>
    );
}
