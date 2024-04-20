class Tween {
  constructor(options) {
    this.easing = options.easing || this.linear;
    this.duration = options.duration || 1000;
    this.onUpdate = options.onUpdate || function() {};
    this.onComplete = options.onComplete || function() {};
    this.startTime = null;
    this.requestId = null;
    this.startValue = options.startValue || 0;
    this.endValue = options.endValue || 100;
  }

  linear(t) {
    return t;
  }

  start() {
    this.startTime = performance.now();
    this.animate();
  }

  animate() {
    const currentTime = performance.now();
    const elapsedTime = currentTime - this.startTime;
    const progress = Math.min(elapsedTime / this.duration, 1);
    const easedProgress = this.easing(progress);
    const interpolatedValue = this.startValue + (this.endValue - this.startValue) * easedProgress;
    this.onUpdate(interpolatedValue);

    if (progress < 1) {
      this.requestId = requestAnimationFrame(this.animate.bind(this));
    } else {
      this.onComplete();
    }
  }

  stop() {
    cancelAnimationFrame(this.requestId);
  }
}
