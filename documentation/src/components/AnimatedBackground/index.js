import React, { useRef, useEffect } from 'react';

const AnimatedBackground = ({ speed = Math.random() * 0.0010 + 0.001 }) => {
    const canvasRef = useRef(null);
    const workerRef = useRef(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            return;
        }

        if (canvasRef.current) {
            workerRef.current = new Worker(new URL('./animation.worker.js', import.meta.url));
            const offscreen = canvasRef.current.transferControlToOffscreen();
            workerRef.current.postMessage({ type: 'init', canvas: offscreen, speed }, [offscreen]);

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        workerRef.current.postMessage({ type: 'start' });
                    } else {
                        workerRef.current.postMessage({ type: 'stop' });
                    }
                },
                { threshold: 0.1 }
            );

            observer.observe(canvasRef.current);

            return () => {
                observer.disconnect();
                workerRef.current.terminate();
            };
        }
    }, [speed]);

    return (
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
    );
};

export default AnimatedBackground;
