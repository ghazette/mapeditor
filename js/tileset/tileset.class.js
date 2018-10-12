class Tileset {
    constructor (url, canvas)
    {
        this.img = 0
        this.cWidth = canvas.width
        this.cHeight = canvas.height
        this.loadTileset(url)
        .then((res) => {
            this.img = res.img
            this.width = res.width
            this.height = res.height
        })
        .catch((err) => {
            console.log(err)
        })
        this.offsetX = 0
        this.offsetY = 0
    }

    loadTileset(url) {
        return new Promise((resolve, reject) => {
            let img = new Image()
            img.onload = function () {
                resolve({img: this, width: this.width, height: this.height})
            }
            img.onerror = function () {
                reject(url)
            }
            img.src = url + "?" + new Date().getTime()
        })
    }

    moveX(value) {
        if (this.width > this.cWidth) {
            this.offsetX += value
            if (this.offsetX > 0)
                this.offsetX = 0
                if (this.offsetX + this.width - this.cWidth < 0)
                this.offsetX = -this.width + this.cWidth
        }
    }

    moveY(value) {
        if (this.height > this.cHeight) {
            this.offsetY += value
            if (this.offsetY > 0)
                this.offsetY = 0
            if (this.offsetY + this.height - this.cHeight < 0)
                this.offsetY = -this.height + this.cHeight
        }
    }

    render(ctx) {
        if (this.img !== 0)
            ctx.drawImage(this.img, this.offsetX, this.offsetY)
    }

    getWidth() {
        return this.width
    }

    getHeight() {
        return this.height
    }

    getImage() {
        return this.img
    }
}

module.exports = Tileset