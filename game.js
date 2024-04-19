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

// 创建双缓冲画布
const offscreenCanvas = document.createElement("canvas");
const offscreenCtx = offscreenCanvas.getContext("2d");

// 获取画布元素
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 设置双缓冲画布尺寸
offscreenCanvas.width = canvas.width;
offscreenCanvas.height = canvas.height;

// 创建方块对象
const square = new Square(offscreenCanvas, canvas.width / 2, canvas.height / 2, 50, "#FF0000");

// 处理点击事件
canvas.addEventListener("click", function(event) {
    // 将点击事件位置转换为双缓冲画布坐标系中的位置
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // 更新方块的目标点位置为点击位置
    square.targetX = clickX;
    square.targetY = clickY;
});

// 游戏循环
function gameLoop() {
    // 清除双缓冲画布
    offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

    // 更新方块位置
    square.update();

    // 绘制方块到双缓冲画布
    square.draw();

    // 将双缓冲画布内容绘制到主画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(offscreenCanvas, 0, 0);

    // 循环调用游戏循环函数
    requestAnimationFrame(gameLoop);
}

// 启动游戏循环
gameLoop();
