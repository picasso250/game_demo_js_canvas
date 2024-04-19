// 定义游戏角色类
class Character {
    constructor(options) {
        this.canvas = options.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.x = options.x;
        this.y = options.y;
        this.size = options.size;
        this.bodyColor = options.bodyColor;
        this.headColor = options.headColor;
        this.noseColor = options.noseColor;
        this.targetX = options.x;
        this.targetY = options.y;
        this.speed = options.speed || 100; // 设定初始速度，默认为100
        this.rotation = 0;
        this.health = options.health || 100; // 新增的血量属性，默认为100
    }
    
    // 新增发射子弹方法
    shootBullet() {
        const bulletSize = 5;
        const bulletSpeed = 300; // 子弹速度
        const bulletColor = "#FFFF00"; // 黄色

        // 计算子弹的起始位置
        const bulletX = this.x + Math.cos(this.rotation) * this.size;
        const bulletY = this.y + Math.sin(this.rotation) * this.size;

        // 创建子弹对象
        const bullet = new Bullet(offscreenCanvas, bulletX, bulletY, bulletSize, bulletColor, this.rotation, bulletSpeed);
        bullets.push(bullet);
    }

    // 更新游戏角色位置
    update(deltaTime) {
        // 计算移动方向和距离
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 计算移动步长
        const step = Math.min(distance, this.speed * deltaTime);

        // 如果距离大于步长，则按比例移动，否则直接移动到目标点
        if (distance > step) {
            this.x += (dx / distance) * step;
            this.y += (dy / distance) * step;
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

    draw(deltaTime) {
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
