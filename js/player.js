class Player {
    constructor() {

        this.name = null;
        this.character = null;
        this.index = null
        this.sprite = createSprite(50, 50, 10, 10)
        this.direction = "Front";
        this.animation = null
        console.log("Player Created")
    }
    updatePosition(x, y) {
        var playerRef = "players/player" + this.index + "/position";
        database.ref(playerRef).set({
            'x': this.sprite.x + x,
            'y': this.sprite.y + y
        })

    }
    getPosition() {
        var playerRef = "players/player" + this.index + "/position";
        database.ref(playerRef).on("value", (data) => {
            position = data.val();
            this.sprite.x = position.x;
            this.sprite.y = position.y;
        });
    }

    updatePlayer() {
        var playerRef = "players/player" + this.index;
        database.ref(playerRef).update({
            name: this.name,
            character: this.character,
            position: {
                x: 0,
                y: 0
            }
        });
    }
}