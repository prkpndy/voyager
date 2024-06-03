import { useEffect, useState } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Link } from "react-router-dom";

import "./styles/hash.css";

export default function Hash({ value }) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isCopiedVisible, setIsCopiedVisible] = useState(false);

    const n = value.length;
    const displayString = value.slice(0, 6) + "..." + value.slice(n - 3, n);

    useEffect(() => {
        if (isCopiedVisible === true) {
            setTimeout(() => setIsCopiedVisible(false), 1000);
        }
    }, [isCopiedVisible]);

    return (
        <div className={"hash"}>
            <PopoverPrimitive.Root
                open={isPopoverOpen}
                onOpenChange={setIsPopoverOpen}
            >
                <PopoverPrimitive.Trigger
                    asChild
                    onMouseEnter={() => {
                        setIsPopoverOpen(true);
                    }}
                    onMouseLeave={() => {
                        setIsPopoverOpen(false);
                    }}
                >
                    {/* <a href={window.location.href + `transaction/${value}`}>
                        {displayString}
                    </a> */}
                    <Link to={value}>{displayString}</Link>
                </PopoverPrimitive.Trigger>
                <PopoverPrimitive.Portal>
                    <PopoverPrimitive.Content
                        className={"popover-content"}
                        side={"top"}
                        avoidCollisions={false}
                        onOpenAutoFocus={(event) => event.preventDefault()}
                        onCloseAutoFocus={(event) => event.preventDefault()}
                    >
                        {value}
                        <PopoverPrimitive.Arrow className={"popover-arrow"} />
                    </PopoverPrimitive.Content>
                </PopoverPrimitive.Portal>
            </PopoverPrimitive.Root>

            <span
                onClick={() => {
                    setIsCopiedVisible(true);
                    return navigator.clipboard.writeText(value);
                }}
            >
                <div role={"button"} className={"hash-copy-div"}>
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
                        <div className={"hash-copied"}>COPIED!</div>
                    )}
                </div>
            </span>
        </div>
    );
}
