(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _game = _interopRequireDefault(require("./game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ball =
/*#__PURE__*/
function () {
  function Ball(paddleClass, gameWidth, gameHeight) {
    _classCallCheck(this, Ball);

    this.image = document.getElementById("redball");
    this.position = {
      x: gameWidth - gameWidth / 2,
      y: gameHeight - 16
    };
    this.speed = {
      x: 4,
      y: 4
    };
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.size = 16;
    this.paddle = paddleClass;
    this.ctx;
    this.game = new _game["default"]();
  }

  _createClass(Ball, [{
    key: "draw",
    value: function draw(ctx) {
      this.ctx = ctx;
      ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
    }
  }, {
    key: "update",
    value: function update() {
      this.position.x -= this.speed.x;
      this.position.y -= this.speed.y;

      if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
        this.speed.x = -this.speed.x;
      }

      if (this.position.y + this.size > this.gameHeight || this.position.y < 0) {
        this.speed.y = -this.speed.y;
      }

      var bottomOfBall = this.position.y + this.size;
      var topOfPaddle = this.paddle.position.y;
      var leftSideOfPaddle = this.paddle.position.x;
      var rightSideOfPaddle = this.paddle.position.x + this.paddle.width;

      if (bottomOfBall >= topOfPaddle && this.position.x <= leftSideOfPaddle || this.position.x + this.paddle.width >= rightSideOfPaddle && this.position.y + this.size > this.gameHeight) {
        document.location.reload(true);
      }

      if (bottomOfBall >= topOfPaddle && this.position.x >= leftSideOfPaddle && this.position.x + this.size <= rightSideOfPaddle) {
        this.speed.y = -this.speed.y;
        this.position.y = this.paddle.position.y - this.size;
      }
    }
  }]);

  return Ball;
}();

exports["default"] = Ball;

},{"./game":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Brick =
/*#__PURE__*/
function () {
  function Brick(ball, gameWidth, gameHeight) {
    _classCallCheck(this, Brick);

    this.position = {
      x: 50,
      y: 20
    };
    this.image = document.getElementById("brique");
    this.size = 50;
    this.tab = [1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1];
    this.tabPosition = [];
    this.count = 0;
    this.count = 0;
    this.ball = ball;
  }

  _createClass(Brick, [{
    key: "draw",
    value: function draw(ctx) {
      for (var i = 0; i < this.tab.length; i++) {
        if (this.tab[i] === 1) {
          ctx.drawImage(this.image, this.position.x * i, this.position.y, this.size, this.size);

          if (this.count < this.tab.length) {
            this.tabPosition.push({
              x: this.position.x * i,
              y: this.position.y,
              brick: 1
            });
          }
        } else {
          if (this.count < this.tab.length) {
            this.tabPosition.push({
              x: this.position.x * i,
              y: this.position.y,
              brick: 0
            });
          }
        }

        this.count += 1;
      }
    }
  }, {
    key: "update",
    value: function update() {
      var _this = this;

      this.tabPosition.forEach(function (value, index) {
        var topOfBall = _this.ball.position.y;
        var topOfBrick = value.y + _this.size;
        var BottomOfBrick = value.x;
        var rightSideOfBrick = value.x + index + _this.size;
        var leftSideOfBall = _this.ball.position.x;

        if (leftSideOfBall > BottomOfBrick && topOfBall < topOfBrick && leftSideOfBall < rightSideOfBrick && value.brick === 1) {
          _this.ball.speed.y = -_this.ball.speed.y;
          _this.tab[index] = 0;
          _this.tabPosition[index]["brick"] = 0;
        }
      });
    }
  }]);

  return Brick;
}();

exports["default"] = Brick;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game =
/*#__PURE__*/
function () {
  function Game(objectClass, ctx, GAME_WIDTH, GAME_HEIGHT) {
    _classCallCheck(this, Game);

    this.objectClass = objectClass;
    console.log(this.objectClass);
    this.ctx = ctx;
    this.gameWidth = GAME_WIDTH;
    this.gameHeight = GAME_HEIGHT;
  }

  _createClass(Game, [{
    key: "gameDefault",
    value: function gameDefault() {
      this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
      this.objectClass.paddle.draw(this.ctx);
      this.objectClass.ball.draw(this.ctx);
      this.objectClass.brick.draw(this.ctx);
      this.objectClass.paddle.update();
      this.objectClass.ball.update();
      this.objectClass.brick.update();
    }
  }]);

  return Game;
}();

exports["default"] = Game;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InputHandler =
/*#__PURE__*/
function () {
  function InputHandler(Paddle) {
    _classCallCheck(this, InputHandler);

    this.paddle = Paddle;
  }

  _createClass(InputHandler, [{
    key: "handler",
    value: function handler() {
      var _this = this;

      document.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
          case 37:
            _this.paddle.moveLeft();

            break;

          case 39:
            _this.paddle.moveRight();

            break;
        }
      });
      document.addEventListener("keyup", function (e) {
        switch (e.keyCode) {
          case 37:
            _this.paddle.stop();

            break;

          case 39:
            _this.paddle.stop();

            break;
        }
      });
    }
  }]);

  return InputHandler;
}();

exports["default"] = InputHandler;

},{}],5:[function(require,module,exports){
"use strict";

var _paddle = _interopRequireDefault(require("./paddle"));

var _handle = _interopRequireDefault(require("./handle"));

var _ball = _interopRequireDefault(require("./ball"));

var _game = _interopRequireDefault(require("./game"));

var _brick = _interopRequireDefault(require("./brick"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var paddleClass = new _paddle["default"](GAME_WIDTH, GAME_HEIGHT);
var handle = new _handle["default"](paddleClass);
var ballClass = new _ball["default"](paddleClass, GAME_WIDTH, GAME_HEIGHT);
var brickClass = new _brick["default"](ballClass, GAME_WIDTH, GAME_HEIGHT);
var objectClass = {
  paddle: paddleClass,
  handle: handle,
  ball: ballClass,
  brick: brickClass
};
var game = new _game["default"](objectClass, ctx, GAME_WIDTH, GAME_HEIGHT);
handle.handler();

function gameLoop() {
  game.gameDefault();
  requestAnimationFrame(gameLoop);
}

gameLoop();

},{"./ball":1,"./brick":2,"./game":3,"./handle":4,"./paddle":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Paddle =
/*#__PURE__*/
function () {
  function Paddle(gameWidth, gameHeight) {
    _classCallCheck(this, Paddle);

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 150;
    this.height = 20;
    this.speed = 0;
    this.maxSpeed = 10;
    this.position = {
      x: gameWidth / 2 - this.width / 2,
      y: gameHeight - this.height - 10
    };
  }

  _createClass(Paddle, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = "#0ff";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }, {
    key: "update",
    value: function update() {
      this.position.x += this.speed;
      if (this.position.x < 0) this.position.x = 0;
      if (this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      this.speed = -this.maxSpeed;
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.speed = this.maxSpeed;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.speed = 0;
    }
  }]);

  return Paddle;
}();

exports["default"] = Paddle;

},{}]},{},[5]);
