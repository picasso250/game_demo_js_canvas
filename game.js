
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

// 更改点击事件处理方式
canvas.addEventListener("contextmenu", function (event) {
    event.preventDefault(); // 阻止默认右键菜单行为

    // 将点击事件位置转换为双缓冲画布坐标系中的位置
    const rect = canvas.getBoundingClientRect();
    const clickX = (event.clientX - rect.left) + camera.x;
    const clickY = (event.clientY - rect.top) + camera.y;

    // 更新方块的目标点位置为点击位置
    character.setTargetPoint(clickX, clickY);
});

canvas.addEventListener("click", function (event) {
    // 将点击事件位置转换为双缓冲画布坐标系中的位置
    const rect = canvas.getBoundingClientRect();
    const clickX = (event.clientX - rect.left) + camera.x;
    const clickY = (event.clientY - rect.top) + camera.y;

    // 发射子弹
    character.shootBullet();
});

// 敌人数组
const enemies = [];

// 生成敌人函数
function generateEnemies(numEnemies) {
    for (let i = 0; i < numEnemies; i++) {
        const enemyX = Math.random() * canvas.width;
        const enemyY = Math.random() * canvas.height;
        const enemyRadius = 20;
        const enemyColor = "blue"; // 设置为蓝色
        const enemyRotation = Math.random() * Math.PI * 2; // 随机朝向
        const enemy = new Character(offscreenCanvas, enemyX, enemyY, enemyRadius, enemyColor, "#FFFF00", "#000000");
        enemy.setRotation(enemyRotation); // 设置随机朝向
        enemies.push(enemy);
    }
}

// 生成10个敌人
generateEnemies(10);

// 子弹数组
var bullets = [];

// 更新并绘制子弹
function updateAndDrawBullets(deltaTime) {
    bullets.forEach(bullet => {
        bullet.update(deltaTime);

        // 将子弹位置转换为相机坐标系中的位置
        const bulletX = bullet.x - camera.x;
        const bulletY = bullet.y - camera.y;

        // 绘制子弹，确保仍在视口内
        if (bulletX >= 0 && bulletX <= canvas.width && bulletY >= 0 && bulletY <= canvas.height) {
            bullet.draw();
        }
    });

    // 过滤出仍在视口内的子弹
    bullets = bullets.filter(bullet => {
        const bulletX = bullet.x - camera.x;
        const bulletY = bullet.y - camera.y;
        return bulletX >= 0 && bulletX <= canvas.width && bulletY >= 0 && bulletY <= canvas.height;
    });
}

// 定义相机对象
const camera = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
    follow: function(targetX, targetY) {
        // 设置相机位置跟随角色位置
        this.x = targetX - this.width / 2;
        this.y = targetY - this.height / 2;
    }
};

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
    });

    // 更新并绘制子弹
    updateAndDrawBullets(deltaTime);

    // 还原全局转换
    offscreenCtx.restore();

    // 将双缓冲画布内容绘制到主画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(offscreenCanvas, 0, 0);

    // 更新上一帧时间
    previousTime = currentTime;

    // 循环调用游戏循环函数
    requestAnimationFrame(gameLoop);
}

// 记录上一帧时间
let previousTime = performance.now();

// 启动游戏循环
gameLoop();
