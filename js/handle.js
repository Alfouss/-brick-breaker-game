export default class InputHandler {
    constructor(Paddle){
        this.paddle = Paddle;
    }

    handler(){
            document.addEventListener("keydown", e =>{
                switch(e.keyCode){
                    case 37 :
                        this.paddle.moveLeft()
                        break;
                    case 39 :
                        this.paddle.moveRight()
                        break
                }
            });
        
            document.addEventListener("keyup", e =>{
                switch(e.keyCode){
                    case 37 :
                        this.paddle.stop()
                        break;
                    case 39 :
                        this.paddle.stop()
                        break
                }
            });
    }
}