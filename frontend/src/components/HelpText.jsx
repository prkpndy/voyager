import { useState } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import "./styles/helpText.css";

export default function HelpText({ value, children }) {
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
                {children || (
                    <div>
                        <span className={"help-text-span"}>
                            <div className={"help-text-div"}>?</div>
                        </span>
                    </div>
                )}
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Portal>
                <PopoverPrimitive.Content
                    className={"help-text__popover-content"}
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
    );
}
