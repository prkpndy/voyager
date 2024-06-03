import { useState } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import "./styles/status.css";

export default function Status() {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (
        <span className={"status"}>
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
                    <svg
                        strokeWidth="2px"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        role="img"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        className="sc-kAyceB iHwjMm"
                    >
                        <g clipPath="url(#clip0_20_8578)">
                            <path
                                d="M15.757 10.502L8.25699 6.00195C8.17934 5.95542 8.09052 5.93085 7.99999 5.93085C7.90947 5.93085 7.82064 5.95542 7.74299 6.00195L0.242992 10.502C0.168838 10.5463 0.107458 10.6092 0.0648385 10.6844C0.0222193 10.7596 -0.000183105 10.8445 -0.000183105 10.931C-0.000183105 11.0174 0.0222193 11.1023 0.0648385 11.1775C0.107458 11.2527 0.168838 11.3156 0.242992 11.36L7.74299 15.86C7.82064 15.9065 7.90947 15.9311 7.99999 15.9311C8.09052 15.9311 8.17934 15.9065 8.25699 15.86L15.757 11.36C15.8311 11.3156 15.8925 11.2527 15.9351 11.1775C15.9778 11.1023 16.0002 11.0174 16.0002 10.931C16.0002 10.8445 15.9778 10.7596 15.9351 10.6844C15.8925 10.6092 15.8311 10.5463 15.757 10.502Z"
                                fill="#117D49"
                                strokeWidth="0"
                            ></path>
                            <path
                                d="M8 2.43085L15.5 6.93085L8 11.4308L0.5 6.93085L8 2.43085Z"
                                fill="white"
                                stroke="#117D49"
                                strokeWidth="1"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </g>
                        <defs>
                            <clipPath id="clip0_20_8578">
                                <rect
                                    width="16"
                                    height="16"
                                    fill="white"
                                    transform="translate(0 0.930847)"
                                ></rect>
                            </clipPath>
                        </defs>
                    </svg>
                </PopoverPrimitive.Trigger>
                <PopoverPrimitive.Portal>
                    <PopoverPrimitive.Content
                        className={"popover-content"}
                        side={"top"}
                        avoidCollisions={false}
                        onOpenAutoFocus={(event) => event.preventDefault()}
                        onCloseAutoFocus={(event) => event.preventDefault()}
                    >
                        {"Accepted on L2"}
                        <PopoverPrimitive.Arrow className={"popover-arrow"} />
                    </PopoverPrimitive.Content>
                </PopoverPrimitive.Portal>
            </PopoverPrimitive.Root>
        </span>
    );
}
