export default class Brick {

    constructor(ball, gameWidth, gameHeight) {
        this.position = { x: 50, y: 20 };
        this.image = document.getElementById("brique");
        this.size = 50;
        this.tab = [1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1];
        this.tabPosition = [];
        this.count = 0;
        this.count = 0;
        this.ball = ball;
    }

    draw(ctx) {
        for (var i = 0; i < this.tab.length; i++) {

            if (this.tab[i] === 1) {
                ctx.drawImage(this.image, this.position.x * i, this.position.y, this.size, this.size);

                if (this.count < this.tab.length) {
                    this.tabPosition.push({ x: (this.position.x * i), y: this.position.y, brick: 1 });
                }
            } else {
                if (this.count < this.tab.length) {
                    this.tabPosition.push({ x: (this.position.x * i), y: this.position.y, brick: 0 });
                }
            }
            this.count += 1;
        }
    }

    update() {

        this.tabPosition.forEach((value, index) => {

            let topOfBall = this.ball.position.y;
            let topOfBrick = value.y + this.size;
            let BottomOfBrick = value.x;
            let rightSideOfBrick = (value.x + index) + this.size;
            var leftSideOfBall = this.ball.position.x;

            if (leftSideOfBall > BottomOfBrick
                && topOfBall < topOfBrick
                && leftSideOfBall < rightSideOfBrick
                && value.brick === 1) {
                this.ball.speed.y = -this.ball.speed.y
                this.tab[index] = 0;
                this.tabPosition[index]["brick"] = 0;
            }
        });
    }
}
