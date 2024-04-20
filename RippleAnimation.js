class RippleAnimation {
  constructor(x, y, maxRadius, duration, canvas) {
    this.x = x;
    this.y = y;
    this.maxRadius = maxRadius;
    this.duration = duration;
    this.canvas = canvas;
    this.startTime = null;
    this.radius = 0;
  }

  start() {
    this.startTime = performance.now();
    this.animate();
  }

  animate() {
    const currentTime = performance.now();
    const elapsedTime = currentTime - this.startTime;
    const progress = Math.min(elapsedTime / this.duration, 1);
    this.radius = this.maxRadius * progress;
    
    // 绘制空心圆圈
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.strokeStyle = 'rgba(255, 255, 255, ' + (1 - progress) + ')';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();

    if (progress < 1) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }
}
