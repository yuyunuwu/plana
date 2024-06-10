var audio = document.getElementById("bg-audio");
var button = document.getElementById("sound-toggle");
var video = document.getElementById("bg-video");

audio.volume = 0.05;

function toggleSound() {
    if (audio.paused) {
        audio.play(); 
        button.textContent = "暫停音樂"; 
    } else {
        audio.pause(); 
        button.textContent = "播放音樂"; 
    }
}

function adjustVolume(value) {
    audio.volume = value;
}

function startAudio() {
    audio.play();
    button.textContent = "撥放音樂"; 
}

$(document).ready(function() {
    $(document).click(function(event) {
        var mouseX = event.pageX;
        var mouseY = event.pageY;

        var $clickEffect = $("<div class='click-effect'></div>");
        $clickEffect.css({
            left: mouseX - 10 + "px", // 調整位置以保持在滑鼠點擊處中心
            top: mouseY - 180  + "px"   // 調整位置以確保出現在滑鼠點擊的正上方
        });

        $("#click-effect-container").append($clickEffect);

        $clickEffect.fadeOut(1000, function() {
            $(this).remove();
        });
    });
});

var spacing = 1; // 設定追蹤點之間的間距，數值越小越密集
var trailSize = 500; // 軌跡的最大尺寸，設置更大的值以使軌跡更長
var trailElements = [];
var previousX = null;
var previousY = null;

$(document).on("mousemove", function(event) {
    var mouseX = event.pageX;
    var mouseY = event.pageY;

    if (previousX !== null && previousY !== null) {
        var distance = Math.sqrt(Math.pow(mouseX - previousX, 2) + Math.pow(mouseY - previousY, 2));
        var numPoints = Math.ceil(distance / spacing); // 根據間距計算應生成的點的數量
        var deltaX = (mouseX - previousX) / numPoints;
        var deltaY = (mouseY - previousY) / numPoints;

        for (var i = 0; i < numPoints; i++) {
            var x = previousX + i * deltaX;
            var y = previousY + i * deltaY;
            var $trail = $("<div class='mouse-trail'></div>");
            $trail.css({
                left: x + "px",
                top: y + "px",
            });
            $("body").append($trail);
            trailElements.push($trail);

            // 如果超出最大軌跡數量，則刪除最舊的軌跡
            if (trailElements.length > trailSize) {
                trailElements[0].remove();
                trailElements.shift();
            }

            // 設置軌跡消失的延遲時間，從軌跡最後一個元素開始
            var delay = 500 * (1 - i / numPoints); // 調整消失速度
            fadeTrail($trail, delay);
        }
    }

    previousX = mouseX;
    previousY = mouseY;
});

// 設置軌跡消失的函數
function fadeTrail($trail, delay) {
    setTimeout(function() {
        $trail.css("opacity", 0);
        setTimeout(function() {
            $trail.remove();
        }, 1000); // 調整消失時間
    }, delay);
}
















