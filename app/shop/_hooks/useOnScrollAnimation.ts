import { useRef, useEffect, useState } from "react"

export function useOnScrollAnimation() {
    const entryRef = useRef(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            console.log(entry)
            setVisible(entry.isIntersecting)
        }, { threshold: 0.05 })
        if (entryRef.current) {
            observer.observe(entryRef.current)
        }
    }, [])
    return { entryRef, visible }
}

