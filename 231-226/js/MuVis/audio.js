
function SetAudio() {
    //音频可视化开启标志
    var MuVisEnabled = false;
    var bgmObj = document.getElementById("bgm");

    // 音乐播放按钮按下效果
    var audio_ctrl_btn = document.querySelector("#audio_ctrl_btn");
    audio_ctrl_btn.addEventListener("mousedown", () => {
        audio_ctrl_btn.style.cssText = "background: #3ba4ff; border: 2px solid #add6ff; margin-bottom: 7px";
    });
    audio_ctrl_btn.addEventListener("mouseup", () => {
        audio_ctrl_btn.style.cssText = "";
    });

    var setAudioLoop = setInterval(() => {
        //检查音乐加载状态，是否能播放
        if (bgmObj.readyState < 3) return;

        // 显示BGM播放
        audio_ctrl_btn.innerText = "·  播 放 B G M  ·";

        // 点击播放背景音乐
        audio_ctrl_btn.addEventListener("click", (event) => {
            //音频可视化
            if (MuVisEnabled == false) {
                MuVis("#MuVis", "#MuVis div", 100, 80);
                MuVisEnabled = true;
            }

            // 针对移动端暂时使用简单的开始和暂停
            if (isMobile) {
                if (bgmObj.paused) {
                    bgmObj.play();
                    audio_ctrl_btn.innerText = "·  暂 停 B G M  ·";
                    console.log("音乐播放\n");
                } else {
                    bgmObj.pause();
                    audio_ctrl_btn.innerText = "·  播 放 B G M  ·";
                    console.log("音乐暂停\n");
                }
            }
            // 针对PC端使用渐变的开始和暂停
            else if (bgmObj.paused) {
                bgmObj.volume = 0.1;
                bgmObj.play();
                audio_ctrl_btn.innerText = "·  暂 停 B G M  ·";
                console.log("音乐播放\n");
                //声音渐强
                var volumeUp = setInterval(() => {
                    if (bgmObj.volume <= 0.9) {
                        //防止丢失精度
                        bgmObj.volume += 0.1;
                    } else {
                        clearInterval(volumeUp);
                    }
                }, 200);
            } else {
                //声音渐弱
                var volumeDown = setInterval(() => {
                    if (bgmObj.volume > 0.2) {
                        bgmObj.volume -= 0.2;
                    } else {
                        bgmObj.pause();
                        audio_ctrl_btn.innerText = "·  播 放 B G M  ·";
                        console.log("音乐暂停\n");
                        clearInterval(volumeDown);
                    }
                }, 100);
            }
        });
        clearInterval(setAudioLoop);
    }, 300);

}
