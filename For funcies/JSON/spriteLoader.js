class SpriteSet {
    constructor() {
        this.sprites = {}
    }
    loadSprites(path) {
        const jsonPromise = new Promise((resolve, reject) => {
            loadJSON(path, data => {
                resolve(data)
            }, error => { reject(error) })
        });
        jsonPromise.then(data => {
            for (const key in data) {
                const sprite = data[key];
                this.sprites[key] = {};
                for (const id in sprite) {
                    const element = sprite[id];
                    if (id == "path") {
                        this.sprites[key].sprite = loadImage(sprite.path)
                    } else {
                        this.sprites[key][id] = element
                    }
                }
            }
        }, error => { console.error(error) })
    }
    getSprite(id) {
        if (this.sprites[id]) {
            return this.sprites[id].sprite;
        } else {
            console.error('Sprite does not exist')
        }
    }
}

function createSpriteSet(path) {
    let temp = new SpriteSet()
    temp.loadSprites(path)
    return temp;
}