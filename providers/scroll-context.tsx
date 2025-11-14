"use client"

import Lenis from "lenis";
import { useEffect, useState, createContext, useContext, useRef, ReactNode } from "react";

const SmoothScrollerContext = createContext<Lenis | null>(null);

export const useSmoothScroller = () => useContext(SmoothScrollerContext);

export default function ScrollContext({ children }: { children: ReactNode }) {
    const [lenisRef, setLenis] = useState<Lenis | null>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const scroller = new Lenis();

        function raf(time: number) {
            scroller.raf(time);
            rafRef.current = requestAnimationFrame(raf);
        }
        rafRef.current = requestAnimationFrame(raf);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLenis(scroller);

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            if (scroller) {
                scroller.destroy();
            }
        }
    }, []);

    return (
        <SmoothScrollerContext.Provider value={lenisRef}>
            {children}
        </SmoothScrollerContext.Provider>
    )
}

