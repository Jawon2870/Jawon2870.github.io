
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
        /*
        检查音乐加载状态bgmObj.readyState，是否能播放
        HTMLMediaElement.HAVE_NOTHING
        0 = HAVE_NOTHING：没有关于媒体资源的信息。
        1 = HAVE_METADATA：已检索到足够的媒体资源，以便初始化元数据属性。搜索将不再引发异常。
        2 = HAVE_CURRENT_DATA：当前播放位置的数据可用，但不足以实际播放多于一帧。
        3 = HAVE_FUTURE_DATA：当前播放位置以及至少未来一点时间的数据都可用（换句话说，至少有两帧视频，例如）。
        4 = HAVE_ENOUGH_DATA：有足够的数据可用，并且下载速率足够高，以便媒体可以不间断地播放到结束。
        */
        if (bgmObj.readyState  < 2) return;

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
