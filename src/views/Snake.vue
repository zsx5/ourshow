<template>
    <div class="ballview">
        <canvas class="ballcavas"></canvas>
        <div class="desc">
            <h2>贪吃蛇</h2>
            <div>使用方向键控制小蛇上、下、左、右移动</div>
            <div>
                当小蛇吃掉小球时，小蛇变长
            </div>
            <div>
                当小蛇的头撞到自己的身体或撞到墙时，游戏结束
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'Ball',
    mounted(){
        
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        const count = document.querySelector('.count');


        const width = canvas.width = window.innerWidth;
        const height = canvas.height = window.innerHeight * 0.6;

        var foodSize = 20;
        var snakeWidth = 20;
        var snake = new Snake();
        var food = new Rect(position(), position(), foodSize, foodSize, 'red');


        function random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
        }

        function randomColor() {
        return 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
        }

        function position() {
        return Math.floor(Math.random() * 10) * foodSize;
        }

        function Rect(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
        }

        Rect.prototype.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.fill();
        ctx.closePath();
        }

        function Snake() {
        var snakeArray = []; //整蛇数组

        for(var i = 0; i< 4; i++){
            var rect = new Rect(i * snakeWidth, 0, snakeWidth, snakeWidth, 'white');
            snakeArray.splice(0, 0, rect);
        }

        var head = snakeArray[0];
        head.color = 'red';

        this.head = snakeArray[0];
        this.snakeArray = snakeArray;

        this.direction = 39;
        }

        function eatDetect() {
        if (snake.head.x === food.x && snake.head.y === food.y) {
            return true;
        } else {
            return false;
        }
        }

        Snake.prototype.draw = function () {
        for(var i = 0; i < this.snakeArray.length; i++){
            this.snakeArray[i].draw();
        }
        }

        Snake.prototype.move = function () {  
        var rect = new Rect(this.head.x, this.head.y, this.head.w, this.head.h, 'white');
        this.snakeArray.splice(1, 0, rect);

        if (eatDetect() === true){
            food = new Rect(position(), position(), foodSize, foodSize, 'red');
        }else{
            this.snakeArray.pop();
        }

        switch (this.direction) {
            case 37:
            this.head.x -= this.head.w;
            break;
            case 38:
            this.head.y -= this.head.h;
            break;
            case 39:
            this.head.x += this.head.w;
            break;
            case 40:
            this.head.y += this.head.h;
            break;
            default:
            break;
        }

        //撞墙判定
        if(this.head.x > width || this.head.y > height || this.head.x < 0 || this.head.y < 0){
            clearInterval(timer);
        }

        //撞自己判断
        for(var i = 1; i < this.snakeArray.length; i++){
            if (this.snakeArray[i].x === this.head.x && this.snakeArray[i].y == this.head.y){
            clearInterval(timer);
            }
        }
}

var timer = setInterval(() => {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, width, height);
  food.draw();
  snake.move();
  snake.draw();
}, 100);

document.onkeydown = function (e) {  
  var ev = e || window.event;
  switch (ev.keyCode) {
    case 37:
      if(snake.direction != 39){
        snake.direction = 37;
      }
      break;
    case 38:
      if (snake.direction != 40) {
        snake.direction = 38;
      }
    break;
    case 39:
      if (snake.direction != 37) {
        snake.direction = 39;
      }
    break;
    case 40:
      if (snake.direction != 38) {
        snake.direction = 40;
      }
    break;
    default:
      break;
  }
}


}
}
</script>
<style scoped>
.ballview {
    overflow: hidden;
}
.count {
    position: absolute;
    margin: 0;
    top: 50px;
    left: 15px;
    color: #aaa;
}
.ballcavas {
    position: relative;
    margin-top: 0;
}
.desc {
    text-align: center;
}
</style>