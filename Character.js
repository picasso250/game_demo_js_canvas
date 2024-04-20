// 定义游戏角色类
class Character {
    constructor(options) {
        this.canvas = options.canvas;
        this.ctx = this.canvas.getContext("2d");
        this.x = options.x;
        this.y = options.y;
        this.size = options.size;
        this.speed = options.speed || 100; // 设定初始速度，默认为100
        this.rotation = 0;
        this.health = options.health || 100; // 新增的血量属性，默认为100
        this.imageName = options.imageName; // 新增的图像名称属性
        this.verticalDirection = "none"; // 垂直方向的移动
        this.horizontalDirection = "none"; // 水平方向的移动
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
        // 计算标准化移动向量
        const moveVector = { x: 0, y: 0 };

        if (this.verticalDirection === "up") {
            moveVector.y -= 1;
        } else if (this.verticalDirection === "down") {
            moveVector.y += 1;
        }

        if (this.horizontalDirection === "left") {
            moveVector.x -= 1;
        } else if (this.horizontalDirection === "right") {
            moveVector.x += 1;
        }

        // 标准化向量
        const length = Math.sqrt(moveVector.x * moveVector.x + moveVector.y * moveVector.y);
        if (length !== 0) {
            moveVector.x /= length;
            moveVector.y /= length;
        }

        // 根据标准化向量和速度更新位置
        this.x += moveVector.x * this.speed * deltaTime;
        this.y += moveVector.y * this.speed * deltaTime;
    }

    // 设置旋转角度的方法
    setRotation(rotation) {
        this.rotation = rotation;
    }

    draw() {
        // 保存当前绘图状态
        this.ctx.save();

        // 平移到角色中心点
        this.ctx.translate(this.x, this.y);

        // 旋转角度
        this.ctx.rotate(this.rotation);

        // 获取人物图像
        const image = imageLoader.getImage(this.imageName);

        // 绘制图像
        this.ctx.drawImage(image, -image.width / 2, -image.height / 2);

        // 恢复绘图状态
        this.ctx.restore();
    }
}
