// 定义方块类
class Square {
    constructor(canvas, x, y, size, color) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.targetX = x;
        this.targetY = y;
        this.speed = 2;

        // 鼠标点击事件监听器
        this.canvas.addEventListener("click", (event) => {
            this.targetX = event.clientX - this.canvas.offsetLeft;
            this.targetY = event.clientY - this.canvas.offsetTop;
        });
    }

    // 更新方块位置
    update() {
        // 计算移动方向和距离
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 如果距离大于速度，则按比例移动，否则直接移动到目标点
        if (distance > this.speed) {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        } else {
            this.x = this.targetX;
            this.y = this.targetY;
        }
    }

    // 绘制方块
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
}

// 创建方块对象并启动游戏循环
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const square = new Square(canvas, canvas.width / 2, canvas.height / 2, 50, "#FF0000");

    // 游戏循环
    function gameLoop() {
        // 清除画布
        square.ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 更新方块位置
        square.update();

        // 绘制方块
        square.draw();

        // 循环调用游戏循环函数
        requestAnimationFrame(gameLoop);
    }

    // 启动游戏循环
    gameLoop();
});
