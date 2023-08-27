import { useRef, useEffect, useState } from "react"
/*
export function useOnScrollAnimation() {
    const entryRef = useRef(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            console.log(entry)
            setVisible(entry.isIntersecting)
        })
        if (entryRef.current) {
            observer.observe(entryRef.current)
        }
    }, [])
    return { entryRef, visible }
}
*/

function isElementPartiallyVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.visualViewport?.width || window.screen.width) &&
        rect.top < (window.visualViewport?.height || window.screen.height)
    );
}
export function useOnScrollAnimation() {
    const [visible, setVisible] = useState(false);
    const entryRef = useRef(null);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let rafId;
        function handleScroll() {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }

            rafId = requestAnimationFrame(() => {
                const observedElement = entryRef.current;
                if (observedElement && isElementPartiallyVisible(observedElement)) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            });
        }
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);
    return { entryRef, visible }
}
