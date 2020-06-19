import paddle from "./paddle"
import inputHandler from "./handle"
import ball from "./ball"
import Game from "./game";
import brick from "./brick";

    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var GAME_WIDTH = 800;
    var GAME_HEIGHT = 600;

    var paddleClass = new paddle(GAME_WIDTH, GAME_HEIGHT); 
    var handle = new inputHandler(paddleClass);
    var ballClass = new ball(paddleClass, GAME_WIDTH, GAME_HEIGHT);
    var brickClass = new brick(ballClass, GAME_WIDTH, GAME_HEIGHT);
    const objectClass = {paddle: paddleClass, handle: handle, ball: ballClass, brick: brickClass};
    var game = new Game(objectClass, ctx, GAME_WIDTH, GAME_HEIGHT);

    handle.handler();

   function gameLoop(){
        game.gameDefault();
        requestAnimationFrame(gameLoop);
    }

gameLoop();
