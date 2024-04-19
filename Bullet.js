
// 定义子弹类
class Bullet {
    constructor(canvas, x, y, size, color, rotation, speed) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.rotation = rotation;
        this.speed = speed;
    }

    // 更新子弹位置
    update(deltaTime) {
        // 根据速度和角度更新子弹位置
        this.x += Math.cos(this.rotation) * this.speed * deltaTime;
        this.y += Math.sin(this.rotation) * this.speed * deltaTime;
    }

    // 绘制子弹
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }
}
