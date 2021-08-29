class Game {
    constructor() {
        console.log("New Game")
    }

    async getGameState() {
        await database.ref("gameState").on("value", function (data) {
            gameState = data.val()
            console.log("gameState", gameState)
        })
    }
    updateGameState(state) {
        database.ref("/").update({
            gameState: state
        })
    }
    getPlayerCount() {
        database.ref("playerCount").on("value", (data) => {
            playerCount = data.val();
            console.log("playerCount", playerCount)
        })
    }
    updatePlayerCount(count) {
        database.ref("/").update({
            playerCount: count
        })
    }
    start() {
        console.log("Start State")
        player = new Player();
        otherPlayer = new Player();
        form = new Form()
    }
    wait() {
        form.hideall()
        clear();
        textSize(18);
        text("Waiting for other player to join.....", width / 2 - 120, 350)
    }
    play() {
        console.log("Play State")
        background("#e4e4e4")
        form.hideall()

        shouldWait = false
        form.msg.hide()
        drawSprites()
        maze.collidePlayer()

        if (keyIsDown(UP_ARROW))
        {
            player.sprite.y -= 4;
            player.direction = "Back"
            player.sprite.changeAnimation(player.character + "MoveBack", player.character + "BackMoving")
        }
        else if (keyIsDown(DOWN_ARROW))
        {
            player.sprite.y += 4;
            player.direction = "Front"
            player.sprite.changeAnimation(player.character + "MoveFront", player.character + "FrontMoving")
        }
        else if (keyIsDown(LEFT_ARROW))
        {
            player.sprite.x -= 4;
            player.direction = "Left"
            player.sprite.changeAnimation(player.character + "MoveLeft", player.character + "LeftMoving")
        }
        else if (keyIsDown(RIGHT_ARROW))
        {
            player.sprite.x += 4;
            player.direction = "Right"
            player.sprite.changeAnimation(player.character + "MoveRight", player.character + "RightMoving")
        }
        else
        {
            player.animation = "guard" + player.direction + "Standing"
            player.sprite.changeAnimation(player.character + player.direction, player.animation)
        }
    }
}