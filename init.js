
let character;

// 敌人数组
let enemies = [];

// 子弹数组
let bullets = [];

// 生成敌人函数
function generateEnemies(numEnemies) {
    for (let i = 0; i < numEnemies; i++) {
        const enemyX = Math.random() * canvas.width;
        const enemyY = Math.random() * canvas.height;
        const enemyRadius = 20;
        const enemyColor = "blue"; // 设置为蓝色
        const enemyRotation = Math.random() * Math.PI * 2; // 随机朝向
        const enemyOptions = {
            canvas: offscreenCanvas,
            x: enemyX,
            y: enemyY,
            size: enemyRadius,
            bodyColor: enemyColor,
            headColor: "#FFFF00",
            noseColor: "#000000",
            health: 100,
            imageName: "robot1_gun"
        };
        const enemy = new Character(enemyOptions);
        enemy.setRotation(enemyRotation); // 设置随机朝向
        enemies.push(enemy);
    }
}

function init(canvas) {

    // 创建游戏角色对象
    const characterOptions = {
        canvas: offscreenCanvas,
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: 25,
        bodyColor: "#FF0000",
        headColor: "#FFFF00",
        noseColor: "#000000",
        imageName: "manBlue_gun"
    };
    character = new Character(characterOptions);

    // 更改点击事件处理方式
    canvas.addEventListener("contextmenu", function (event) {
        event.preventDefault(); // 阻止默认右键菜单行为

        // 将点击事件位置转换为双缓冲画布坐标系中的位置
        const rect = canvas.getBoundingClientRect();
        const clickX = (event.clientX - rect.left) + camera.x;
        const clickY = (event.clientY - rect.top) + camera.y;

        // 更新方块的目标点位置为点击位置
        if (character.health > 0)
            character.setTargetPoint(clickX, clickY);
    });

    canvas.addEventListener("click", function (event) {
        // 将点击事件位置转换为双缓冲画布坐标系中的位置
        const rect = canvas.getBoundingClientRect();
        const clickX = (event.clientX - rect.left) + camera.x;
        const clickY = (event.clientY - rect.top) + camera.y;

        // 发射子弹
        if (character.health > 0)
            character.shootBullet();
    });

    // 生成10个敌人
    generateEnemies(10);

}

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