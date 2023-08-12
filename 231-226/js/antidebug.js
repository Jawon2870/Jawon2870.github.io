function AntiDebugger() {
    setInterval(() => {
        debugger;
    }, 1000);
}


// 禁用F12,反调试
// 键盘事件
document.onkeydown = (event) => {
    event = event || window.event;
    if (event.key == "F12") {
        return false;
    }
};
//禁用右键菜单
document.oncontextmenu = function (event) {
    return false;
};

var debugTime = 0;
// 检测是否在调试
var antiDebugLoop = setInterval(() => {
    var startTime = new Date();
    debugger;
    debugTime = new Date() - startTime;
}, 1000);

var antiDebugLoop02 = setInterval(() => {
    if (debugTime > 100) {
        document.querySelector("html").remove();
        AntiDebugger();
        clearInterval(antiDebugLoop);
        clearInterval(antiDebugLoop02);
    }
}, 500);
