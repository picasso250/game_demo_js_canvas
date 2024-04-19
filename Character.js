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
        this.rotation = 0; // 添加旋转角度属性，并初始化为0
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

    // 设置旋转角度的方法
    setRotation(rotation) {
        this.rotation = rotation;
    }

    // 设置目标点的方法
    setTargetPoint(x, y) {
        this.targetX = x;
        this.targetY = y;

        // 计算目标点相对于当前位置的角度
        const dx = x - this.x;
        const dy = y - this.y;
        const angle = Math.atan2(dy, dx);

        // 设置角色朝向
        this.setRotation(angle);
    }

    draw() {
        // 保存当前绘图状态
        this.ctx.save();
        
        // 平移到角色中心点
        this.ctx.translate(this.x, this.y);
        
        // 旋转角度
        this.ctx.rotate(this.rotation);
        
        // 绘制身体（椭圆）
        this.ctx.fillStyle = this.bodyColor;
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, this.size, this.size * 1.5, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // 绘制头部（圆），圆心与身体重合
        this.ctx.fillStyle = this.headColor;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.size / 1.1, 0, Math.PI * 2);
        this.ctx.fill();

        // 绘制鼻子（小点）
        this.ctx.fillStyle = this.noseColor;
        this.ctx.beginPath();
        this.ctx.arc(this.size * 0.9, 0, this.size / 6, 0, Math.PI * 2);
        this.ctx.fill();

        // 恢复绘图状态
        this.ctx.restore();
    }
}
