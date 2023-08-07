window.onload = function () {

    //点击播放背景音乐
    var bgmObj = document.getElementById("bgm");
    document.documentElement.onmouseup = (event) => {
        if (bgmObj.paused) {
            bgmObj.volume = 0.1;
            bgmObj.play();
            //声音渐强
            var volumeUp = setInterval(() => {
                if(bgmObj.volume <= 0.9){   //防止丢失精度
                    bgmObj.volume += 0.1;
                    // alert(bgmObj.volume);
                }
                else{
                    clearInterval(volumeUp);
                }
            }, 300);
        }
        else {
            //声音渐弱
            var volumeDown = setInterval(() => {
                if(bgmObj.volume > 0.2){
                    bgmObj.volume -= 0.2;
                    // alert(bgmObj.volume);
                }
                else{
                    bgmObj.pause();
                    clearInterval(volumeDown);
                }
            }, 100);
        }
    };

    // 人物移动
    var goGif = document.querySelector(".gif_wrapper");
    var offset = 100;
    setInterval(() => {
        offset -= 0.7;
        if (offset < -83) offset = 100;
        goGif.style.cssText = "margin-left: " + offset + "%;";
    }, 40);

    // 禁用F12,抗检查
    // 键盘事件
    var antiCheckTip = false;
    var warningStr = "年轻人，我劝你不要轻举妄动！\n《中华人民共和国治安处罚法》 第二十九条 违反国家规定，对计算机信息系统中存储、处理、传输的数据和应用程序进行删除、修改、增加的；或者故意制作、传播计算机病毒等破坏性程序，影响计算机信息系统正常运行的，处五日以下拘留；情节较重的，处五日以上十日以下拘留，依据本条承担行政责任。";
    document.onkeydown = (event) => {
        event = event || window.event;
        if (event.key == "F12") {
            if (!antiCheckTip) {
                console.log(warningStr);
                antiCheckTip = true;
            }
            return false;
        }
    };
    //禁用右键菜单
    document.oncontextmenu = function (event) {
        if (!antiCheckTip) {
            console.log(warningStr);
            antiCheckTip = true;
        }
        return false;
    };

};


//鼠标点击烟花效果
function clickEffect() { let balls = []; let longPressed = false; let longPress; let multiplier = 0; let width, height; let origin; let normal; let ctx; const colours = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"]; const canvas = document.createElement("canvas"); document.body.appendChild(canvas); canvas.setAttribute("style", "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;"); const pointer = document.createElement("span"); pointer.classList.add("pointer"); document.body.appendChild(pointer); if (canvas.getContext && window.addEventListener) { ctx = canvas.getContext("2d"); updateSize(); window.addEventListener('resize', updateSize, false); loop(); window.addEventListener("mousedown", function(e) { pushBalls(randBetween(10, 20), e.clientX, e.clientY); document.body.classList.add("is-pressed"); longPress = setTimeout(function() { document.body.classList.add("is-longpress"); longPressed = true; }, 500); }, false); window.addEventListener("mouseup", function(e) { clearInterval(longPress); if (longPressed == true) { document.body.classList.remove("is-longpress"); pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), e.clientX, e.clientY); longPressed = false; } document.body.classList.remove("is-pressed"); }, false); window.addEventListener("mousemove", function(e) { let x = e.clientX; let y = e.clientY; pointer.style.top = y + "px"; pointer.style.left = x + "px"; }, false); } else { console.log("canvas or addEventListener is unsupported!"); } function updateSize() { canvas.width = window.innerWidth * 2; canvas.height = window.innerHeight * 2; canvas.style.width = window.innerWidth + 'px'; canvas.style.height = window.innerHeight + 'px'; ctx.scale(2, 2); width = (canvas.width = window.innerWidth); height = (canvas.height = window.innerHeight); origin = { x: width / 2, y: height / 2 }; normal = { x: width / 2, y: height / 2 }; } class Ball { constructor(x = origin.x, y = origin.y) { this.x = x; this.y = y; this.angle = Math.PI * 2 * Math.random(); if (longPressed == true) { this.multiplier = randBetween(14 + multiplier, 15 + multiplier); } else { this.multiplier = randBetween(6, 12); } this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle); this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle); this.r = randBetween(8, 12) + 3 * Math.random(); this.color = colours[Math.floor(Math.random() * colours.length)]; } update() { this.x += this.vx - normal.x; this.y += this.vy - normal.y; normal.x = -2 / window.innerWidth * Math.sin(this.angle); normal.y = -2 / window.innerHeight * Math.cos(this.angle); this.r -= 0.3; this.vx *= 0.9; this.vy *= 0.9; } } function pushBalls(count = 1, x = origin.x, y = origin.y) { for (let i = 0; i < count; i++) { balls.push(new Ball(x, y)); } } function randBetween(min, max) { return Math.floor(Math.random() * max) + min; } function loop() { ctx.fillStyle = "rgba(255, 255, 255, 0)"; ctx.clearRect(0, 0, canvas.width, canvas.height); for (let i = 0; i < balls.length; i++) { let b = balls[i]; if (b.r < 0) continue; ctx.fillStyle = b.color; ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false); ctx.fill(); b.update(); } if (longPressed == true) { multiplier += 0.2; } else if (!longPressed && multiplier >= 0) { multiplier -= 0.4; } removeBall(); requestAnimationFrame(loop); } function removeBall() { for (let i = 0; i < balls.length; i++) { let b = balls[i]; if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) { balls.splice(i, 1); } } } } 
clickEffect();
