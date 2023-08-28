import React, { useRef, useEffect } from 'react';
import paper, { Color } from 'paper';

const AnimatedBackground = ({ speed = Math.random() * 0.0010 + 0.001 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Check if Reduce Motion is enabled
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            return;
        }

        paper.setup(canvasRef.current);
        const waves = [];

        class Wave {
            constructor() {
                this.path = new paper.Path();
                this.path.strokeColor = new Color(1, 1, 1, Math.random() * 0.4 + 0.1);
                this.path.fillColor = new Color(1, 1, 1, 0.2);
                this.initialAmplitude = Math.random() * 25 + 100;
                this.initialFrequency = Math.random() * 0.006 + 0.0019;
                this.speed = speed;
                this.phase = Math.random() * Math.PI * 2;
                this.blur = Math.random() * 50;
                this.time = 0;
                this.path.shadowColor = Math.floor(Math.random() * 2) ? 'red' : 'pink';
                this.path.shadowBlur = this.blur;
            }

            draw() {
                this.path.removeSegments();
                for (let x = 0; x < paper.view.size.width; x++) {
                    const y = this.amplitude * Math.sin((x * this.frequency) + this.phase);
                    this.path.add(new paper.Point(x, y + paper.view.size.height / 2));
                }
                this.path.add(new paper.Point(paper.view.size.width, paper.view.size.height));
                this.path.add(new paper.Point(0, paper.view.size.height));
                this.path.closed = true;
            }

            update() {
                this.time += this.speed;
                this.amplitude = this.initialAmplitude + 50 * Math.sin(this.time);
                this.frequency = this.initialFrequency + 0.0005 * Math.sin(this.time);
                this.phase += this.speed;
                this.draw();
            }
        }

        for (let i = 0; i < 4; i++) {
            waves.push(new Wave());
        }

        const handleFrame = (event) => {
            if (document.hidden || !canvasRef.current.getBoundingClientRect().top > window.innerHeight) {
                return;
            }
            waves.forEach(wave => {
                wave.update();
            });
        };

        paper.view.onFrame = handleFrame;

        return () => {
            paper.view.onFrame = null; // Cleanup onFrame when component unmounts
        };
    }, [speed]);

    return (
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} resize="true" />
    );
};

export default AnimatedBackground;
