let stones = []
let players = new Map()

class Stone {
    constructor(pos, player) {
        this.x = pos.x
        this.y = pos.y
        this.player = player
    }
    draw() {
        let px = grid.pos(this.x, this.y)
        rd.add(this.player.color, () => circle(px.px, px.py, 40))
    }
}

function createStone(pos, player) {
    if (players.has(player)) {
        if (pos.occupied) {
            console.error('Position Occupied')
        } else {
            let newStone = new Stone(pos, players.get(player));
            stones.push(newStone);
            newStone.draw();
            pos.occupied = true
        }
    } else {
        console.error('player does not exist')
    }
}

class Player {
    constructor(color) {
        this.color = color
    }
    draw() {
        rd.add(this.color, () => fill(this.color))
    }
}

function createPlayer(name, color) {
    let newPlayer = new Player(color);
    players.set(name, newPlayer);
    newPlayer.draw();
}