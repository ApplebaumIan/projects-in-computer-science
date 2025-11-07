// /Users/ianapplebaum/Documents/projects-in-computer-science/documentation/src/components/AnimatedBackground/animation.worker.js
let paper;
let waves = [];
let canvas = null;

const init = async (offscreenCanvas, speed) => {
    canvas = offscreenCanvas;
    paper = await import('paper');
    const { Color, Point, Path, view } = paper;
    paper.setup(canvas);

    class Wave {
        constructor() {
            this.path = new Path();
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
            for (let x = 0; x < view.size.width; x++) {
                const y = this.amplitude * Math.sin((x * this.frequency) + this.phase);
                this.path.add(new Point(x, y + view.size.height / 2));
            }
            this.path.add(new Point(view.size.width, view.size.height));
            this.path.add(new Point(0, view.size.height));
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

    paper.view.onFrame = () => {
        waves.forEach(wave => wave.update());
    };
};

self.onmessage = (e) => {
    const { type, canvas, speed } = e.data;
    if (type === 'init') {
        init(canvas, speed).then(() => {
            self.postMessage({ type: 'ready' });
        });
    } else if (type === 'start') {
        if (paper && paper.view) {
            paper.view.play();
        }
    } else if (type === 'stop') {
        if (paper && paper.view) {
            paper.view.pause();
        }
    }
};

