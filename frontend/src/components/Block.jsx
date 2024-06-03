import { useEffect, useState } from "react";

import "./styles/block.css";

export default function Block({ value }) {
    const [isCopiedVisible, setIsCopiedVisible] = useState(false);

    useEffect(() => {
        if (isCopiedVisible === true) {
            setTimeout(() => setIsCopiedVisible(false), 1000);
        }
    }, [isCopiedVisible]);

    return (
        <div className={"block"}>
            {value}
            <span
                onClick={() => {
                    setIsCopiedVisible(true);
                    return navigator.clipboard.writeText(value);
                }}
            >
                <div role={"button"} className={"block-copy-div"}>
                    <svg
                        strokeWidth="2px"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        role="img"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    {isCopiedVisible && (
                        <div className={"block-copied"}>COPIED!</div>
                    )}
                </div>
            </span>
        </div>
    );
}
