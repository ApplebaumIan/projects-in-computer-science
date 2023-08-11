import React, { useRef, useEffect } from 'react';

const AnimatedBackground = (props) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const waves = [];
        const numWaves = 1;

        class Wave {
            constructor() {
                this.amplitude = Math.random() * 5 + 25;
                this.frequency = Math.random() * 0.02 + 0.01;
                this.speed = props.speed;// Slowed down the speed
                this.phase = Math.random() * Math.PI * 2;
                this.alpha = Math.random() * 0.3 + 0.1;
            }

            draw() {
                ctx.beginPath();
                for (let x = 0; x < canvas.width; x++) {
                    const y = this.amplitude * Math.sin((x * this.frequency) + this.phase);
                    ctx.lineTo(x, y + canvas.height / 2);
                }
                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();

                ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
                ctx.lineWidth = 2;
                ctx.stroke();

                // Fill the area under the wave with white translucent color
                ctx.fillStyle = `rgba(255, 255, 255, 0.2)`;
                ctx.fill();
            }

            update() {
                this.phase += this.speed;
            }
        }

        for (let i = 0; i < numWaves; i++) {
            waves.push(new Wave());
        }

        const animate = () => {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            waves.forEach(wave => {
                wave.update();
                wave.draw();
            });
        };

        animate();

    }, []);

    return (
        <canvas ref={canvasRef} style={{ zIndex: -1, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
    );
};
export default AnimatedBackground;

AnimatedBackground.defaultProps = {
    speed: Math.random() * 0.002 + 0.001
}
