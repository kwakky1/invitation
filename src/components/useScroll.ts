import {useEffect, useState} from "react";

export const useScroll = () => {
    const [scrollY, setScrollY] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let mounted = true;
        window.addEventListener("scroll", () => {
            if (mounted && loading) {
                setScrollY(window.pageYOffset);
                setLoading(false);
            }
        });
        return () => {
            mounted = false
        }
    }, [])

    return {
        scrollY
    };
}
