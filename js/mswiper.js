    var box = document.getElementById('pic-banner');
    var liBox = box.querySelectorAll('li');  
    var timer = null;   

    function showImage(index) {
        index = index || 0;
        for(var i = 0; i < liBox.length; i++) {           
            // liBox[i].style.opacity=0;
            move(liBox[i],'opacity',0);
        }
         // liBox[index].style.opacity=1;
         move(liBox[index],'opacity',100);
        
                
    }


    function autoPlay (index) {
        index = index || 0;
        // 取消上一个定时器
        clearInterval(timer);
        // 重置一个新的定时器
        timer = setInterval(function() {
            index++;
            // 循环播放
            if(index > 5) {
                index = 0;
            }
            showImage(index);
        }, 3000)
    }
    autoPlay(0);