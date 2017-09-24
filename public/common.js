
var sUserAgent = navigator.userAgent.toLowerCase();

function browserRedirect() {
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if(bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM){
	    window.location.href = "http://60.247.59.250:8000/svn/zhaolin365/ldwebapp";
	}
};

browserRedirect();
// 弹出框 
function dailog(cnt){
	var timer,sum=5;
    clearInterval(timer);
	var str = '<div class="dailog" id="dailog">'+
	               '<div class="dailog_cnt">'+' <img src="/images/tanchu.png" alt="提示">'+
	               ' <p>'+cnt+'</p>'+
	               '<div class="dailog_btn" id="dailog_btn">'+
	               '<p>我知道了(<span>5</span>s)</p>'+
	               '</div></div></div>';
    $('body').append(str);
    $('#dailog_btn').click(function(event) {
        $('#dailog').remove();
        clearInterval(timer);
    });
    timer = setInterval(function() {
        sum--;
        if(sum > 0 ) {
            $('#dailog_btn > p > span ').html(sum);
        }else{
            $('#dailog').remove(); 
            clearInterval(timer);
        	sum = 4;
        };
    },1000);
    
};