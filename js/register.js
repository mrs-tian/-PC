var  registerObj = {
    telephonedom:$('#telephone'),//电话号码
    verifydom:$('#verify'),//验证码
    regTishidom:$('#reg_tishi'),// 提示框 显示警告
    onXieyidom:$('#on_xieyi'),//协议按钮
    onImgdom:$('#on_img'),//协议通过图片
    regYzmSenddom:$('#reg_yzm_send'),//发送验证码
    regVoicedom:$('#reg_voice'),//发送语音
	init:function(){
       this.bindEvent();	
       this.render();
    },
    bindEvent:function() {
        //注册验证 
        var that = this;          
        var myurl = 'http://ld.zhaolin365.com/Api/Index/';
        var reg=[/^[1][358][0-9]{9}$/,/^[0-9]{4,6}$/];
        var obj = {phone:0,yzm:0,xieyi:1};//对象方式进行存储 验证
        //电话号码  验证 
        this.telephonedom.on('input propertychange',function() {
            if($(this).val().length == 11 ) {
                isTelephone($(this).val());
            };   
        });
        this.telephonedom.on('blur',function(){
            isTelephone($(this).val());
        });
        //判断电话 号码
        function isTelephone(content){
            if( reg[0].test(content) ) {
                obj.phone = content;
                objExamine(obj);
                that.regTishidom.css({'visibility':'hidden'});
                that.regYzmSenddom.css({'background':'#63c63c'});
                var d = Math.floor(new Date().getTime()/1000) ;
                //console.log(d)
               // console.log(util.getSession('yzmSend'+obj.phone))
                if( (d - util.getSession('yzmSend'+obj.phone) ) < 60 && (d - util.getSession('yzmSend'+obj.phone))>0) {
                    yzmSend();  
                }else {
                    getyzm();  
                }
            }else{
                obj.phone = 0;
                that.regYzmSenddom.css({'background':'#b4b4b4'});
                that.regTishidom.css({'visibility':'visible'});
                that.regTishidom.html('电话号码错误');
            }; 
            objExamine(obj);    
        };

        //获取 验证码
        function getyzm(){
            that.regYzmSenddom.off('click');
            that.regVoicedom.off('click');
            that.regYzmSenddom.click(function(event) {
                //获取验证码
                yzmSend();
                // reg[1] = /^[0-9]{6}$/;
                $(this).off('click');
                that.regVoicedom.off('click');
                $.post(myurl+'yzm',obj, function(req, textStatus, xhr) {
                	  if(req.code != 200 ) {

                	  }else {
                     
                	  }
                });
            });
            that.regVoicedom.click(function(event) {
                //获取验语音验证码
                 //reg[1] = /^[0-9]{4}$/;
                $(this).off('click');  
                that.regYzmSenddom.off('click'); 
                yzmSend();     
                $.post(myurl+'voice_yzm',obj, function(data, textStatus, xhr) {
                    console.log(data)
                });           
            });
        };
        //计时 是否过期 
        function jisuandate() {
            var sum;
            var d = Math.floor(new Date().getTime()/1000) ;
            if((d - util.getSession('yzmSend'+obj.phone) ) < 60 && (d - util.getSession('yzmSend'+obj.phone))>0 ) {
                return sum = 60 - (Math.floor(new Date().getTime()/1000) - util.getSession('yzmSend'+obj.phone));
            }
            else {
                util.setSession('yzmSend'+obj.phone, Math.floor(new Date().getTime()/1000));
                return sum  = 59;
            };
        };
        var timer;
        // 验证码 已发送 开始计时
        function yzmSend() {
             
            var sum = jisuandate();
            that.regYzmSenddom.css({'background':'#b4b4b4'}).html(sum+'s后重发');    
            clearInterval(timer);
            timer = setInterval(function() {
                sum--;
                if(sum > 0){
                    that.regYzmSenddom.html(sum+'s后重发');
                }else if(sum <= 0 ) {
                    clearInterval(timer);
                    that.regYzmSenddom.css({'background':'#63c63c'}).html('重新获取');
                    util.removeSession( 'yzmSend'+obj.phone );
                    getyzm();
                };
                
            },1000);
            return false;            
        };
        //验证 验证
        this.verifydom.on('input propertychange',function() {
            if($(this).val().length == 4 || $(this).val().length == 6 ) {
                isYanzm($(this).val());
            };
        });
        this.verifydom.on('blur',function(){
            isYanzm($(this).val());
        });
        //验证码 判断 
        function isYanzm(sum){        
            if( reg[1].test(sum) ) {
                obj.yzm = sum;
                that.regTishidom.css({'visibility':'hidden'});
                objExamine(obj);
            }
            else{
                obj.yzm = 0;
                that.regTishidom.html('验证码错误');
                that.regTishidom.css({'visibility':'visible'});
            }; 
            objExamine(obj);
        };
        // 协议 
        this.onXieyidom.click(function() {
            that.onImgdom.css({"display":"block"}); 
            obj.xieyi = 1;  
            objExamine(obj);     
        });
        this.onImgdom.click(function() {
            that.onImgdom.css({'display':'none'}); 
            obj.xieyi = 0;
            objExamine(obj);
        });
        function objExamine(obj) {
            //对obj 进行检测   全部通过 调move 动画效果
            var a=0;
            for ( var i in obj ){
                if(obj[i]!=0) {
                   a++
                };            
            };
            if( a === 3 ) {
                subform();
            }else{
                if (window.navigator.userAgent.indexOf("MSIE 8") >= 1 || window.navigator.userAgent.indexOf("MSIE 9") >= 1 || window.navigator.userAgent.indexOf("MSIE 7") >= 1 || window.navigator.userAgent.indexOf("MSIE 6") >= 1) {
                    $('#reg_btn').css('background','#b4b4b4');
                };
                $('#reg_youqi').css('display', 'none');
                $('#reg_shuazi').css('display', 'none');  
                $('#reg_btn').off(); 
            }
        };                
        function subform() {
            $('#reg_youqi').css('display', 'block');
            if (window.navigator.userAgent.indexOf("MSIE 8") >= 1 || window.navigator.userAgent.indexOf("MSIE 9") >= 1 || window.navigator.userAgent.indexOf("MSIE 7") >= 1 || window.navigator.userAgent.indexOf("MSIE 6") >= 1) {
                $('#reg_shuazi').css('display', 'none');
                $('#reg_btn').css('background','#fff');
            }else{
                $('#reg_shuazi').css('display', 'block');
            };
            $('#reg_btn').off('click');
            //动画结束  绑定点击 事件  可点击
            $('#reg_btn').click (function (){
                $.post(myurl+'register_phone',obj, function(data, textStatus, xhr) {
                    console.log(data);
                    if(data.code == 200 ) {
                        location.href = '/index.html';
                        util.setSession('uname',"我的");
                    } else if(data.code == 400 ) {
                        obj.yzm = 0;
                        that.regTishidom.html('验证码错误');
                        that.regTishidom.css({'visibility':'visible'});                          
                    }else if(data.code == 404) {
                        obj.yzm = 0;
                        that.regTishidom.html(data.data);
                        that.regTishidom.css({'visibility':'visible'});  
                    };
                });
            });
        };
        $(window).resize(function () { 
            pingmu();
        });
        function pingmu() {
            var bodyh =  $(document.body).height();
            $('.reg_content').css('height', bodyh-90);
        };
        pingmu();
    },
    render:function() {
            var navIndex =  5;
            util.getSession('uname')?$('.header_nav > li').eq(5).find('p').html(util.getSession('uname')):'';
            $('#nav_shade').css('left', $('.header_nav > li').eq(navIndex).position().left + ($('.header_nav > li').eq(navIndex).width()-110)/2 );
            //nav 被选中 样式
            $('.header_nav > li').on('click', function(event) {
                event.preventDefault();
                switch($(this).index()){
                  case 0: location.href = '/index.html';
                          util.setCookie('nac_index',0);
                  break;
                  case 1: location.href = '/html/investment.html';
                          util.setCookie('nac_index',1);
                  break;
                  case 2 :location.href = '/html/website.html';
                          util.setCookie('nac_index',2);
                  break;
                  case 3: location.href = '/html/enter.html';
                          util.setCookie('nac_index',3);
                  break;
                  case 4: location.href = '/html/about.html';
                          util.setCookie('nac_index',4);
                  break;
                  default:
                  console.log('这个页面目前没有做');
                };
            });
    }
}
registerObj.init();


/*var myurl = 'http://ld.zhaolin365.com/Api/Official/';
var obj = {role:2,phone:15901040321,truename:'等风来',company:'绿点易装'}
$.post(myurl+'register_apply',obj, function(data, textStatus, xhr) {
    console.log(data);
    var str = JSON.stringify(data)
    console.log(str);
    var obj =  JSON.parse(str);
    console.log(obj);
});*/ 