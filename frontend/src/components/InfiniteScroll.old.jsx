import { useEffect, useRef } from "react";

import Loader from "./Loader";

export default function InfiniteScroll({
    children,
    fetchMoreData,
    hasMore,
    className = "",
    scrollBarRef: scrollRef,
}) {
    const hasFetched = useRef(true);
    const handleScrollRef = useRef(null);

    const handleFetch = (value) => {
        setTimeout(() => (hasFetched.current = value), 100);
    };

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
        // const { scrollTop, clientHeight, scrollHeight } =
        //     document.getElementsByTagName("body")[0];

        if (
            /**
             * The scrollTop property sets or returns the number of pixels an element's content is scrolled vertically.
             * The clientHeight property returns the viewable height of an element in pixels, including padding, but not the border, scrollbar or margin.
             * The scrollHeight property returns the height of an element including padding, but excluding borders, scrollbars, or margins.
             */

            scrollTop + 1.2 * clientHeight >= scrollHeight &&
            hasMore &&
            hasFetched.current
        ) {
            hasFetched.current = false;
            // setResponseReceived(false);
            console.log("---> Fetching more data");
            fetchMoreData(handleFetch);
        }
    };

    handleScrollRef.current = handleScroll;

    useEffect(() => {
        const scrollEventFunction = () => {
            console.log("Scrolling...");

            handleScrollRef.current();
        };

        const scrollRefConst = scrollRef.current;

        scrollRef.current.addEventListener("scroll", scrollEventFunction);

        return () => {
            scrollRefConst.removeEventListener("scroll", scrollEventFunction);
        };
    }, []);

    const hasScrollBar = () => {
        return (
            scrollRef?.current?.scrollHeight > scrollRef?.current?.clientHeight
        );
    };

    return (
        <div className={className}>
            {children}

            {hasMore && hasScrollBar() && (
                <div style={{ height: "80px", width: "100%" }}>
                    <Loader size={"40px"} />{" "}
                </div>
            )}
        </div>
    );
}
