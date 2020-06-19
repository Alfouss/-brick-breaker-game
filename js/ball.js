import game from "./game";

export default class Ball{
    constructor(paddleClass, gameWidth, gameHeight){
        this.image = document.getElementById("redball");
        this.position = { x:gameWidth - (gameWidth / 2), y:gameHeight - 16};
        this.speed = { x:4, y:4};
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.size = 16;
        this.paddle = paddleClass;
        this.ctx;
        this.game = new game
    }
    

    draw(ctx){
        this.ctx = ctx;
        ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }

     update(){
        this.position.x -= this.speed.x;
        this.position.y -= this.speed.y;

        if(this.position.x + this.size > this.gameWidth || this.position.x < 0){
            this.speed.x = -this.speed.x;
        }
        if(this.position.y + this.size > this.gameHeight || this.position.y < 0){
            this.speed.y = -this.speed.y;
        }

        let bottomOfBall = this.position.y + this.size;
        let topOfPaddle = this.paddle.position.y;
        let leftSideOfPaddle = this.paddle.position.x;
        let rightSideOfPaddle = this.paddle.position.x + this.paddle.width;
        
        if(bottomOfBall >= topOfPaddle
            && this.position.x <= leftSideOfPaddle
            || this.position.x + this.paddle.width >= rightSideOfPaddle
            && this.position.y + this.size > this.gameHeight){
                document.location.reload(true);
        }

        if(bottomOfBall >= topOfPaddle
            && this.position.x >= leftSideOfPaddle
            && this.position.x + this.size <= rightSideOfPaddle
            ){
            this.speed.y = -this.speed.y
            this.position.y = this.paddle.position.y - this.size;
        }
    }
}