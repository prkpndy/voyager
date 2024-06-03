import { useState } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import "./styles/link.css";

export default function Link({ href, displayString, popoverValue }) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (
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
                <a
                    style={{
                        textDecoration: "none",
                        color: "rgb(139, 163, 223)",
                        cursor: "pointer",
                    }}
                    href={href}
                >
                    {displayString}
                </a>
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Portal>
                <PopoverPrimitive.Content
                    className={"popover-content"}
                    side={"top"}
                    avoidCollisions={false}
                    onOpenAutoFocus={(event) => event.preventDefault()}
                    onCloseAutoFocus={(event) => event.preventDefault()}
                >
                    {popoverValue}
                    <PopoverPrimitive.Arrow className={"popover-arrow"} />
                </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
    );
}
