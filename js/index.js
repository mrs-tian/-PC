$(function() {

  var bodyw =  $(document.body).width();
  var homeObj = {
    // aHomeContentdom:$('#home_content > div'),
    aHomeContentdom:$('#home_content > div'),
    aHomeDontent2D1dom:$('.home_content2_d1'),
    aHomeContent2Bgboxdom:$('#home_content2_bg_box > div'),
    init:function() {       
          this.bindEvent();
          this.render();
          this.rizhu();
    },
    bindEvent:function() {
        var that = this;    
        var prevclass = 'home_content_actived_upprev',activclass = 'home_content_actived_up';
        var flag = 1;//控制 鼠标滑动间隔  
        var _index = 0; // 当前鼠标滑动的页数 
        var isIndex;
        this.aHomeDontent2D1dom.click(function(event) {
            event.preventDefault();
            if( $(this).index() == 0 ) {
                _index ++;
            }else  if( $(this).index() == 1 ){
                _index= _index + Number(3);
            }else {
                _index= _index + Number(5);
            }
            sidai(1,$(this));
        });
        if( document.addEventListener ) {
            document.addEventListener('DOMMouseScroll',scrollFunc,false);
        };
        //window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome
        document.onmousewheel=scrollFunc;//IE/Opera/Chrome  
        function tiaozhuanPages(sum) {
            if(flag === 1) {
                flag = 0;
                // 控住 翻页的时间间隔
                setTimeout(function() {
                   flag = 1;
                },1000);
                
                _index = Number(_index)+Number(sum);

                if(_index > -1 && _index < 8 ) {
                    //判断  是否滑到 两端 
                    //将要展示的页面 
                    if( _index === 0 && sum == -1) {
                        // 丝带 进入 家装
                        backjiazhuang();

                    }else if( _index === 1) {// 丝页 
                        //sum  -1 上滑 入驻 >>>丝带  1 下滑 家装 >>> 丝带   
                        ldjzdown(sum,that.aHomeDontent2D1dom.eq(1)); 
                    }else if( _index === 2&&sum == 1 ) {
                        // 这个状态 涉及到 丝带 下滑 离开 
                        sidai(sum,that.aHomeDontent2D1dom.eq(1)); 

                    }else if( _index  == 7) {
                          lastContent(sum);
                    }else if( _index == 6 && sum == -1 ){
                          lastContent(sum);
                    } else {
                        $('.'+prevclass).removeClass(prevclass);
                        if(sum ===1 ) {
                            //向下滚动      
                            $('.'+activclass).removeClass(activclass).addClass('home_content_actived_upprev');
                            that.aHomeContentdom.eq(_index).addClass('home_content_actived_up'); 
                            prevclass = 'home_content_actived_upprev';
                            activclass = 'home_content_actived_up';

                        }
                        else if(sum === -1) {
                            //向上滚动
                             // that.aHomeContentdom.eq(Number(_index)-Number(sum)).addClass('home_content_actived_upprev');
                            $('.'+activclass).removeClass(activclass).addClass('home_content_actived_downprev');
                            that.aHomeContentdom.eq(_index).addClass('home_content_actived_down'); 
                            prevclass = 'home_content_actived_downprev';
                            activclass = 'home_content_actived_down';
                        }
                    }

                }else {
                    flag = 1;
                    _index = Number(_index)- Number(sum);
                    console.log('不能执行了;')
                }
            }
        };
        var itop = $(document.body).height()>600?($(document.body).height()-570)/2:15;
        itop = itop>170?170:itop;
        $('#home_content8_main').css('top', itop);
        // 最后一个 的进出 
        function  lastContent(sum) {
            if( sum == 1 ) {              
                $('#home_content8_main').css({'left':bodyw,display:'none'});
                $('.home_content8').css({'display':'block','zIndex':10,left:bodyw}).animate({left:0},500,function () {

                });
                $('#home_content8_main').css({'display':'block',left:bodyw}).animate({left:bodyw/2+10}, 800,function(){
                    $('#home_content8_main').animate({left:bodyw/2}, 100)
                });
            }else if( sum == -1 ) {      
                $('#home_content8_main').animate({left:bodyw}, 600,function() {
                });
                setTimeout(function(){
                    $('.home_content8').animate({left:bodyw},800,function() {
                        $(this).css({'display':'none','zIndex':0});
                    });
                },200)

            };
        };
        //返回到  第一个 
        function backjiazhuang() {
              // 关掉丝带  树叶 
              $('#sidai').css({'display':'none'});
              that.aHomeContent2Bgboxdom.each(function(i, el) {
                  $(this).css('display', 'none');                      
              });
              //四张卡牌 
              that.aHomeDontent2D1dom.each(function(i, el) {
                  $(this).animate({top:800},500+Number(i*50),function(){
                     //that.aHomeDontent2D1dom.each(function(i, el) {
                          $(this).css('display','none');
                      //});                      
                  });

              });
              
                
              setTimeout(function(){
                  $('.home_content2').css({'display':'none'});
                  $('.home_content1').css({'display':'block',opacity:1});
                  // 底部四个按钮 
                  $('.home_content1_nav>div').each(function(i, el) {
                      $(this).animate({'top':0,'opacity': 1}, 200+Number(i*50));
                  });
                  //向下滚动  
                  $('.'+prevclass).removeClass(prevclass);    
                  $('.'+activclass).removeClass(activclass)//.addClass('home_content_actived_downprev');
                  that.aHomeContentdom.eq(_index)//.addClass('home_content_actived_down'); 
                  prevclass = 'home_content_actived_downprev';
                  activclass = 'home_content_actived_down';
              },500);
        };
        //sum  1 下滑 家装 >>> 丝带 -1 上滑 入驻 >>>丝带   
        function ldjzdown(sum,dom){
            //sum  1 下滑 家装 >>> 丝带
            if(sum == 1) {
                // $('.home_content1_logo').animate({'opacity': 0,'top': 35}, 300);
                // 底部四个按钮 
                $('.home_content1_nav>div').each(function(i, el) {
                    $(this).animate({'top':-40,'opacity': 0}, 200+Number(i*50));
                });
                // 四张卡牌 
                setTimeout(function(){
                    that.aHomeDontent2D1dom.each(function(i, el) {
                        $(this).css({'left':Number(i*255),'top':515,'display':'block','opacity':1}).animate({top:115}, 500+Number(i*50))
                    });
                },300);
                // 切换 背景到树叶 
                $('.home_content1').animate({'opacity':0},950,function(){
                    $('.home_content1').css('display', 'none');
                });
                 
                if (window.navigator.userAgent.indexOf("MSIE 8")>=1||window.navigator.userAgent.indexOf("MSIE 9")>=1) {
                    setTimeout(function(){
                       $('#sidai').css({'display':'block'});   
                    },950)
                }else {
                      // 打开 丝带  树叶 
                    $('#sidai').css({'display':'block'});
                }
                that.aHomeContent2Bgboxdom.each(function(i, el) {
                    $(this).css('display', 'block');                      
                });
                $('.home_content2').css({'display':'block'});
                $('.'+prevclass).removeClass(prevclass); 
                $('.'+activclass).removeClass(activclass); 
                prevclass = 'home_content_actived_upprev';
                activclass = 'home_content_actived_up';

            }else if( sum == -1 ) {
              // -1 上滑 入驻 >>>丝带
               
                //向上滚动
                 // that.aHomeContentdom.eq(Number(_index)-Number(sum)).addClass('home_content_actived_upprev');
                $('.'+prevclass).removeClass(prevclass); 
                $('.'+activclass).removeClass(activclass).addClass('home_content_actived_downprev');
                prevclass = 'home_content_actived_downprev';
                activclass = 'home_content_actived_down';
                setTimeout(function(){
                  dom.css({'left':1600,'opacity':1,'display':'block'}).animate({'left':715}, 300,function(){
                      that.aHomeDontent2D1dom.each(function(i, el) {
                          $(this).css({left:715,top:115,display:'block','zIndex':0,opacity:1}).animate({'left':Number(i*255)},300);
                      })
                  });
                },300)
                // 打开 丝带  树叶 
                $('#sidai').css({'display':'block'});
                that.aHomeContent2Bgboxdom.each(function(i, el) {
                    $(this).css('display', 'block');                      
                });

            }
        };
        // 丝带跳往 装修 页 动画 
        function sidai(sum,dom) {
              // 关掉丝带  树叶 
              $('#sidai').css({'display':'none'});
              that.aHomeContent2Bgboxdom.each(function(i, el) {
                  $(this).css('display', 'none');                      
              });
              dom.css('zIndex', '99');
              //相对于父级 的位置 
              var posleft = dom.position().left;
              // 自己的宽
              //$(this).width();
              that.aHomeDontent2D1dom.each(function(index, el) {
                  $(this).animate({left:posleft}, 500,function(){
                      that.aHomeDontent2D1dom.each(function(index, el) {
                          $(this).css('display','none');
                      });        
                      dom.css('display','block').animate({left:1600,opacity:0}, 400);                
                  });
              });
              setTimeout(function(){
                  //向下滚动  
                  
                  $('.'+prevclass).removeClass(prevclass);    
                  $('.'+activclass).removeClass(activclass).addClass('home_content_actived_upprev');
                  that.aHomeContentdom.eq(_index).addClass('home_content_actived_up'); 
                  prevclass = 'home_content_actived_upprev';
                  activclass = 'home_content_actived_up';
              },600);
        }; 
        // 1 鼠标 向上 向下 滑动 
        function scrollFunc(e) {   
            e=e || window.event;   
            if(e.wheelDelta){//IE/Opera/Chrome 

                if(e.wheelDelta > 0){  
                    //向上滚动事件 
                    tiaozhuanPages(-1); 
                }else{
                    //向下滚动事件
                    tiaozhuanPages(1);
                }
            }else if(e.detail){//Firefox 
                if(e.detail==-3) {
                    //向上滚动事件
                    tiaozhuanPages(-1); 
                }else{
                    //向下滚动事件
                    tiaozhuanPages(1); 
                }
            } //ScrollText(direct); 
        }; 
        //6ye

        $('.home_content1_nav > div ').click(function() {
            flag = 1;
            tiaozhuanPages(1);
        })
        /*  
        $('.home_content7_2 >div').mouseenter(function(event) {
            clearInterval(timer);
            $('.home_content7_2 > .home_content7_actived').removeClass('home_content7_actived');
            $(this).eq(addlogo).addClass('home_content7_actived');
        });
        $('.home_content7_2 >div').mouseleave(function(event) {
            clearInterval(timer);  
            addlogo = $(this).index();    
            timer= setInterval(function(){
                addlogo++;
                addlogo = addlogo%6;
                $('.home_content7_2 > .home_content7_actived').removeClass('home_content7_actived');
                $('.home_content7_2 >div').eq(addlogo).addClass('home_content7_actived');
            },1000);
        });
        */

    },
    rizhu:function(){
        var myurl = 'http://ld.zhaolin365.com/Api/Official/'
        var obj = {phone:0,role:0,truename:'',company:''};
        var objerror = {phone:'请输入手机号',truename:'请输入姓名',company3:'请输入品牌名称',company5:'请输入公司名称'};
        var _index;
        // 入驻  电话号码 验证
        function isTelephone(sum,dom) {
            if( /^[1][358][0-9]{9}$/.test(sum) ) {
                obj.phone = sum ;         
            }else {
               obj.phone = 0;    
            };
        };
        //电话号码  验证 
        $('.hm_form_tel').on('input propertychange',function() {
            if($(this).val().length >= 11 ) {
                //isTelephone($(this).val(),$(this));
               $(this).val( $(this).val().substr(0,11) );
            };   
        });
        //7ye 工长 设计师 切换
        $('#hm_c7_orgs > p').on('click', function(event) {
            event.preventDefault();
            $('#hm_c7_orgs > .hm_c7_actived').removeClass('hm_c7_actived');
            $(this).addClass('hm_c7_actived');
            $(this).parent().parent().children('.home_ljruzhu').attr('role', $(this).attr('role') );
        });
        // 3-7 入驻 
        $('.home_ljruzhu').on('click', function(event) {
            event.preventDefault();
            var _role =  $(this).attr('role');
            var cntdom = $(this).parent().children('input');
            if( ruZhuJC(cntdom,_role) ) {
                obj.role = _role;
                $.post(myurl+'register_apply',obj, function(data, textStatus, xhr) {
                    if ( data.code == 200 ) {
                        obj.length = 0;
                        obj.phone = 0;
                        var str = '申请入驻成功，服务<br/>人员将在5个工作日之内与您联系！';
                        ruzhusuccess(cntdom,str);
                    }else{
                        var str = '您已提交申请入驻，服务<br/>人员将在5个工作日之内与您联系！';
                        ruzhusuccess(cntdom,str);
                    }
                });   
            };
        });

        //8ye 入驻类型  2 3 4 5
        $('.home_content8_from>li').click(function(event) {
            $('.home_content8_from > .home_content8_active').removeClass('home_content8_active');
            $(this).addClass('home_content8_active');
            
            $('#home_content8_ruzhu').attr('role', $(this).attr('role') );
            
            if( $(this).index() >=2 ) {
                $('#hm_gongsi').css('display', 'none');
                $('#home_content8_from1 >div').each(function(index, el) {
                     $(this).addClass('hm_selected');
                });
            }else if($(this).index() <= 1 ) {
                $('#hm_gongsi').css('display', 'block');
                $('#home_content8_from1 >div').each(function(index, el) {
                    $(this).removeClass('hm_selected');
                }); 
                if( $(this).index() == 0 ) {
                    $('#hm_gongsi > span').html('公司名称*')  
                } else if( $(this).index() == 1 ) {
                    $('#hm_gongsi > span ').html('品牌名称*')
                };          

            };

        });
        // 8ye 入驻
        $('#home_content8_ruzhu').click(function(event) {
            var _role = $(this).attr('role');
            if(_role==2||_role == 4 ){
              var sum = 2; 
            }else{
              var sum = 3;
            }
            if( ruZhuJC( $('.hm_info'),_role,sum) ){
                obj.role = _role;
                $.post(myurl+'register_apply',obj, function(data, textStatus, xhr) {
                    if ( data.code == 200 ) {
                        obj.length = 0;
                        obj.phone = 0;
                        var str = '申请入驻成功，服务<br/>人员将在5个工作日之内与您联系！';
                        ruzhusuccess($('.hm_info'),str);
                    }else{
                        var str = '您已提交申请入驻，服务<br/>人员将在5个工作日之内与您联系！';
                        ruzhusuccess($('.hm_info'),str);
                    }
                });              
            };
  
        });
        // 入住信息 检测 验证
        function ruZhuJC(dom,role,sum){
           var i =0;
            dom.each(function(index, el) {
                if( $(this).val() != ''&&$(this).attr('name') != 'phone') {
                    obj[$(this).attr('name')] = $(this).val();
                }else if($(this).attr('name') == 'phone'){
                    // 检测手机 号是否正确
                    isTelephone( $(this).val());
                    if (obj.phone == 0) {
                        dailog('请输入正确手机号');
                        return false;
                    };
                }else if(sum != 2){

                    if( $(this).attr('name') == 'company' ) {
                        dailog( objerror['company'+role] );
                    }else {
                        dailog( objerror[$(this).attr('name')] );
                    };
                    return false;
                };
                i++;
             }); 
            if (i == dom.length) {
                return true;             
            }else{
                return false;
            };
        };
        //入驻 成功
        function ruzhusuccess(dom,str) {
            // 展示信息 待定
            dailog(str);
            dom.each(function(index, el) {
                $(this).val('');
            }); 
        };   
        $('input[name=truename]').on('input propertychange',function() {
            if($(this).val().length >= 20 ) {
                //isTelephone($(this).val(),$(this));
               $(this).val( $(this).val().substr(0,20) );
            };   
        });
        $('input[name=company]').on('input propertychange',function() {
            if($(this).val().length >= 30 ) {
                //isTelephone($(this).val(),$(this));
               $(this).val( $(this).val().substr(0,30) );
            };   
        });
    },
    render:function() {

              var navIndex =  0;
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
                    case 5: 
                          if( util.getSession('uname') ) {
                               dailog("您已登录成功,非常抱歉,此页正在建设中")
                          }else {
                            location.href = '/html/register.html';
                            util.setCookie('nac_index',5);
                          }
                    break;
                    default:
                    dailog('这个页面走丢了');
                  };
              });

    }
  } 
  homeObj.init();
  var timer = '';
  clearInterval(timer);
  var addlogo=0;
  timer = setInterval(function(){
      addlogo++;
      addlogo = addlogo%6;
      $('.home_content7_2 > .home_content7_actived').removeClass('home_content7_actived');
      $('.home_content7_2 >div').eq(addlogo).addClass('home_content7_actived');
  },1000);
  $(window).resize(function () { 
      bodyw =  $(document.body).width();
      console.log(bodyw) 
      $('#home_content8_main').css('left',bodyw/2);
  });
});
