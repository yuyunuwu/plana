function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var month = now.getMonth() + 1; 
    var day = now.getDate();

    hours = ('0' + hours).slice(-2);
    minutes = ('0' + minutes).slice(-2);
    month = ('0' + month).slice(-2);
    day = ('0' + day).slice(-2);

    var timeString = hours + ':' + minutes;
    var space = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'; // 添加多个空格
    var dateString = month + '月' + day + '號';

    var clockElement = document.getElementById('clock');
    clockElement.innerHTML = timeString + space + dateString;

    setTimeout(updateClock, 1000);
}

window.onload = updateClock;
