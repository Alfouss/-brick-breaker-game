
export default class Game{
    constructor(objectClass, ctx, GAME_WIDTH, GAME_HEIGHT){
        this.objectClass = objectClass;
        console.log(this.objectClass)
        this.ctx = ctx;
        this.gameWidth = GAME_WIDTH;
        this.gameHeight = GAME_HEIGHT; 
    }

    gameDefault(){
        this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
        
    
        this.objectClass.paddle.draw(this.ctx);
        this.objectClass.ball.draw(this.ctx)
        this.objectClass.brick.draw(this.ctx)

        this.objectClass.paddle.update();
        this.objectClass.ball.update();
        this.objectClass.brick.update();
    }
}
