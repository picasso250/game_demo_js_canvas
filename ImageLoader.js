class ImageLoader {
    constructor() {
        this.images = {};
        this.loadedCount = 0;
        this.totalImages = 0;
        this.onload = null;
    }

    // 添加图片URL到加载队列
    addImage(name, url) {
        this.totalImages++;
        const img = new Image();
        img.onload = () => {
            this.loadedCount++;
            if (this.loadedCount === this.totalImages && this.onload) {
                this.onload();
            }
        };
        img.src = url;
        this.images[name] = img;
    }

    // 根据名称获取图片
    getImage(name) {
        return this.images[name];
    }

    // 设置加载完成后的回调函数
    setOnload(callback) {
        this.onload = callback;
    }
}

