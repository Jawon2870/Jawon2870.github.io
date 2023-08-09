/*使用说明：
    依赖：d3.js ，请确保使用本文件时已经引入了d3.js。
    功能：音频柱状可视化。
    配置：现在可设置音柱的个数和
*/
//可视化容器选择器
var MuVisWrapperSelec = "#MuVis";
//音柱选择器
var MuVisSelec = "#MuVis div";
// 音柱个数
var numOfbars = 100;
// 音柱高度
var maxHeight = 60;

//插入音柱宽度样式
var styleElement = document.createElement("style");
styleElement.textContent = MuVisSelec + ` {width: ` + 100 / numOfbars + `%;` + `}`;
document.head.appendChild(styleElement);

//点击开启音频柱状可视化
document.addEventListener('click', function (event) {
    // 获取音频元素
    const audioElement = document.querySelector('audio');
    // 创建 AudioContext
    const audioContext = new AudioContext();
    // 将音频元素连接到 AudioContext
    const mediaElementSource = audioContext.createMediaElementSource(audioElement);
    mediaElementSource.connect(audioContext.destination);
    // 创建 AnalyserNode 节点
    const analyser = audioContext.createAnalyser();
    mediaElementSource.connect(analyser);
    // 获取频率数据
    const frequencyData = new Uint8Array(analyser.frequencyBinCount);

    // 使用 D3.js 绘制可视化图形
    function update() {
        // 更新频率数据
        analyser.getByteFrequencyData(frequencyData);
        // 获取容器元素
        const container = d3.select(MuVisWrapperSelec);

        // 绑定数据
        const divs = container.selectAll('div')
            .data(d3.range(numOfbars));     //音柱的个数

        // 添加音柱
        divs.enter()
            .append('div')
            .merge(divs)
            .style('height', (d, i) => `${frequencyData[i] * maxHeight / 100}px`);
        // 继续更新
        requestAnimationFrame(update);
    }
    update();

    // 移除点击事件，以免重复触发
    document.removeEventListener('click', arguments.callee);

    console.log("音乐可视化配置完成\n");
});
