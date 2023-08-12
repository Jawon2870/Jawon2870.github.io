//由于移动端差异，这里来识别移动端，区别对待
// 判断是否为移动端
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

window.onload = function () {
    //设置音频
    SetAudio();

    // gif、文字移动
    var goGif = document.querySelector(".gif_texts_wrapper_movable");
    var offset = 100;
    setInterval(() => {
        offset -= 0.7;
        if (offset < -83) offset = 100;
        goGif.style.cssText = "margin-left: " + offset + "%;";
    }, 40);
};
