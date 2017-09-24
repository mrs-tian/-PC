var investmentObj = {
     zsContentdom:$('#zs_content>div'),   
     zsformdom:$('.zs_form'),
    init:function() {
        this.bindEvent();
        this.render();
    },
    bindEvent:function(){
        var that = this;
        // 开关 控制 页面 被点击 展开
        var flag = true, add = 0 ;
        var  _index = '';
        var cntweith = $('#zs_content').width();
         var myurl = 'http://ld.zhaolin365.com/Api/Official/';
        // 鼠标移入  
        this.zsContentdom.mouseenter(function(event) {
         	event.preventDefault();
            //相对于父级 的位置 
		    //var posleft = $(this).position().left;
            if( flag ) {
                //储存 移入的元素的 下标
                _index = $(this).index();
                var domclass =$(this).attr('class');// 原本的 样式 
                var domhover =  domclass+'_hover'; // 鼠标移入 的样式
                var domactive = domclass+'_active';// 鼠标 点击 的 样式 
                $(this).animate({'opacity':.3}, 200,function(argument) {
                    $(this).children('img').attr('src', $(this).children('img').attr('src').replace(/00/,'01')); 
                    $(this).addClass(domhover).removeClass(domclass).animate({'opacity':1}, 200);
                });
                // 鼠标移出 
                $(this).mouseleave(function(event) {
                     $(this).children('img').attr('src', $(this).children('img').attr('src').replace(/01/,'00')); 
                    $(this).stop(true,true).removeClass(domhover).addClass(domclass);   
                });
                // 点击  打开 入驻 列表 
                $(this).click(function(event) {
                    event.preventDefault();
                    if(flag){
                        flag = false;    
                        that.zsContentdom.each(function(i, el) {                           
                            $(this).off('click'); // 清除所有节点的点击事件                                         
                            if(i < _index) {
                                $(this).stop().animate({'left':i*cntweith*7/100},400).css({'zIndex':i,'boxShadow':'0 0 70px #e0e1e6'}); 
                            }
                            else if( i > _index) {
                                $(this).stop().animate({'left':(Number(i*cntweith*0.07)+cntweith*0.555)},400).css({'zIndex' : 9-i,'boxShadow':'0 0 70px #e0e1e6'});     
                            }
                            else if( i === _index) {
                                // 点中 元素
                                $(this).children('img').attr('src', $(this).children('img').attr('src').replace(/01/,'02'));
                                $(this).addClass(domactive).removeClass(domclass).css({'zIndex':9,opacity:1,'boxShadow':'0 0 70px #e0e1e6'}).stop().animate({'left':i*cntweith*0.07,'width':cntweith*0.79,top:-cntweith*0.01,height:cntweith*0.42},600,function() {
                                    $(this).find('.zs_form').css('height',cntweith*0.42);
                                    $(this).children('.zs_form_box').stop().animate({'height':cntweith*0.42}, 400);
                                });
                                // 点击 关闭 
                                $(this).find('.zs_form_top').click(function(event) {
                                    event.preventDefault();
                                    // 关闭 表单  
                                    $(this).parent().parent().stop().animate({'height':0},400,function(){
                                        // 关闭  box width 790 >>> 235 
                                        that.zsContentdom.each(function(i, el) {
                                            if( i == _index ) {
                                                // width 到达 235  换_hover背景 
                                                $(this).stop().animate({'left':(i*cntweith*0.255),'width':0.235*cntweith,'height':cntweith*0.4,top:0},600,function() {
                                                   // console.log(domhover);
                                                     $(this).children('img').attr('src', $(this).children('img').attr('src').replace(/02/,'01'));
                                                    $(this).removeClass(domactive).addClass(domhover).css({'boxShadow':'0 0 0 #e0e1e6'}); 
                                                    // 300毫秒 后 换原背景 
                                                    setTimeout(function() {
                                                        that.zsContentdom.eq(_index).removeClass(domhover).addClass(domclass);
                                                        that.zsContentdom.eq(_index).children('img').attr('src', that.zsContentdom.eq(_index).children('img').attr('src').replace(/01/,'00'));
                                                       flag = true;
                                                       domclass='',domhover='',domactive='';
                                                    },400);
                                                });
                                            }
                                            else{
                                                // 兄弟 节点 归位 
                                                $(this).stop().animate({'left':i*cntweith*0.255,'width':cntweith*0.235},400).css({'boxShadow':'0 0 0 #e0e1e6'}); 
                                            };
                                        });
                                    });                                                                   
                                    return false;
                                });
                            };
                        });
                    } else{
                        //console.log('不应该被点击');
                    }
                });
            } else { 
               // console.log('现在移入不触发hover')
            };

        });
        $('.zs_form_top').mouseenter(function(event) {
            $(this).attr('src', '../images/zhaoshang/guanbi-01.png');
            $(this).mouseleave(function(event) {
                  $(this).attr('src', '../images/zhaoshang/guanbi.png');
            });
        });
        var obj = {phone:0,role:0,truename:'',company:''};
        var objerror = {phone:'请输入手机号',truename:'请输入姓名',company3:'请输入品牌名称',company5:'请输入公司名称'};
        // 入驻 
        function isTelephone(sum,dom) {
            if( /^[1][358][0-9]{9}$/.test(sum) ) {
                obj.phone = sum ;         
            }else {
               obj.phone = 0;          
            };
        };
        //电话号码  验证 
        $('.zs_form_tel').on('input propertychange',function() {
            if($(this).val().length >= 11 ) {
                $(this).val( $(this).val().substr(0,11) );
            };   
        });
        $('.zs_form_btn').on('click', function(event) {
            event.preventDefault();
            var _role =  Number(_index)+2;
            var cntdom =  $(this).parent().children('input');
            if( ruZhuJC( cntdom,_role) ){
                obj['role'] = _role;
                $.post(myurl+'register_apply',obj, function(data, textStatus, xhr) {
                    /*optional stuff to do after success */
                    if ( data.code == 200 ) {
                        obj.length = 0;
                        obj.phone = -1;
                        var str = '申请入驻成功，服务<br/>人员将在5个工作日之内与您联系！';
                        ruzhusuccess( cntdom,str);
                    }else{
                        var str = '您已提交申请入驻，服务<br/>人员将在5个工作日之内与您联系！';
                        ruzhusuccess( cntdom,str);
                    };
                }); 
            };
  
        });
        // 入住信息 检测 验证
        function ruZhuJC(dom,role){
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
                }else{

                    if( $(this).attr('name') == 'company' ) {
                        dailog( objerror['company'+role] );
                    }else {
                        dailog( objerror[$(this).attr('name')] );
                    };
                    
                    return false;
                };
                i++;
            });
            //判断 是否 全部通过验证
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
        $(window).resize(function () {  
            that.render();
        });

    },
    render:function() {
        //布局 
        $('#zs_content').height($('body').height()-260>340?$('body').height()-260:340);
        var cntheight =  $('#zs_content').width()*0.4;
        this.zsContentdom.each(function(index, el) {
            
            $(this).height(cntheight);   
        });
        var navIndex = 1;
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
                            alert("您已登录成功,非常抱歉,此页正在建设中")
                      }else {
                        location.href = '/html/register.html';
                        util.setCookie('nac_index',5);
                      }
                break;
                default:
                console.log('这个页面目前没有做');
              };
        });
        util.isIE();

    }
}

investmentObj.init();
