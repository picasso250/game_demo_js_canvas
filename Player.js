// 定义玩家类
class Player extends Character {
    constructor(options) {
        super(options); // 调用父类的构造函数
        this.score = 0; // 玩家得分，默认为0
        this.verticalDirection = "none"; // 垂直方向的移动
        this.horizontalDirection = "none"; // 水平方向的移动
        this.bulletCooldown = 0; // 子弹冷却时间
        this.bulletCooldownTime = 0.5; // 子弹冷却时间间隔（单位：秒）
    }

    // 新增方法用于检查是否可以发射子弹
    canShootBullet() {
        return this.bulletCooldown <= 0;
    }

    // 在shootBullet方法中添加子弹冷却逻辑
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

        // 重置子弹冷却时间
        this.bulletCooldown = this.bulletCooldownTime;
    }

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

        // 更新子弹冷却时间
        this.bulletCooldown -= deltaTime;
        if (this.canShootBullet()) {
            this.shootBullet();
        }
    }

    // 更新玩家得分
    updateScore(points) {
        this.score += points;
    }
}
