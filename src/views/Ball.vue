<template>
    <div class="ballview">
        <p class="count"></p>
        <canvas class="ballcavas"></canvas>
        <div class="balltext">
            <h2>弹跳吧！五彩球</h2>
            <div>使用w, s, a, d 键控制白色恶魔圈上、下、左、右移动</div>
            <div>
                当白色恶魔圈和小球相撞时，小球被吃掉
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

        function random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
        }

        function randomColor() {
        return 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
        }

        function Shape(x, y, vx, vy, exist) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.exist = exist;
        }

        function EvilCircle(x, y, exist) {
        Shape.call(this, x, y, 20, 20, exist);
        this.color = 'white';
        this.size = 10;
        }
        EvilCircle.prototype = Object.create(Shape.prototype);
        EvilCircle.prototype.constructor = EvilCircle;

        EvilCircle.prototype.draw = function () {  
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        ctx.lineWidth = 3;
        ctx.stroke();
        }

        EvilCircle.prototype.checkBounds = function () {
        if ((this.x + this.size) >= width) {
            this.x -= (this.size);
        }

        if ((this.y + this.size) >= height) {
            this.y -= (this.size);
        }

        if ((this.x - this.size) <= 0) {
            this.x += (this.size);
        }

        if ((this.y - this.size) <= 0) {
            this.y += (this.size);
        }
        }

        EvilCircle.prototype.setControls = function () {
        window.onkeydown = e => {
            if(e.key === 'a'){
            this.x -= this.vx;
            }else if(e.key === 'w'){
            this.y -= this.vy;
            }else if(e.key === 'd'){
            this.x += this.vx;
            }else if(e.key === 's'){
            this.y += this.vy;
            }
        }
        }

        EvilCircle.prototype.collisionDetect = function (){
        for(var i=0; i < balls.length; i++){
            if(balls[i].exist === true){
            var dx = balls[i].x - this.x;
            var dy = balls[i].y - this.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if(distance < this.size + balls[i].size){
                balls[i].exist = false;
                ballNum--;
            }
            }
        }
        }


        function Ball(x, y, vx, vy, exist, color, size) {
        Shape.call(this, x, y, vx, vy, exist);
        this.color = color;
        this.size = size;
        }

        Ball.prototype = Object.create(Shape.prototype);
        Ball.prototype.constructor = Ball;


        Ball.prototype.draw = function () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        ctx.fill();
        }

        Ball.prototype.update = function () {
        if ((this.x + this.size) >= width) {
            this.vx = -(this.vx);
        }

        if ((this.y + this.size) >= height) {
            this.vy = -(this.vy);
        }

        if ((this.x - this.size) <= 0) {
            this.vx = -(this.vx);
        }

        if ((this.y - this.size) <= 0) {
            this.vy = -(this.vy);
        }

        this.x += this.vx;
        this.y += this.vy;
        }

        Ball.prototype.collisionDetect = function () {  
        for (var i = 0; i < balls.length; i++) {
            if (!(balls[i] === this)) {
            var dx = balls[i].x - this.x;
            var dy = balls[i].y - this.y;
            var distance = Math.sqrt(dx * dx, dy * dy);

            if (distance < this.size + balls[i].size) {
                balls[i].color = this.color = randomColor();
            }
            }
        }
        }

        var testBall = new Ball(50, 100, 4, 4, true, 'blue', 10);
        var evilCircle = new EvilCircle(width/2, height/2, true);
        var balls = [];
        var ballNum = 0;



        function loop() {
        ctx.fillStyle = 'rgb(0, 0, 0, 0.25)';
        ctx.fillRect(0, 0, width, height);
        var num = 0;
        for (num = 0; balls.length < 25; num++) {
            var ball = new Ball(
            random(0, width),
            random(0, height),
            random(-7, 7),
            random(-7, 7),
            true,
            randomColor(),
            random(10, 20));
            balls.push(ball);
            ballNum++;
        } 

        for (var i = 0; i < balls.length; i++) {
            if (balls[i].exist === true) {
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
            evilCircle.draw();
            evilCircle.setControls();
            evilCircle.collisionDetect();
            evilCircle.checkBounds();
            }
        }
        
        if (ballNum > 0){
            count.textContent = ballNum + ' balls left';
        }else{
            count.textContent = 'Game Over';
        }
        
        requestAnimationFrame(loop);
        }


        loop();

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
.balltext {
    text-align: center;
}
</style>