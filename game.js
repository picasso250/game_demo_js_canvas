// 定义游戏角色类
class Character {
    constructor(canvas, x, y, size, bodyColor, headColor, noseColor) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.x = x;
        this.y = y;
        this.size = size;
        this.bodyColor = bodyColor;
        this.headColor = headColor;
        this.noseColor = noseColor;
        this.targetX = x;
        this.targetY = y;
        this.speed = 2;

        // 鼠标点击事件监听器
        this.canvas.addEventListener("click", (event) => {
            this.targetX = event.clientX - this.canvas.offsetLeft;
            this.targetY = event.clientY - this.canvas.offsetTop;
        });
    }

    // 更新游戏角色位置
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

    draw() {
        // 绘制身体（椭圆）
        this.ctx.fillStyle = this.bodyColor;
        this.ctx.beginPath();
        this.ctx.ellipse(this.x, this.y, this.size, this.size * 1.5, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // 绘制头部（圆），圆心与身体重合
        this.ctx.fillStyle = this.headColor;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size / 1.1, 0, Math.PI * 2);
        this.ctx.fill();

        // 绘制鼻子（小点）
        this.ctx.fillStyle = this.noseColor;
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.size*0.9, this.y, this.size / 6, 0, Math.PI * 2);
        this.ctx.fill();
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

// 创建游戏角色对象
const character = new Character(offscreenCanvas, canvas.width / 2, canvas.height / 2, 25, "#FF0000", "#FFFF00", "#000000");

// 处理点击事件
canvas.addEventListener("click", function (event) {
    // 将点击事件位置转换为双缓冲画布坐标系中的位置
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // 更新方块的目标点位置为点击位置
    character.targetX = clickX;
    character.targetY = clickY;
});

// 游戏循环
function gameLoop() {
    // 清除双缓冲画布
    offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

    // 更新游戏角色位置
    character.update();

    // 绘制游戏角色到双缓冲画布
    character.draw();

    // 将双缓冲画布内容绘制到主画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(offscreenCanvas, 0, 0);

    // 循环调用游戏循环函数
    requestAnimationFrame(gameLoop);
}

// 启动游戏循环
gameLoop();
