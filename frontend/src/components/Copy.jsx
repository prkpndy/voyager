import { useEffect, useState } from "react";

import "./styles/copy.css";

export default function Copy({ value, type = "normal" }) {
    const [isCopiedVisible, setIsCopiedVisible] = useState(false);

    useEffect(() => {
        if (isCopiedVisible === true) {
            setTimeout(() => setIsCopiedVisible(false), 1000);
        }
    }, [isCopiedVisible]);

    return (
        <span
            className={"copy-span"}
            onClick={() => {
                setIsCopiedVisible(true);
                return navigator.clipboard.writeText(value || "");
            }}
        >
            <div role={"button"} className={"copy-div"}>
                <svg
                    className={"copy-svg"}
                    strokeWidth="2px"
                    width={type === "normal" ? "16" : "24"}
                    height={type === "normal" ? "16" : "24"}
                    viewBox="0 0 24 24"
                    role="img"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    style={
                        type === "normal"
                            ? {
                                  stroke: "rgb(151, 151, 151)",
                                  color: "rgb(151, 151, 151)",
                              }
                            : {
                                  stroke: "rgb(255, 255, 255)",
                                  color: "rgb(255, 255, 255)",
                              }
                    }
                >
                    <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                {isCopiedVisible && (
                    <div
                        className={"copied"}
                        style={
                            type === "normal"
                                ? { fontSize: "0.75rem" }
                                : { fontSize: "1rem" }
                        }
                    >
                        COPIED!
                    </div>
                )}
            </div>
        </span>
    );
}
