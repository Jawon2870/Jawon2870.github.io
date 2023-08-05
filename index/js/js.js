window.onload = function () {
    //点击播放背景音乐
    var bgmObj = document.getElementById("bgm");
    var bodyObj = document.querySelector("html");
    bodyObj.onmousedown = (event) => {
        if (bgmObj.paused) {
            bgmObj.play();
            bodyObj.onmousedown = null;
        }
    };

    // 禁用F12,抗检查
    // 键盘事件
    var antiCheckTip = false;
    var warningStr = "年轻人，我劝你不要轻举妄动！\n《中华人民共和国治安处罚法》 第二十九条 违反国家规定，对计算机信息系统中存储、处理、传输的数据和应用程序进行删除、修改、增加的；或者故意制作、传播计算机病毒等破坏性程序，影响计算机信息系统正常运行的，处五日以下拘留；情节较重的，处五日以上十日以下拘留，依据本条承担行政责任。";
    document.onkeydown = (event) => {
        event = event || window.event;
        if (event.key == "F12") {
            if(!antiCheckTip)
            {
                console.log(warningStr);
                antiCheckTip = true;
            }
                return false;
        }
    };
    //禁用右键菜单
    document.oncontextmenu = function (event) {
        if(!antiCheckTip)
        {
            console.log(warningStr);
            antiCheckTip = true;
        }
        return false;
    };

};
