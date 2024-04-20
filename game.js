// 创建双缓冲画布
const offscreenCanvas = document.createElement("canvas");
const offscreenCtx = offscreenCanvas.getContext("2d");

// 获取画布元素
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 设置双缓冲画布尺寸
offscreenCanvas.width = canvas.width;
offscreenCanvas.height = canvas.height;

// 定义相机对象
const camera = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
    follow: function (targetX, targetY) {
        // 设置相机位置跟随角色位置
        this.x = targetX - this.width / 2;
        this.y = targetY - this.height / 2;
    }
};

if (typeof init === 'function') {
    init(canvas, offscreenCanvas);
} else {
    console.log("init函数不存在。");
}

// 游戏循环
function gameLoop() {
    // 获取当前时间
    const currentTime = performance.now();
    const deltaTime = (currentTime - previousTime) / 1000; // 将时间差转换为秒

    // 清除双缓冲画布
    offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);

    // 更新游戏角色位置，并传递时间差
    character.update(deltaTime);

    // 跟随相机移动
    camera.follow(character.x, character.y);

    // 设置全局的转换
    offscreenCtx.save();
    offscreenCtx.translate(-camera.x, -camera.y);

    // 绘制游戏角色到双缓冲画布，并传递时间差
    character.draw(offscreenCtx, deltaTime);

    // 更新并绘制敌人
    enemies.forEach(enemy => {
        enemy.update(deltaTime);
        enemy.draw(offscreenCtx, deltaTime);

        // 碰撞检测：遍历所有子弹，检测是否与当前敌人发生碰撞
        bullets.forEach(bullet => {
            if (isCollision(enemy, bullet)) {
                // 如果敌人碰撞了子弹，则敌人的hp减少200
                enemy.health -= 200;
                // 移除子弹
                bullets = bullets.filter(b => b !== bullet);
            }
        });
    });

    // 更新并绘制子弹
    updateAndDrawBullets(deltaTime);

    // 过滤出仍存活的敌人
    enemies = enemies.filter(enemy => enemy.health > 0);

    // 还原全局转换
    offscreenCtx.restore();

    // 如果敌人数量为0，则游戏结束
    if (enemies.length === 0) {
        offscreenCtx.fillText("Win!", 10, 30);
    } else {
        // 绘制敌人数量
        offscreenCtx.fillStyle = "#000000"; // 将文字颜色改为黑色
        offscreenCtx.font = "20px Arial";
        offscreenCtx.fillText("Enemies: " + enemies.length, 10, 30);
    }

    // 将双缓冲画布内容绘制到主画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(offscreenCanvas, 0, 0);

    // 更新上一帧时间
    previousTime = currentTime;

    // 循环调用游戏循环函数
    requestAnimationFrame(gameLoop);
}

// 碰撞检测函数
function isCollision(object1, object2) {
    const dx = object1.x - object2.x;
    const dy = object1.y - object2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < object1.size + object2.size;
}

// 记录上一帧时间
let previousTime = performance.now();

// 启动游戏循环
gameLoop();
