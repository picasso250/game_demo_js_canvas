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
    }
    
    update(deltaTime) {}

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
